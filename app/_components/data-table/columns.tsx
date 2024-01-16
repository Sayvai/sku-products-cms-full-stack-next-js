"use client";

import { ColumnDef } from "@tanstack/react-table";

import { SkuItemApiResponse } from "@/app/_types/sku";

export const columns: ColumnDef<SkuItemApiResponse>[] = [
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "description",
    header: "Decsription",
  },
  {
    accessorKey: "quantity",
    header: "Queantity",
  },
  {
    accessorKey: "store",
    header: "Store",
  },
];
