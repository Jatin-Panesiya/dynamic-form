import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Form from "./pages/Form";
import { useState } from "react";
import AppContext from "./context/AppContext";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [step, setStep] = useState(8);
  const [formData, setFormData] = useState({});

  return (
    <AppContext.Provider value={{ step, setStep, formData, setFormData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
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
