import fs from "fs-extra";
import path from "path";

type MulterFile = Express.Multer.File;

export const saveTempFile = async (file: MulterFile) => {
  const tempDir = path.join(process.cwd(), "public", "temp");
  await fs.ensureDir(tempDir);

  const filePath = path.join(tempDir, file.originalname);
  await fs.writeFile(filePath, file.buffer);

  return filePath;
};

export const deleteTempFile = async (filePath: string) => {
  try {
    await fs.remove(filePath);
  } catch (err) {
    console.error("Failed to delete temp file:", err);
  }
};
