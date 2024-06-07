import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center w-full h-screen flex-col">
      <h2 className="text-[32px] font-bold">
        Not The Book You Are Looking For :(
      </h2>
      <p className="text-light">Could not find requested resource</p>
      <Link
        className="mt-3 bg-black text-white pl-5 pr-5 pt-2 pb-2 font-bold"
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
}
