import DialogTriggerItem from "@/app/_components/dialog-trigger-item/dialog-trigger-item";
import SkuProductForm from "@/app/_components/sku-product-form/sku-product-form";
import { Button } from "@/app/_components/ui/button";

export default function SkuAddProductBtn() {
  return (
    <div className="">
      <DialogTriggerItem
        title="Add New SKU Product"
        triggerItem={
          <Button className="w-full dark:bg-green-600 bg-green-800">
            Add SKU Product
          </Button>
        }
      >
        <SkuProductForm />
      </DialogTriggerItem>
    </div>
  );
}
