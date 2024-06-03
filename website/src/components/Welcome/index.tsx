import Image from "next/image";

export default function Welcome() {
  return (
    <>
      <div className="flex gap-5 p-10  justify-evenly relative">
        <div className="ml-10 z-[4] ">
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
          <button className="btn bg-black text-white md:ml-7 md:!text-[32px] !text-[18px]">
            Download
          </button>
        </div>

        <div className="xl:relative md:block md:w-auto md:h-auto w-[250px] h-[300px] absolute right-10 bottom-0">
          <Image
            src={"/img/book_img.png"}
            alt="Image"
            width={530}
            height={650}
          />
        </div>
      </div>
    </>
  );
}
