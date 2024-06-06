import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="md:pl-16">
        <div className="flex items-center gap-20 md:justify-start justify-center flex-wrap">
          <div className="">
            <Image src={"/img/logo.png"} alt="logo" width={300} height={300} />
          </div>
          <h1 className="text-[64px] font-bold">The Book</h1>
        </div>
        <h1 className="text-[24px] font-medium md:text-left text-center">
          The Book a very simple application to read books, it is supported on
          both Linux and Windows.
        </h1>
      </div>
    </>
  );
}
