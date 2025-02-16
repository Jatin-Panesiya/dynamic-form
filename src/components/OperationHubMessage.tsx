import { useContext } from "react";
import Footer from "../common/Footer";
import AppContext from "../context/AppContext";

const OperationHubMessage = () => {
  const { setStep } = useContext(AppContext);

  return (
    <div className="container-home">
      <div className="max-h-[calc(100vh-150px)] max-[450px]:max-h-[calc(100vh-250px)] overflow-auto">
        <div className="p-10 max-[450px]:!px-2 text-5xl text-center max-[450px]:text-2xl">
          Operation Hub: Portal Access
        </div>
        <div className=" rounded-md space-y-5 max-[450px]:px-5 px-10 mb-10 text-center">
          <div>
            <strong>The Operations Hub</strong> is your franchise’s centralized
            portal designed to streamline administrative tasks, patient
            management, financial tracking, and much more
            <strong>(This is separate from the provider portal).</strong>
            It provides your team with the tools to efficiently manage
            operations, track patient progress, handle support queries, and
            oversee financial transactions—all in one place.
          </div>
          <div>
            As the <strong>franchise owner</strong>, you will automatically
            receive <strong>full access</strong>, including{" "}
            <strong>all roles and all locations</strong> under your franchise.
            However, if you have additional team members (such as assistants or
            accountants) who assist with operations, you can grant them access
            based on their role.
          </div>
          <div>
            You can <strong>assign one or multiple roles</strong> to each team
            member, ensuring they only see the relevant sections of the portal.
            Additionally, you can{" "}
            <strong>assign them to one or more locations</strong> as needed.
          </div>
        </div>
      </div>
      <Footer
        handleNextStep={() => setStep(9)}
        handlePreviousStep={() => {
          setStep(7);
        }}
      />
    </div>
  );
};

export default OperationHubMessage;
