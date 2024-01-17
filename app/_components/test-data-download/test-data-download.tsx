export default function TestDataDownload() {
  return (
    <p>
      You may download the initial mock data to get started;{" "}
      <a
        href="/sku-test-data.csv"
        target="_blank"
        rel="noopener noreferrer"
        download="sku-test-data.csv"
        className="text-blue-500 underline"
      >
        sku-test-data.csv
      </a>
    </p>
  );
}
