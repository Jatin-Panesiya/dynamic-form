import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Form from "./pages/Form";
import { useState } from "react";
import AppContext from "./context/AppContext";

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  return (
    <AppContext.Provider value={{ step, setStep, formData, setFormData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
