"use client";

import { ColumnDef } from "@tanstack/react-table";

import { SkuItemApiResponse } from "@/app/_types/sku";
import { Actions } from "./actions";

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
  {
    id: "actions",
    cell: ({ row }) => {
      const skuItem = row.original;

      return <Actions data={skuItem} />;
    },
  },
];
