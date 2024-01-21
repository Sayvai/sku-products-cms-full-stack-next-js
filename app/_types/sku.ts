import { z } from "zod";
import { zfd } from "zod-form-data";

export const SKU_FILE_UPLOAD_TYPES = ["text/csv"];

export const skuFileUploadApiRequestValidator = zfd.formData({
  "sku-file": zfd.file(
    z
      .custom<File>((val) => val instanceof File, "Please upload a file")
      .refine((file) => SKU_FILE_UPLOAD_TYPES.includes(file.type), {
        message: `File must be of type(S) ${SKU_FILE_UPLOAD_TYPES.join(", ")}`,
      })
  ),
});

export const skuIdValidator = zfd.text(
  z
    .string()
    .regex(
      /^([A-Za-z]{2}-\d+)$/,
      'SKU ID must be in the format "XX-0000". E.g. "UK-1234" or "US-567863"'
    )
    .transform((val) => val.toUpperCase())
);

export const skuItemApiRequestValidator = zfd.formData({
  quantity: zfd.numeric(z.number().min(0)),
  sku: skuIdValidator,
  description: zfd.text(z.string().optional()),
  store: zfd.text(
    z
      .string()
      .regex(/^([A-Za-z]{3})$/, 'Store must be in the format "XXX". E.g. "NYC"')
      .transform((val) => val.toUpperCase())
  ),
});

export type SkuItemApiRequest = z.infer<typeof skuItemApiRequestValidator>;

export type SkuItemApiResponse = z.infer<typeof skuItemApiRequestValidator>;

export type SkuFileUploadApiRequest = z.infer<
  typeof skuFileUploadApiRequestValidator
>;

export type SkuID = z.infer<typeof skuIdValidator>;
