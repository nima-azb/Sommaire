"use server";
import { getDbConnection } from "@/lib/db";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromLlama } from "@/lib/llamaai";
import { generateSummaryFromGPT } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/formatUtils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export const generatePdfSummary = async (
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) => {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log(pdfText);

    let summary;

    try {
      summary = await generateSummaryFromGPT(pdfText);
      console.log(summary);
    } catch (gptError) {
      console.log(gptError);
      // call llama
      if (
        gptError instanceof Error &&
        gptError.message === "RATE_LIMIT_EXCEEDED"
      ) {
        try {
          summary = await generateSummaryFromLlama(pdfText);
          console.log(summary);
        } catch (llamaError) {
          console.error(
            "Llama API failed after open ai quote exceeded",
            llamaError
          );
          throw new Error(
            "Failed to generate summary with available AI providers"
          );
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Filed to generate summary",
        data: null,
      };
    }

    const formattedFileNAme = formatFileNameAsTitle(fileName);
    return {
      success: true,
      message: "Summary Generated Successfully",
      data: { title: formattedFileNAme, summary },
    };
  } catch (err) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
};

const savePdfSummary = async ({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) => {
  //sql inserting pdf summary

  try {
    const sql = await getDbConnection();
    const [savedSummary] = await sql`
    INSERT INTO pdf_summaries (
      user_id,
      original_file_url,
      summary_text,
      title,
      file_name
      )VALUES(
    ${userId},
    ${fileUrl},
    ${summary},
    ${title},
    ${fileName}
     )RETURNING id, summary_text`;
    return savedSummary;
  } catch (error) {
    console.error("Error saving PDF summary", error);
    throw error;
  }
};

export const storePdfSummaryAction = async ({
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) => {
  //user is logged in and has a userId

  //savePdfSummary
  let savedSummary: any;

  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });
    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary, please try again...",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }

  //revalidate our cache
  revalidatePath(`/summaries/${savedSummary.id}`);

  return {
    success: true,
    message: "PDF summary saved successfully",
    data: { id: savedSummary.id },
  };
};
