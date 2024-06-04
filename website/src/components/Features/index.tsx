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
      <div className="sm:pl-24 pr-4 pl-4 sm:pr-24 mt-24 flex flex-col gap-20">
        {features.map((f, i) => {
          return (
            <div
              key={i}
              className={
                "flex justify-center flex-col xl:justify-between items-center " +
                (i % 3 == 1 ? "xl:flex-row-reverse xl:gap-24" : "xl:flex-row")
              }
            >
              <div className="text-center xl:text-left">
                <h1 className="tracking-widest text-[24px] sm:text-[36px] mb-5 font-semibold">
                  {f.title}
                </h1>
                <p className="text-[#00000080] lg:text-[24px]">
                  {f.description}
                </p>
              </div>
              <div>
                <Image src={f.picture} alt="img" width={700} height={1080} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-48 text-center pl-4 pr-4 sm:pl-0 sm:pr-0 mb-32">
        <h1 className="text-[24px] sm:text-[32px] lg:text-[48px] font-semibold tracking-[0.4rem]">
          So Many other features will be added !!
        </h1>
        <p className="sm:text-[20px] text-light mt-5">
          The app is still in early versions, and there are many features coming
          soon
        </p>
        <button className="btn bg-black text-white mt-5 !text-[24px]">
          Download
        </button>
      </div>
    </>
  );
}
