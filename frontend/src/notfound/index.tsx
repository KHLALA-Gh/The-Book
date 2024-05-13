export default function NotFound() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <h1 className="text-[96px]">:(</h1>
          <h1 className="text-[64px] font-black">
            Sorry, this page doesn't exist
          </h1>
          <button
            className="bg-black mt-5 pt-3 pb-3 pl-5 pr-5 rounded-md font-bold text-white"
            onClick={() => {
              location.href = "/#";
            }}
          >
            Return Home
          </button>
        </div>
      </div>
    </>
  );
}
