"use client";

import HandleComponent from "@/components/HandleComponent";

import { RadioGroup } from "@headlessui/react";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";

import NextImage from "next/image";

import { Label } from "@/components/ui/label";
import { COLORS } from "@/validators/option-validator";
import { useState } from "react";
import { Rnd } from "react-rnd";

interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
}

export default function DesignConfigurator({ configId, imageUrl, imageDimensions }: DesignConfiguratorProps) {
  const [options, setOptions] = useState<{ color: (typeof COLORS)[number] }>({
    color: COLORS[0],
  });

  return (
    <div className="relative mt-20 grid grid-cols-3 mb-20 pb-20">
      <div className="relative h-[37.5rem] overflow-hidden col-span-2 max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio ratio={896 / 1831} className="pointer-events-none relative z-50 aspect-[896/1831] w-full">
            <div className="realtive">
              <NextImage
                fill
                alt="phone image"
                src="/phone-template.png"
                className="pointer-events-none z-50 select-none"
              />
            </div>
          </AspectRatio>
          <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
              `bg-${options.color.tw}`
            )}
          />
        </div>
        <Rnd
          default={{
            x: 150,
            y: 205,
            width: imageDimensions.width / 4,
            height: imageDimensions.height / 4,
          }}
          className="absolute z-20 border-[3px] border-primary"
          lockAspectRatio
          resizeHandleComponent={{
            bottomLeft: <HandleComponent />,
            bottomRight: <HandleComponent />,
            topLeft: <HandleComponent />,
            topRight: <HandleComponent />,
          }}
        >
          <div className="relative w-full h-full">
            <NextImage src={imageUrl} alt="your image" className="pointer-events-none" fill />
          </div>
        </Rnd>
      </div>
      <div className="h-[37.5rem] flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />
          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl">Customize your case</h2>
            <div className="w-full h-px bg-zinc-200 my-6" />
            <div className="realtive  mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <RadioGroup
                  value={options.color}
                  onChange={(val) => {
                    setOptions((prev) => ({ ...prev, color: val }));
                  }}
                >
                  <Label>Color: {options.color.label}</Label>
                  <div className="mt-3   flex items-center space-x-3">
                    {COLORS.map((color) => {
                      console.log(`bg-${color.tw}`);
                      return (
                        <RadioGroup.Option
                          key={color.label}
                          value={color}
                          className={({ active, checked }) =>
                            cn(
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                              {
                                [`border-${color.tw}`]: active || checked,
                              }
                            )
                          }
                        >
                          {/* A comment to make tailwind dynamic classes work */}
                          {/* bg-zinc-900 bg-rose-950 bg-blue-950 border-zinc-900 border-rose-950 border-blue-950*/}

                          <span
                            className={cn(
                              "h-8 w-8 rounded-full border border-black border-opacity-10",
                              `bg-${color.tw}`
                            )}
                          />
                        </RadioGroup.Option>
                      );
                    })}
                  </div>
                </RadioGroup>
                <div className="relative flex flex-col gap-3 w-full">
                  <Label>Model</Label>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
