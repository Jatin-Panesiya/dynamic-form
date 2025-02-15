import { useContext } from "react";
import Footer from "../common/Footer";
import AppContext from "../context/AppContext";

const OperationHubMessage = () => {
  const { setStep, formData } = useContext(AppContext);

  return (
    <div>
      <div className="my-5 bg-blue-500 text-white rounded-md p-5 space-y-5">
        <div>
          <strong>The Operations Hub</strong> is your franchise’s centralized
          portal designed to streamline administrative tasks, patient
          management, financial tracking, and much more
          <strong>(This is separate from the provider portal).</strong>
          It provides your team with the tools to efficiently manage operations,
          track patient progress, handle support queries, and oversee financial
          transactions—all in one place.
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
          Additionally, you can
          <strong>assign them to one or more locations</strong> as needed.
        </div>
      </div>
      <Footer
        handleNextStep={() => setStep(10)}
        handlePreviousStep={() => {
          if (formData?.isMultipleProvider) {
            setStep(14);
          } else {
            setStep(13);
          }
        }}
      />
    </div>
  );
};

export default OperationHubMessage;
