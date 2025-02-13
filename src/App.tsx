import FullName from "./components/FullName";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const App = () => {
  return (
    <div>
      <FullName />
      <div className="bg-[#9dc83a] w-full py-3 font-semibold flex justify-between px-5">
        <button className="flex items-center gap-1 cursor-pointer">
          <FaArrowLeft className="mt-0.5 mx-1" /> <div>PREVIOUS</div>
        </button>
        <button className="flex items-center gap-1 cursor-pointer">
          <div>NEXT</div> <FaArrowRight className="mt-0.5 mx-1" />
        </button>
      </div>
    </div>
  );
};

export default App;
