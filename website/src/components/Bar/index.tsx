"use client";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Link {
  name: string;
  href: string;
  target?: string;
}

const links: Link[] = [
  {
    name: "Features",
    href: "/#features",
  },
  {
    name: "Versions",
    href: "/versions",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Source code",
    href: "https://github.com/KHLALA-Gh/The-Book",
    target: "_blank",
  },
];

export default function Bar() {
  const [showOp, setShowOp] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className="bg-white pl-4 sm:pl-10 flex justify-between pr-6 sm:pr-16 relative pt-5 items-center">
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer z-10 flex items-center gap-4 sm:gap-7 font-bold "
        >
          <Image
            width={64}
            height={64}
            className="md:w-auto md:h-auto w-[48px] h-[48px]"
            alt="logo"
            src={"/img/logo.png"}
          />
          <h1 className="text-black text-[24px] md:text-[32px]">The Book</h1>
        </div>
        <div className="z-20 justify-center items-center gap-12 text-[20px] lg:flex hidden">
          {links.map((l, i) => {
            return (
              <a target={l.target || ""} href={l.href} key={i}>
                {l.name}
              </a>
            );
          })}
        </div>
        <div
          className="lg:hidden block cursor-pointer z-20"
          onClick={() => setShowOp(!showOp)}
        >
          <FontAwesomeIcon icon={faBarsStaggered} className="h-7" />
        </div>

        <div
          className={
            "w-[300px] h-screen bg-white p-5 fixed border-2 z-10 border-black top-0 duration-300 " +
            (showOp ? "right-0" : "right-[-300px]")
          }
        >
          <h1 className="text-[24px] font-bold mt-6">Links</h1>
          <div className="mt-16">
            {links.map((l, i) => {
              return (
                <div key={i} className="mt-10 font-semibold text-[20px]">
                  <a target={l.target || ""} href={l.href}>
                    {l.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {showOp && (
        <div
          onClick={() => {
            if (showOp) {
              setShowOp(false);
            }
          }}
          className={
            "fixed z-[5] w-full h-full bg-[#00000050] top-0 duration-300 " +
            (showOp ? "opacity-100" : "opacity-0")
          }
        ></div>
      )}
    </>
  );
}
