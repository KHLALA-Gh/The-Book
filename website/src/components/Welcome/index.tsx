"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
export default function Welcome() {
  const route = useRouter();
  return (
    <>
      <div className="flex gap-5 p-10  justify-evenly relative">
        <div className="ml-10 z-[4] ">
          <motion.div
            initial={{
              translateY: "-50px",
              opacity: 0,
            }}
            animate={{
              translateY: "0",
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h1 className="tracking-widest text-[64px] md:text-[128px] md:leading-[200px] leading-[100px]">
              Enjoy
            </h1>
            <h1 className="tracking-widest text-[64px] md:text-[128px] md:leading-[200px] leading-[100px]">
              {" "}
              Reading
            </h1>
            <h1 className="tracking-widest text-[64px] md:text-[128px] md:leading-[200px] leading-[100px]">
              Your Books
            </h1>
          </motion.div>
          <motion.button
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="btn bg-black text-white md:ml-7 md:!text-[32px] !text-[18px]"
            onClick={() => route.push("/versions")}
          >
            Download
          </motion.button>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            translateY: "50px",
          }}
          animate={{
            opacity: 1,
            translateY: "0",
          }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="xl:relative md:block md:w-auto md:h-auto w-[250px] h-[300px] absolute right-10 bottom-0"
        >
          <Image
            src={"/img/book_img.png"}
            alt="Image"
            width={530}
            height={650}
          />
        </motion.div>
      </div>
    </>
  );
}
