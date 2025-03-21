import { JSX, useContext } from "react";
import AppContext from "../context/AppContext";
import FullName from "../components/FullName";
import ContactNumber from "../components/ContactNumber";
import EmailAddress from "../components/EmailAddress";
import SoleOwner from "../components/SoleOwner";
import AdditionalOwner from "../components/AdditionalOwner";
import MultipleLocations from "../components/MultipleLocations";
import MultipleProvider from "../components/MultipleProvider";
import OperationHubMessage from "../components/OperationHubMessage";
import AskMoreThanOneMember from "../components/AskMoreThanOneMember";
import AdditioanlMembers from "../components/AdditioanlMembers";
import CardVerification from "../components/CardVerification";
import Kits from "../components/Kits";

export const components: { [key: number]: JSX.Element } = {
  1: <FullName />,
  2: <ContactNumber />,
  3: <EmailAddress />,
  4: <SoleOwner />,
  5: <AdditionalOwner />,
  6: <MultipleLocations />,
  7: <MultipleProvider />,
  8: <Kits />,
  9: <OperationHubMessage />,
  10: <AskMoreThanOneMember />,
  11: <AdditioanlMembers />,
  12: <CardVerification />,
};

export const totalSteps = Object.keys(components).length;

const useGetComponent = () => {
  const { step } = useContext(AppContext);
  return components[step] || null;
};

export default useGetComponent;
