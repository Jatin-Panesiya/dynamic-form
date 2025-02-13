import { JSX, useContext } from "react";
import AppContext from "../context/AppContext";
import FullName from "../components/FullName";
import ContactNumber from "../components/ContactNumber";
import EmailAddress from "../components/EmailAddress";
import SoleOwner from "../components/SoleOwner";

const useGetComponent = () => {
  const { step } = useContext(AppContext);

  const components: { [key: number]: JSX.Element } = {
    1: <FullName />,
    2: <ContactNumber />,
    3: <EmailAddress />,
    4: <SoleOwner />,
  };

  return components[step] || null;
};

export default useGetComponent;
