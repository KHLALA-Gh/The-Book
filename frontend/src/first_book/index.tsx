import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../assets/images/logo.png";
import { faFile } from "@fortawesome/free-solid-svg-icons";

export default function FirstBook() {
  return (
    <>
      <div className="pl-28">
        <div className="flex gap-16 pt-10 items-center">
          <div>
            <img src={Logo} alt="logo" width={128} />
          </div>
          <h1 className="text-[72px] font-black">The Book</h1>
        </div>
        <p className="font-medium text-[32px] mt-12">
          Welcome To The Book, add your libraries and your favorite books and
          enjoy reading :)
        </p>
        <div className="mt-10">
          <h1 className="text-[40px] font-bold ">Add your first book</h1>
          <div className="mt-5 flex flex-col gap-5">
            <input type="text" className="input w-[400px]" placeholder="Name" />
            <div className="file-input w-[400px] flex justify-center flex-col items-center gap-3">
              <p className="text-light">Book picture</p>
              <div className="w-[109px] h-[109px] border-2 border-light"></div>
              <p className="text-light">72x72</p>
            </div>
            <div className="file-input w-[400px] flex justify-center flex-col items-center gap-3">
              <p className="text-light">PDF Book File</p>
              <FontAwesomeIcon icon={faFile} className="h-[92px] text-light" />
              <p className="text-light">book.pdf</p>
            </div>
          </div>
          <button className="btn mt-5 text-[28px]">Create</button>
        </div>
      </div>
    </>
  );
}
