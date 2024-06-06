"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";

export default function OtherVersions() {
  const [versions, setVersions] = useState<Versions>();
  const [selectedType, setSelectedType] = useState<
    "windows" | "linuxDEB" | "linuxRPM" | "src"
  >("windows");
  const [err, setErr] = useState<string>("");
  useEffect(() => {
    getOtherVersions()
      .then((data) => {
        setVersions(data);
      })
      .catch(() => {
        setErr("unable to get other versions");
      });
  }, []);
  const getOtherVersions = async () => {
    return (await axios.get("/api/versions")).data;
  };
  return (
    <>
      <div className="md:p-20 pl-6 pt-10">
        <h1 className="text-[36px] font-bold">Other Versions</h1>
        <div className="flex sm:gap-7 text-[14px] gap-4 sm:text-[16px]">
          <div onClick={() => setSelectedType("windows")}>
            <h1
              className={
                "cursor-pointer " +
                (selectedType === "windows" ? " font-bold" : "")
              }
            >
              Windows
            </h1>
          </div>
          <div onClick={() => setSelectedType("linuxDEB")}>
            <h1
              className={
                "cursor-pointer " +
                (selectedType === "linuxDEB" ? " font-bold" : "")
              }
            >
              LinuxDEB
            </h1>
          </div>
          <div onClick={() => setSelectedType("linuxRPM")}>
            <h1
              className={
                "cursor-pointer " +
                (selectedType === "linuxRPM" ? " font-bold" : "")
              }
            >
              LinuxRPM
            </h1>
          </div>
          <div onClick={() => setSelectedType("src")}>
            <h1
              className={
                "cursor-pointer " + (selectedType === "src" ? " font-bold" : "")
              }
            >
              Source Code
            </h1>
          </div>
        </div>
        <div className="mt-5 vers">
          {selectedType === "windows" && (
            <>
              {versions?.windows?.map((ver, i) => {
                return (
                  <div className="grid grid-cols-3 gap-7" key={i}>
                    <a
                      href={ver.downloadUrl}
                    >{`The_Book-${ver.name}-amd64.exe`}</a>
                    <h1>{ver.name}</h1>
                    <h1>{ver.date}</h1>
                  </div>
                );
              })}
            </>
          )}
          {selectedType === "linuxDEB" && (
            <>
              {versions?.linuxDEB.map((ver, i) => {
                return (
                  <div className="grid grid-cols-3 gap-7 mt-2" key={i}>
                    <div>
                      <a
                        href={ver.downloadUrl}
                      >{`the_book-${ver.name}-x86_64.deb`}</a>
                    </div>
                    <h1>{ver.name}</h1>
                    <h1>{ver.date}</h1>
                  </div>
                );
              })}
            </>
          )}
          {selectedType === "linuxRPM" && (
            <>
              {versions?.linuxRPM.map((ver, i) => {
                return (
                  <div className="grid grid-cols-3 gap-7" key={i}>
                    <a
                      href={ver.downloadUrl}
                    >{`the_book-${ver.name}-x86_64.rpm`}</a>
                    <h1>{ver.name}</h1>
                    <h1>{ver.date}</h1>
                  </div>
                );
              })}
            </>
          )}
          {selectedType === "src" && (
            <>
              {versions?.SourceCode.map((ver, i) => {
                return (
                  <div className="grid grid-cols-3 gap-7" key={i}>
                    <a
                      href={ver.downloadUrl}
                    >{`The_Book-${ver.name}-src.zip`}</a>
                    <h1>{ver.name}</h1>
                    <h1>{ver.date}</h1>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      {err}
    </>
  );
}
