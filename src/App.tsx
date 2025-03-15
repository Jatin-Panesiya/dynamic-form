import { Navigate, Route, Routes } from "react-router";
import Form from "./pages/Form";
import { useState, useEffect } from "react";
import AppContext from "./context/AppContext";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentSuccess from "./pages/PaymentSuccess";

const App = () => {
  const [step, setStep] = useState(() => {
    return Number(sessionStorage.getItem("step")) || 1;
  });

  const [formData, setFormData] = useState(() => {
    const savedFormData = sessionStorage.getItem("formData");
    return savedFormData ? JSON.parse(savedFormData) : {};
  });

  useEffect(() => {
    sessionStorage.setItem("step", String(step));
  }, [step]);

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <AppContext.Provider value={{ step, setStep, formData, setFormData }}>
      <Routes>
        <Route path="/prime-iv-onboarding" element={<Form />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="*" element={<Navigate to="/prime-iv-onboarding" />} />
      </Routes>
      <ToastContainer
        style={{
          background: "transparent",
          marginLeft: "130px",
        }}
        toastStyle={{
          padding: "20px",
        }}
        position="top-center"
        transition={Bounce}
        limit={3}
      />
    </AppContext.Provider>
  );
};

export default App;
