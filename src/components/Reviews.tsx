"use client";

import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import whatPeopleAreBuying from "../../public/what-people-are-buying.png";
import { useRef } from "react";

function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    ></div>
  );
}

export default function Reviews() {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      <Image
        aria-hidden="true"
        src={whatPeopleAreBuying}
        alt=""
        className="absolute select-none hidden xl:block -left-32 top-1/3"
      />
      <ReviewGrid />
    </MaxWidthWrapper>
  );
}
