import React from 'react';
import {useToast} from './ToastProvider.jsx';
import {Toast, ToastContainer} from "react-bootstrap";

export default function ToastNotifications() {
    const {toasts, removeToast} = useToast();

    return (
        <ToastContainer position="bottom-end" className={"p-3"}>
            {toasts?.map((toast) => (
                <Toast show={true} onClose={() => removeToast(toast.id)} style={{zIndex: 9999}}
                       autohide={true}
                       bg={toast.type} delay={toast.delay} key={toast.id}>
                    <Toast.Header>
                        <strong className="me-auto">{toast.title}</strong>
                    </Toast.Header>
                    <Toast.Body>{toast.message}</Toast.Body>
                </Toast>
            ))}
        </ToastContainer>
    );
}