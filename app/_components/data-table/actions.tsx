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
import DialogTriggerItem from "@/app/_components/dialog-trigger-item/dialog-trigger-item";
import SkuProductForm from "@/app/_components/sku-product-form/sku-product-form";
import { deleteSkuItem } from "@/app/_actions/sku";
import { SkuItemApiRequest } from "@/app/_types/sku";
import { useToast } from "@/app/_components/ui/use-toast";

interface ActionsProps {
  data: SkuItemApiRequest;
}

export function Actions({ data }: ActionsProps) {
  const { toast } = useToast();

  async function handleDeleteItemClick(skuId: string) {
    const processingToast = toast({
      description: `Deleting SKU ID: ${skuId}`,
      variant: "info",
      duration: Infinity,
    });

    await deleteSkuItem(skuId);

    processingToast.dismiss();

    toast({
      description: `SKU ID: ${skuId} has been deleted.`,
      variant: "success",
      duration: 5000,
    });
  }

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
          onClick={() => navigator.clipboard.writeText(data.sku)}
        >
          Copy SKU ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DialogTriggerItem
          title={`Edit SKU ID: ${data.sku}`}
          triggerComponent={
            <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
              Edit
            </DropdownMenuItem>
          }
        >
          <SkuProductForm data={data} primaryActionLabel="Update" />
        </DialogTriggerItem>
        <DropdownMenuItem onClick={() => handleDeleteItemClick(data.sku)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
