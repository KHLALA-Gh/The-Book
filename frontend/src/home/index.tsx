import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Bar from "../components/Bar";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
      <div className="flex">
        <Bar />
        <div className="mt-24 pl-16">
          <h1 className="text-[64px] font-black">
            <FontAwesomeIcon icon={faHouse} className="mr-10" />
            Your Home
          </h1>
        </div>
      </div>
    </>
  );
}
