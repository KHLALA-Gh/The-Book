"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface Features {
  title: string;
  description: string;
  picture: string;
}

const features: Features[] = [
  {
    title: "Organise your books",
    description:
      "Your books are well organized in the app with a very simple system and beautiful user interface.",
    picture: "/img/lib.png",
  },
  {
    title: "Auto Save Your Progress",
    description:
      "Your reading progress is saved automatically, you don't need to memorize your last page.",
    picture: "/img/prog.png",
  },
  {
    title: "Good book viewer",
    description:
      "Enjoy reading with a simple and nice book viewer that lets you see all the book chapters and the outlines.",
    picture: "/img/viewer.png",
  },
];

export default function Features() {
  return (
    <>
      <div className="sm:pl-24 pr-4 pl-4 sm:pr-24 mt-32 flex items-center flex-col gap-64">
        {features.map((f, i) => {
          return (
            <div
              key={i}
              className={
                "flex xl:flex-row flex-col items-center " +
                (i % 3 == 1 ? "xl:flex-row-reverse xl:gap-24" : "xl:flex-row")
              }
            >
              <div className="text-center xl:text-left">
                <motion.h1
                  initial={{
                    translateX: "-50px",
                    opacity: 0,
                  }}
                  whileInView={{
                    translateX: 0,
                    opacity: 1,
                  }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="tracking-widest text-[24px] sm:text-[36px] mb-5 font-semibold"
                >
                  {f.title}
                </motion.h1>
                <p className="text-[#00000080] lg:text-[24px]">
                  {f.description.split(" ").map((word, i) => {
                    return (
                      <motion.span
                        className="inline-block mr-[6px]"
                        initial={{
                          translateY: "10px",
                          opacity: 0,
                        }}
                        whileInView={{
                          translateY: "0",
                          opacity: 1,
                        }}
                        transition={{
                          duration: 0.2,
                          delay: i * 0.05,
                        }}
                        viewport={{ once: true }}
                        key={i}
                      >
                        {word + " "}
                      </motion.span>
                    );
                  })}
                </p>
              </div>
              <motion.div
                initial={{
                  translateY: "50px",
                  translateX: "50px",
                  opacity: 0,
                }}
                whileInView={{
                  translateY: "0",
                  translateX: "0",
                  opacity: 1,
                }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <Image src={f.picture} alt="img" width={700} height={1080} />
              </motion.div>
            </div>
          );
        })}
      </div>
      <div className="mt-64 text-center pl-4 pr-4 sm:pl-0 sm:pr-0 mb-64">
        <div className="overflow-hidden relative">
          <motion.h1
            initial={{
              translateY: "99%",
              opacity: 0,
            }}
            whileInView={{
              translateY: "0",
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[24px] sm:text-[32px] lg:text-[48px] font-semibold tracking-[0.4rem]"
          >
            So Many other features will be added !!
          </motion.h1>
        </div>
        <p className="sm:text-[20px] text-light mt-5">
          The app is still in early versions, and there are many features coming
          soon
        </p>
        <button className="btn overflow-hidden bg-black relative text-white mt-5 !text-[24px]">
          Download
        </button>
      </div>
    </>
  );
}
