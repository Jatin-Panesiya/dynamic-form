import { useContext, useState } from "react";
import Footer from "../common/Footer";
import AppContext from "../context/AppContext";
import { showToast } from "../common/toast";

const OperationHubMessage = () => {
  const { setStep } = useContext(AppContext);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="container-home">
      <div className="max-h-[calc(100vh-150px)] max-[450px]:max-h-[calc(100vh-250px)] overflow-auto pr-3">
        <div className="p-10 py-7 max-[450px]:!px-2 font-bold text-center text-3xl max-[450px]:text-xl">
          Introduction to the Operations Hub
        </div>
        <div className="max-h-[calc(100vh-450px)] overflow-auto rounded-md space-y-2 max-[450px]:px-5 px-10 mb-10">
          <div>
            The Operations Hub is your franchise’s all-in-one portal for
            managing daily operations with ease (its separate then provider
            portal). It streamlines:
          </div>
          <div>
            ✅ Administrative tasks <br /> ✅ Patient management <br /> ✅
            Financial tracking <br />
            ✅ Support & Queries <br />
          </div>
          <div>
            As the franchise owner(s), you will automatically receive full
            access, including all roles and all locations under your franchise.
          </div>
          <div>
            However, if you have additional team members, such as assistants or
            accountants, who help with operations, you can grant them role-based
            access to ensure they only see what’s relevant to their
            responsibilities. You can assign them one or multiple
            roles—Assistant, Finance, or Analyst—and, if applicable, grant
            access to one or more locations under your franchise. This keeps
            your team focused while maintaining security and efficiency.👥
          </div>
          <div>Click Next to continue setting up your access.</div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="checkbox"
              className="cursor-pointer mt-1"
              checked={isChecked}
              onChange={() => {
                setIsChecked(!isChecked);
              }}
            />
            <label htmlFor="checkbox" className="ml-2 cursor-pointer">
              I acknowledge that I have read and understand the purpose of the
              Operations Hub for managing my franchise operations.
            </label>
          </div>
        </div>
      </div>
      <Footer
        handleNextStep={() => {
          isChecked
            ? setStep(10)
            : showToast(
                "Please acknowledge that you have read and understand the purpose of the Operations Hub before proceeding",
                "error"
              );
        }}
        handlePreviousStep={() => setStep(8)}
      />
    </div>
  );
};

export default OperationHubMessage;
