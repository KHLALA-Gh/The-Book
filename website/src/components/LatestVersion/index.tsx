"use client";
import {
  faDebian,
  faRedhat,
  faWindows,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function LatestVersion(versions: LatestVersionRespData) {
  const router = useRouter();
  return (
    <>
      <div className="pl-16 mt-24">
        <h1 className="text-[32px] font-bold">
          The Book Latest Version{" "}
          {navigator.userAgent.indexOf("Windows") !== -1
            ? versions.windows.name
            : versions.linuxDEB.name}
        </h1>
        {navigator.userAgent.indexOf("Windows") !== -1 && (
          <button
            onClick={() => {
              router.push(versions.windows.downloadUrl);
            }}
            className="btn bg-black flex items-center gap-4 !text-[20px] text-white mt-7"
          >
            <FontAwesomeIcon icon={faWindows} className="h-7" />
            Download For Windows
          </button>
        )}
        {navigator.userAgent.indexOf("Linux") !== -1 && (
          <>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  router.push(versions.linuxDEB.downloadUrl);
                }}
                className="btn bg-black flex items-center gap-4 !text-[20px] text-white mt-7"
              >
                <FontAwesomeIcon icon={faDebian} className="h-10" />
                Download for Linux .deb
              </button>
              <button
                onClick={() => {
                  router.push(versions.linuxRPM.downloadUrl);
                }}
                className="btn bg-black flex items-center gap-4 !text-[20px] text-white mt-7"
              >
                <FontAwesomeIcon icon={faRedhat} className="h-10" />
                Download for Linux .rpm
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}