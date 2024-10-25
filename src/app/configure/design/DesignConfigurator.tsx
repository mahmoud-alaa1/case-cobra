"use client";

import HandleComponent from "@/components/HandleComponent";

import { RadioGroup } from "@headlessui/react";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";

import NextImage from "next/image";

import { Label } from "@/components/ui/label";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/validators/option-validator";
import { useState } from "react";
import { Rnd } from "react-rnd";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
}

export default function DesignConfigurator({ configId, imageUrl, imageDimensions }: DesignConfiguratorProps) {
  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" role="combobox" className="w-full justify-between">
                        {options.model.label}
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.label}
                          className={cn(
                            "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100 transition",
                            {
                              "bg-zinc-100": model.value === options.model.value,
                            }
                          )}
                          onClick={() => setOptions((prev) => ({ ...prev, model }))}
                        >
                          <Check
                            className={cn(
                              "mr-2 size-4",
                              model.label === options.model.label ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {[MATERIALS, FINISHES].map(({ name, options: selectableOptions }) => (
                  <RadioGroup
                    key={name}
                    value={options[name]}
                    onChange={(val) => {
                      setOptions((prev) => ({ ...prev, [name]: val }));
                    }}
                  >
                    <Label>{name.slice(0, 1).toUpperCase() + name.slice(1)}</Label>
                    <div className="mt-3 space-y-4">
                      {selectableOptions.map((option) => (
                        <RadioGroup.Option
                          key={option.value}
                          value={option}
                          className={({ active, checked }) =>
                            cn(
                              "relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                              {
                                "border-primary": checked || checked,
                              }
                            )
                          }
                        >
                          <span className="flex items-center">
                            <span className="flex flex-col text-sm">
                              <RadioGroup.Label as="span" className="font-medium text-gray-900">
                                {option.label}
                              </RadioGroup.Label>
                              {option.description && (
                                <RadioGroup.Description as="span" className="text-gray-500">
                                  <span className="block sm:inline">{option.description}</span>
                                </RadioGroup.Description>
                              )}
                            </span>
                          </span>
                          <RadioGroup.Description
                            as="span"
                            className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right "
                          >
                            <span className="font-medium text-gray-900"></span>
                          </RadioGroup.Description>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
