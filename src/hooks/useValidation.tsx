import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
}

type ValidationRule = {
  required?: boolean;
  message?: string;
};

type ValidationRules<T> = Partial<Record<keyof T, ValidationRule>>;

type Errors<T> = Partial<Record<keyof T, string>>;

const useValidation = (rules: ValidationRules<FormData>) => {
  const [errors, setErrors] = useState<Errors<FormData>>({});

  const validateFields = (formData: FormData): boolean => {
    let newErrors: Errors<FormData> = {};

    Object.keys(rules).forEach((field) => {
      const rule = rules[field as keyof FormData];
      const value = formData[field as keyof FormData];

      if (
        rule?.required &&
        (!value || (typeof value === "string" && !value.trim()))
      ) {
        newErrors[field as keyof FormData] =
          rule.message || `${field} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const clearError = (fieldName: keyof FormData) => {
    setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
  };

  return { errors, validateFields, clearError };
};

export default useValidation;
