import React, {createContext, useContext, useState} from 'react';

const ToastContext = createContext({});

export function ToastProvider({children}) {
    const [toasts, setToasts] = useState([]);

    const addToast = (title, message, type) => {
        let delay = type === "danger" ? 5000 : 3500

        const newToast = {
            id: Date.now(),
            title: title,
            message: message,
            type: type,
            delay: delay
        };
        setToasts((prevToasts) => [...prevToasts, newToast]);
        setTimeout(() => {
            removeToast(newToast.id);
        }, delay);
    };

    const removeToast = (id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{toasts, addToast, removeToast}}>
            {children}
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);
