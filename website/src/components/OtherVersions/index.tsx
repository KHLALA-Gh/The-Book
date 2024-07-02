"use client";

import { useState } from "react";
import "./style.css";
import Version from "./version";

interface OtherVersionsProps {
  releases: Release[];
}

export default function OtherVersions({ releases }: OtherVersionsProps) {
  const [selectedType, setSelectedType] = useState<keyof Release>("windows");
  const [err, setErr] = useState<string>("");
  const OSs = ["Windows", "LinuxDEB", "LinuxRPM", "Source Code"];
  return (
    <>
      <div className="md:p-20 pl-6 pt-10">
        <h1 className="text-[36px] font-bold">Other Versions</h1>
        <div className="flex sm:gap-7 text-[14px] gap-4 sm:text-[16px]">
          {OSs.map((os, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  if (i === 0) setSelectedType("windows");
                  if (i === 1) setSelectedType("linuxDEB");
                  if (i === 2) setSelectedType("linuxRPM");
                  if (i === 3) setSelectedType("SourceCode");
                }}
              >
                <h1
                  className={
                    "cursor-pointer " +
                    (selectedType.toLowerCase() === os.toLowerCase()
                      ? " font-bold"
                      : "")
                  }
                >
                  {os}
                </h1>
              </div>
            );
          })}
        </div>
        <div className="mt-5 vers">
          {releases.map((rel, i) => {
            return <Version {...rel[selectedType]} key={i} />;
          })}
        </div>
      </div>
      {err}
    </>
  );
}
