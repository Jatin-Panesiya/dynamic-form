import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";

const PaymentSuccess = () => {
  const { formData, setFormData } = useContext(AppContext);

  const sendData = async () => {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwbTX0M4zWybNhYXuwTjQ2T8DMoE9UJHH1-oXfIxnl4AClCn8kQ2J1Gup5eXTsiu61j/exec";

    try {
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors", // Prevents CORS errors
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setFormData({});
      sessionStorage.clear();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form.");
    }
  };

  const isSuccess = sessionStorage.getItem("isSuccess");

  useEffect(() => {
    if (!isSuccess || isSuccess === "false") {
      window.location.href = "/prime-iv-onboarding";
      sessionStorage.clear();
    } else {
      sendData();
    }
  }, []);

  return !isSuccess || isSuccess === "false" ? (
    <div>Wait...</div>
  ) : (
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
