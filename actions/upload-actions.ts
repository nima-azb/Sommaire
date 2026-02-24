"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromLlama } from "@/lib/llamaai";
import { generateSummaryFromGPT } from "@/lib/openai";

export async function generatePdfSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    },
  ],
) {
  if (!uploadResponse) {
    return {
      seccess: false,
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
      seccess: false,
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
      console.log({ summary });
    } catch (error) {
      console.log(error);
      //call Llama
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDE") {
        try {
          summary = await generateSummaryFromLlama(pdfText);
        } catch (llamaError) {
          console.error(
            "Llama API failed after open ai quote exceeded",
            llamaError,
          );
          throw new Error(
            "Failed to generate summary with available AI providers",
          );
        }
      }
    }

    if (!summary) {
      return {
        seccess: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    return {
      seccess: true,
      message: "Summary generated successfully",
      data: { summary },
    };
  } catch (err) {
    return {
      seccess: false,
      message: "File upload failed",
      data: null,
    };
  }
}
