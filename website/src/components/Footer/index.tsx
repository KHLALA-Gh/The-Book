"use client";
import { IconDefinition, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { faCodePullRequest } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RepoProps {
  icon: IconDefinition;
  name: string;
  url: string;
}

const repo: RepoProps[] = [
  {
    name: "https://github.com/KHLALA-Gh/The-Book",
    url: "https://github.com/KHLALA-Gh/The-Book",
    icon: faGithub,
  },
  {
    name: "Issues",
    url: "https://github.com/KHLALA-Gh/The-Book/issues",
    icon: faCircleDot,
  },
  {
    name: "Pull Requests",
    url: "https://github.com/KHLALA-Gh/The-Book/pulls",
    icon: faCodePullRequest,
  },
];

export default function Footer() {
  const router = useRouter();
  return (
    <>
      <div className="w-full bg-black p-7 text-white">
        <div className="grid lg:grid-cols-3 grid-cols-1">
          <div className="flex justify-center">
            <div className="text-center lg:text-left">
              <h1 className="text-[32px] font-bold">The Book</h1>
              <p className="text-light-w text-[18px]">
                A Simple application for reading books
              </p>
              <button
                onClick={() => router.push("/versions")}
                className="btn bg-white text-black !text-[20px] !pl-6 !pr-6 !pb-3 !pt-3 mt-5 w-fit"
              >
                Download
              </button>
              <div className="lg:justify-start justify-center gap-1 mt-3  lg:flex hidden">
                Copyright{" "}
                <Image
                  src={"/img/randomx_logo.png"}
                  alt="RandomX"
                  width={71}
                  height={19}
                />{" "}
                all rights reserved.
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-[36px] font-bold mb-5  lg:block hidden">
              Links
            </h1>

            <div className="flex items-center lg:flex-col gap-4 mt-6 lg:mt-0 text-[12px] lg:text-[16px]">
              <a href="/#features">Features</a>
              <a href="/versions">Versions</a>
              <a href="/about">About</a>
              <a href="https://github.com/KHLALA-Gh/The-Book">Source Code</a>
            </div>
          </div>
          <div className="lg:block hidden">
            <h1 className="text-[36px] font-bold mb-8">Repository</h1>
            <div className="flex flex-col gap-6">
              {repo.map((p, i) => {
                return (
                  <div key={i} className="flex items-center gap-3">
                    <FontAwesomeIcon icon={p.icon} className="h-8" />
                    <h1>
                      <a target="_blank" href={p.url}>
                        {p.name}
                      </a>
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="lg:justify-start justify-center gap-1 mt-3 text-[10px] sm:text-[16px] lg:hidden flex">
            Copyright{" "}
            <Image
              src={"/img/randomx_logo.png"}
              alt="RandomX"
              width={65}
              height={0}
            />{" "}
            all rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}
