"use client";

import { useQuery } from "@tanstack/react-query";
import { getPaymentStatus } from "./actions";

export default function ThankYou() {
  const {} = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: getPaymentStatus,
  });

  return <div>ThankYou</div>;
}
