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
  children: React.ReactNode;
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
  const handleDropdownMenuItemSelect = (event: Event) => {
    // when using the <DropdownMenuItem> component as the underlying dialog display trigger, we must prevent the default select event from firing to not bubble up to also close the dialog
    event.preventDefault();
  };

  return (
    <Dialog>
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
        <div aria-label="dialog content">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
