import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const token = process.env["OPENAI_API_KEY"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export const generateSummaryFromGPT = async (pdfText: string) => {
  try {
    const cleanedPdfText = pdfText.replace(/\s{2,}/g, " ").trim();

    const prompt = `${SUMMARY_SYSTEM_PROMPT}\n\nTransform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${cleanedPdfText}`;

    const client = ModelClient(endpoint, new AzureKeyCredential(token || ""));

    const response = await client.path("/chat/completions").post({
      body: {
        model,
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant specialized in summarizing documents.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        top_p: 1.0,
        max_tokens: 1500,
      },
    });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const summary = response.body.choices?.[0]?.message?.content;
    if (!summary) {
      throw new Error("Empty response from GPT-4.1 API");
    }

    return summary;
  } catch (error: any) {
    console.error("GPT-4.1 API error:", error);
    throw error;
  }
};
