import { useState } from "react";

interface useFileUpload {
  fileName: string | null;
  loading: boolean;
  error: string | null;
  uploadFile: (file: File) => void;
}

const useFileUpload = (): useFileUpload => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  async function uploadFile(file: File) {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("sku-file", file);

      const response = await fetch("/api/sku/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`Failure during upload process: ${responseText}`);
      }

      setFile(file);
    } catch (err) {
      setError(
        `There is a problem uploading the file: ${JSON.stringify(
          (err as Error).message || err
        )}`
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    fileName: file?.name || null,
    loading,
    error,
    uploadFile,
  };
};

export default useFileUpload;
