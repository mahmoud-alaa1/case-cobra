import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import React, { HTMLAttributes } from "react";
import phoneTemplateDarkEdges from "../../public/phone-template-dark-edges.png";
import phoneTemplateWhiteEdges from "../../public/phone-template-white-edges.png";
interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  ImageSrc: StaticImageData | string;
  dark?: boolean;
}

export default function Phone({ ImageSrc, dark = false, className, ...props }: PhoneProps) {
  return (
    <div className={cn("relative pointer-events-none z-50 overflow-hidden", className)} {...props}>
      <Image
        src={dark ? phoneTemplateDarkEdges : phoneTemplateWhiteEdges}
        className="pointer-events-none z-50 select-none"
        alt="phone image"
      />
      <div className="absolute -z-10 inset-0">
        <Image className="object-cover" src={ImageSrc} alt="overlaying phone image" />
      </div>
    </div>
  );
}
