import React, {createContext, useContext, useState} from 'react';

const ToastContext = createContext({});

export function ToastProvider({children}) {
    const [toasts, setToasts] = useState([]);
    const delay = 5000;

    const addToast = (title, message, type) => {
        const newToast = {
            id: Date.now(),
            title: title,
            message,
            type,
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
