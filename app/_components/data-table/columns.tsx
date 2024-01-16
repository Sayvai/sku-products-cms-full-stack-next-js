"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

import { SkuItemApiResponse } from "@/app/_types/sku";
import { deleteSkuItem } from "@/app/_actions/sku";

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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(skuItem.sku)}
            >
              Copy SKU ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => deleteSkuItem(skuItem.sku)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
