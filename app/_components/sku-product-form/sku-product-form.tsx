"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateSkuItem, createSkuItem } from "@/app/_actions/sku";
import {
  SkuItemApiRequest,
  skuItemApiRequestValidator,
} from "@/app/_types/sku";
import { Button } from "../ui/button";
import { useToast } from "@/app/_components/ui/use-toast";

interface SkuProductFormProps {
  data?: SkuItemApiRequest;
  primaryActionLabel?: string;
  onActionCompleted?: () => void;
}

export default function SkuProductForm({
  data,
  primaryActionLabel = "Submit",
  onActionCompleted,
}: SkuProductFormProps) {
  const { toast } = useToast();

  const editMode = !!data?.sku;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SkuItemApiRequest>({
    resolver: zodResolver(skuItemApiRequestValidator),
    defaultValues: data,
  });

  const processForm: SubmitHandler<SkuItemApiRequest> = async (data) => {
    let saveItem = editMode ? updateSkuItem : createSkuItem;

    const result = await saveItem(data);

    if (!result.success) {
      console.log(`Something went wrong. ${result.error}`);

      toast({
        description: `Something went wrong. ${result.error}`,
        variant: "destructive",
        duration: 5000,
      });

      reset();
      return;
    }

    toast({
      description: `SKU ID: ${result.data.sku} has been saved.`,
      variant: "success",
      duration: 5000,
    });

    onActionCompleted && onActionCompleted();
  };

  return (
    <section className="flex gap-6">
      <form
        onSubmit={handleSubmit(processForm)}
        className="flex flex-1 flex-col gap-4 sm:w-1/2"
      >
        <label className="text-sm dark:text-gray-400">SKU ID</label>
        <input
          placeholder="SKU ID"
          className="uppercase rounded-md p-2 border-2 dark:border-gray-600 border-gray-800"
          {...register("sku")}
          disabled={editMode} //disable this SKU ID input only when in edit mode
        />
        {errors.sku?.message && (
          <p className="text-sm text-red-400">{errors.sku.message}</p>
        )}

        <label className="text-sm dark:text-gray-400">Description</label>
        <textarea
          rows={5}
          placeholder="Description"
          className="rounded-md p-2 border-2 dark:border-gray-600 border-gray-800"
          {...register("description")}
        />
        {errors.description?.message && (
          <p className="text-sm text-red-400">{errors.description.message}</p>
        )}

        <label className="text-sm dark:text-gray-400">Quantity</label>
        <input
          placeholder="Quantity"
          className="w-1/2 rounded-md p-2 border-2 dark:border-gray-600 border-gray-800"
          {...register("quantity")}
        />
        {errors.quantity?.message && (
          <p className="text-sm text-red-400">{errors.quantity.message}</p>
        )}

        <label className="text-sm dark:text-gray-400">Store</label>
        <input
          placeholder="Store"
          className="w-1/5 uppercase rounded-md p-2 border-2 dark:border-gray-600 border-gray-800"
          {...register("store")}
        />
        {errors.store?.message && (
          <p className="text-sm text-red-400">{errors.store.message}</p>
        )}
        <div className="mt-4">
          <Button disabled={isSubmitting} className="w-full">
            {primaryActionLabel}
          </Button>
        </div>
      </form>
    </section>
  );
}
