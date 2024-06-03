import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Store() {
  return (
    <>
      <div className="flex justify-center items-center flex-col w-full h-screen">
        <div>
          <FontAwesomeIcon icon={faHammer} className="h-20" />
        </div>
        <h1 className="text-[32px] font-bold mt-5">
          The Shop isn't supported yet
        </h1>
        <p className="text-light">
          This feature is not ready and still under development, maybe in the
          future it will be supported
        </p>
        <button
          onClick={() => (location.href = "/#/home")}
          className="btn text-[20px] font-bold mt-7"
        >
          Return Home
        </button>
      </div>
    </>
  );
}
