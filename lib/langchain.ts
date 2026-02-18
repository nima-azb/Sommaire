import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(fileUrl: string) {
  const response = await fetch(fileUrl);
  const blob = await response.blob();

  const arrayBuffer = await blob.arrayBuffer();

  const loader = new PDFLoader(new Blob([arrayBuffer]));

  const doc = await loader.load();

  return doc.map((doc) => doc.pageContent).join("\n");
}
