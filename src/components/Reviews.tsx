"use client";

import Image, { StaticImageData } from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import whatPeopleAreBuying from "../../public/what-people-are-buying.png";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import testimonials1 from "../../public/testimonials/1.jpg";
import testimonials2 from "../../public/testimonials/2.jpg";
import testimonials3 from "../../public/testimonials/3.jpg";
import testimonials4 from "../../public/testimonials/4.jpg";
import testimonials5 from "../../public/testimonials/5.jpg";
import testimonials6 from "../../public/testimonials/6.jpg";
import { div } from "framer-motion/client";
import { cn } from "@/lib/utils";

const PHONES: StaticImageData[] = [
  testimonials1,
  testimonials2,
  testimonials3,
  testimonials4,
  testimonials5,
  testimonials6,
];

function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];
  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }
  return result;
}

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  reviews: unknown[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
}) {
  const columnRef = useRef<HTMLDivElement | null>(null);

  const [columnHeight, setColumnHeight] = useState(0);

  const duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [columnHeight]);

  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    ></div>
  );
}

function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = splitArray(PHONES, 3);
  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = splitArray(columns[2], 2);

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView ? (
        <>
          <ReviewColumn reviews={PHONES} />
        </>
      ) : null}
    </div>
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
