import { z } from "zod";
import { zfd } from "zod-form-data";

export const skuFileUploadApiRequestValidator = zfd.formData({
  "sku-file": zfd.file(),
});

export const skuItemApiRequestValidator = zfd.formData({
  quantity: zfd.numeric(z.number().min(0)),
  sku: zfd.text(),
  description: zfd.text().optional(),
  store: zfd.text(),
});

export const skuIdValidator = z.string().regex(/^([A-Z]{2}-\d+)$/);

export type SkuItemApiRequest = z.infer<typeof skuItemApiRequestValidator>;

export type SkuItemApiResponse = z.infer<typeof skuItemApiRequestValidator>;

export type SkuFileUploadApiRequest = z.infer<
  typeof skuFileUploadApiRequestValidator
>;

export type SkuID = z.infer<typeof skuIdValidator>;
