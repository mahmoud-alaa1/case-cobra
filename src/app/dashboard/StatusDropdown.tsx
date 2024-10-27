"use client";

import { OrderStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { updateOrderStatus as updateOrderStatusAction } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
  awaiting_payment: "Awaiting Payment",
  shipped: "Shipped",
  fulfilled: "Fulfilled",
};

export default function StatusDropdown({
  id,
  orderStatus,
}: {
  id: string;
  orderStatus: OrderStatus;
}) {
  const router = useRouter();

  const { toast } = useToast();
  const { mutate } = useMutation({
    mutationKey: ["update-order-status"],
    mutationFn: updateOrderStatusAction,
    onSuccess: () => router.refresh(),
    onError: (error) => {
      toast({
        title: "Failed to update order status",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-52 flex justify-between items-center"
          variant="outline"
        >
          {LABEL_MAP[orderStatus]}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        {Object.keys(OrderStatus).map((status) => (
          <DropdownMenuItem
            key={status}
            className={cn(
              "flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100",
              {
                "bg-zinc-100": status === orderStatus,
              }
            )}
            onClick={() => mutate({ id, newStatus: status as OrderStatus })}
          >
            <Check
              className={cn(
                "mr-2 size-4 text-primary",
                orderStatus === status ? "opacity-100" : "opacity-0"
              )}
            />
            {LABEL_MAP[status as OrderStatus]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
