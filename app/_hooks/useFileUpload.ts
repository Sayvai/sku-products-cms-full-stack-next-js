import { useState } from "react";
import { revalidatePathOnClient } from "../_actions/cache";
import { useToast } from "@/app/_components/ui/use-toast";

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

  const { toast } = useToast();

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

      toast({
        description: "File uploaded successfully",
        variant: "success",
        duration: 5000,
      });
    } catch (err) {
      setError(
        `There is a problem uploading the file: ${JSON.stringify(
          (err as Error).message || err
        )}`
      );

      toast({
        title: "File upload failed",
        description: error,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);

      revalidatePathOnClient("/sku-cms");
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
