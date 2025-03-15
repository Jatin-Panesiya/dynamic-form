import { useContext, useState } from "react";
import Footer from "../common/Footer";
import AppContext from "../context/AppContext";
import { showToast } from "../common/toast";

const OperationHubMessage = () => {
  const { setStep } = useContext(AppContext);
  const [tasks, setTasks] = useState({
    admin: false,
    patient: false,
    finance: false,
    support: false,
  });

  const allChecked = Object.values(tasks).every(Boolean);

  return (
    <div className="container-home">
      <div className="max-h-[calc(100vh-150px)] max-[450px]:max-h-[calc(100vh-250px)] overflow-auto pr-3">
        <div className="p-10 py-7 max-[450px]:!px-2 font-bold text-center text-3xl max-[450px]:text-xl">
          Introduction to the Operations Hub
        </div>
        <div className="max-h-[calc(100vh-450px)] overflow-auto rounded-md space-y-2 max-[450px]:px-5 px-10 mb-10">
          <div>
            The Operations Hub is your franchise’s all-in-one portal for
            managing daily operations with ease (it's separate from the provider
            portal). It streamlines:
          </div>
          {Object.entries(tasks).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={key}
                checked={value}
                onChange={() => setTasks({ ...tasks, [key]: !value })}
              />
              <label
                htmlFor={key}
                className="flex items-center gap-2 cursor-pointer text-lg"
              >
                {key === "admin" && "Administrative tasks"}
                {key === "patient" && "Patient management"}
                {key === "finance" && "Financial tracking"}
                {key === "support" && "Support & Queries"}
              </label>
            </div>
          ))}
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
        </div>
      </div>
      <Footer
        handleNextStep={() => {
          allChecked
            ? setStep(9)
            : showToast("Please check all the tasks", "error");
        }}
        handlePreviousStep={() => setStep(7)}
      />
    </div>
  );
};

export default OperationHubMessage;
