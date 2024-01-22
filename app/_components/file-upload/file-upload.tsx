"use client";

import clsx from "clsx";
import { useState } from "react";
import useFileUpload from "../../_hooks/useFileUpload";
import { SKU_FILE_UPLOAD_TYPES } from "@/app/_types/sku";
import { useToast } from "@/app/_components/ui/use-toast";

type FileUploadProps = {
  buttonLabel?: string;
  dropZoneLabel?: string;
};

const FileUpload = ({
  buttonLabel = "Select File",
  dropZoneLabel = "Or Drop File Here",
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const { toast } = useToast();

  const {
    fileName,
    loading: uploading,
    error: uploadError,
    uploadFile,
  } = useFileUpload();

  const acceptedFileTypes = SKU_FILE_UPLOAD_TYPES.join(", ");

  function saveSelectedFileToState(file: File) {
    uploadFile(file);
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFile = e.target.files?.[0] || null;

    if (uploadedFile && SKU_FILE_UPLOAD_TYPES.includes(uploadedFile.type)) {
      saveSelectedFileToState(uploadedFile);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0] || null;

    if (droppedFile && SKU_FILE_UPLOAD_TYPES.includes(droppedFile.type)) {
      saveSelectedFileToState(droppedFile);
    } else {
      toast({
        description: `File type not accepted. Accepted file type(s) are the following: ${acceptedFileTypes}`,
        variant: "destructive",
        duration: 5000,
      });
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    setIsDragging(true);
  }

  return (
    <form>
      <div
        className={clsx(
          "flex flex-col gap-4 mt-4 p-6 border-2 border-solid border-gray-700 rounded-lg",
          { "border-purple-100 opacity-50": isDragging }
        )}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="upload-btn"
          onChange={handleUpload}
          accept={acceptedFileTypes}
          hidden
          multiple={false}
        />
        <label
          htmlFor="upload-btn"
          className="block text-white text-3xl p-8 rounded-2xl text-center font-semibold cursor-pointer shadow-2xl bg-gradient-to-bl from-[#1B2450] to-[#232334] hover:bg-gradient-to-bl hover:from-[#151E4B] hover:to-[#242430]"
        >
          {buttonLabel}
        </label>
        <p className="block text-2xl text-center">{dropZoneLabel}</p>
        <small className="text-center text-gray-500 dark:text-gray-300">
          Accepted file type(s):{" "}
          <span className="text-orange-500 font-bold">{acceptedFileTypes}</span>
        </small>
        <small className="text-center text-gray-500 dark:text-gray-300">
          ⚠️ Re-uploading files will reset the data,
        </small>
        {uploading && (
          <p className="block text-2xl text-center">Uploading...</p>
        )}
        {uploadError && (
          <p className="block text-2xl text-center text-red-500">
            {uploadError}
          </p>
        )}
        {fileName && !uploading && !uploadError ? (
          <span className="block text-2xl text-center">
            <span className="text-emerald-500">{fileName}</span> - uploaded
            successfully! 🎊
          </span>
        ) : null}
      </div>
    </form>
  );
};

export default FileUpload;
