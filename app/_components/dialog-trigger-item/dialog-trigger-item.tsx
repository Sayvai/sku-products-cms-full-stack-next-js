"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

type DialogTriggerItemProps = {
  /**
   * Pass in a compoonent that will render as the dialog content.
   * @example <SkuProductForm />
   */
  children: React.ReactElement;
  /**
   * The title of the dialog.
   * @example "Add New SKU Product"
   */
  title: string;
  /**
   * The description of the dialog.
   * @example "Add a new SKU product to the database."
   */
  description?: string;
  /**
   * Pass in a component that will trigger the dialog to open.
   * @example <Button>Add SKU Product</Button>
   */
  triggerComponent: React.ReactNode;
};

export default function DialogTriggerItem({
  children,
  title,
  description,
  triggerComponent,
}: DialogTriggerItemProps) {
  const [dialogOpened, setDialogOpened] = React.useState(false);

  const handleDialogOpenStateChange = () => {
    setDialogOpened((prevIsOpen) => !prevIsOpen);
  };

  return (
    <Dialog open={dialogOpened} onOpenChange={handleDialogOpenStateChange}>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {!!description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        <div aria-label="dialog content">
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              onActionCompleted: handleDialogOpenStateChange, // append an onActionCompleted prop to the passed-in child component to be called when a dialog action is completed. Note: would require child components to implement this prop if they optionally want to trigger this callback.
            });
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
