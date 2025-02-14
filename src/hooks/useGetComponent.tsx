import { JSX, useContext } from "react";
import AppContext from "../context/AppContext";
import FullName from "../components/FullName";
import ContactNumber from "../components/ContactNumber";
import EmailAddress from "../components/EmailAddress";
import SoleOwner from "../components/SoleOwner";
import LocationDetails from "../components/LocationDetails";
import AdditionalOwner from "../components/AdditionalOwner";

export const components: { [key: number]: JSX.Element } = {
  1: <FullName />,
  2: <ContactNumber />,
  3: <EmailAddress />,
  4: <SoleOwner />,
  5: <LocationDetails />,
  6: <AdditionalOwner />,
  7: <LocationDetails />,
};

export const totalSteps = Object.keys(components).length;

const useGetComponent = () => {
  const { step } = useContext(AppContext);
  return components[step] || null;
};

export default useGetComponent;
