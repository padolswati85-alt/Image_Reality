import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div
          className={`fixed top-5 right-5 px-6 py-3 rounded-xl shadow-lg text-white z-50
          ${toast.type === "success" && "bg-green-600"}
          ${toast.type === "error" && "bg-red-600"}
          ${toast.type === "warning" && "bg-yellow-500"}
          ${toast.type === "info" && "bg-blue-600"}
          `}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);