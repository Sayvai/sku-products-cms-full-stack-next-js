import { existsSync, mkdir } from "fs";
import { unlink, writeFile } from "fs/promises";
import path from "path";

export async function deleteFile(fullPath: string) {
  try {
    await unlink(fullPath);
    console.log(`Temporary file deleted successfully (file: ${fullPath})`);
  } catch (error) {
    console.error("Error deleting temporary file:", error);
  }
}

export async function createTemporaryFile(file: File): Promise<string> {
  const destinationDirPath = path.join(process.cwd(), "public/tmp");
  const fullPath = path.join(destinationDirPath, file.name);

  try {
    if (!existsSync(destinationDirPath)) {
      mkdir(destinationDirPath, { recursive: true }, (err) => {
        if (err) {
          console.log(err);
          throw new Error("Error uploading file (make directory)");
        }
      });
    }

    const fileArrayBuffer = await file.arrayBuffer();

    await writeFile(fullPath, Buffer.from(fileArrayBuffer));
  } catch (error) {
    console.log(error);
    throw new Error("Error uploading file (write file)");
  } finally {
  }

  return fullPath;
}
