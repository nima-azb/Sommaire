export default function SummaryViewer({ summary }: { summary: string }) {
  return (
    <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">
      {summary}
    </h1>
  );
}
