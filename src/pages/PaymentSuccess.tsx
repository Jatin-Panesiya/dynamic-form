import { useContext } from "react";
import AppContext from "../context/AppContext";

const PaymentSuccess = () => {
  const { formData } = useContext(AppContext);
  console.log(formData, "========");
  return (
    <div>
      <img
        className="h-screen w-full object-cover max-[700px]:hidden"
        src="./payment_success_desktop.jpg"
        alt=""
      />
      <img
        className="h-screen w-full object-cover min-[700px]:hidden"
        src="./payment_success_mobile.jpg"
        alt=""
      />
    </div>
  );
};

export default PaymentSuccess;
