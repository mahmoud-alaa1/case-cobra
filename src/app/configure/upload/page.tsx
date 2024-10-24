"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
export default function Page() {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const onDropRejected = (files: FileRejection[]) => {};
  const onDropAccepted = (files: File[]) => {
    console.log(files);
  };
  return (
    <div
      className={cn(
        "relative h-full flex-1 my-8 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
        {
          "ring-blue-900/25 bg-blue-900/10": isDragOver,
        }
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center w-full min-h-[50vh]">
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          onDragOver={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="h-full w-full flex-1 flex flex-col items-center justify-center" {...getRootProps()}>
              <input {...getInputProps()} type="text" />
              asdasd
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
}
