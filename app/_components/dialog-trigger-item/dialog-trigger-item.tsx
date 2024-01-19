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
  children: React.ReactElement;
  title: string;
  description?: string;
  triggerItem: React.ReactNode | string;
};

export default function DialogTriggerItem({
  children,
  title,
  description,
  triggerItem,
}: DialogTriggerItemProps) {
  const [dialogOpened, setDialogOpened] = React.useState(false);

  const handleDropdownMenuItemSelect = (event: Event) => {
    // when using the <DropdownMenuItem> component as the underlying dialog display trigger, we must prevent the default select event from firing to not bubble up to also close the dialog
    event.preventDefault();
  };

  const handleDialogOpenStateChange = () => {
    setDialogOpened((prevIsOpen) => !prevIsOpen);
  };

  return (
    <Dialog open={dialogOpened} onOpenChange={handleDialogOpenStateChange}>
      <DialogTrigger asChild>
        {typeof triggerItem === "string" ? (
          <DropdownMenuItem onSelect={handleDropdownMenuItemSelect}>
            {triggerItem}
          </DropdownMenuItem>
        ) : (
          triggerItem
        )}
      </DialogTrigger>
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
