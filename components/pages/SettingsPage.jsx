import {Button, Modal, Toast, ToastContainer} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {updateUsername} from "../../firebase/firestoreUtil.js";

export default function SettingsPage({setShowSettings, showSettings, user, username, setUsername}) {

    const [toasts, setToasts] = useState([]);
    const [notificationPreferences, setNotificationPreferences] = useState(undefined);

    async function initModal() {
        async function initUsername() {
            let usernameElement = document.getElementById("username");
            usernameElement.value = username;
        }

        async function initPreferences() {
            if (!notificationPreferences) {
                setNotificationPreferences({email: user.email, newsNotifications: false, gameOut: false})
            }
            console.log(notificationPreferences);
            let newsNotificationElement = document.getElementById("games-news");
            let gameOutNotificationElement = document.getElementById("games-out");
            gameOutNotificationElement.checked = notificationPreferences.gameOut;
            newsNotificationElement.checked = notificationPreferences.newsNotifications;
        }

        Promise.all([initUsername(), initPreferences()])
            .catch(() => {
                addToast("Si è verificato un errore nella precompilazione dei dati", "danger")
            });
    }

    function addToast(message, type) {
        const delay = 5000;
        const id = toasts.length + 1;
        const toast = {id: id, message: message, type: type, delay: delay};
        setToasts([...toasts, toast]);
        setTimeout(() => {
            removeToast(id);
        }, delay);
    }

    function removeToast(id) {
        setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
    }

    useEffect(() => {
        if (user) {
            updateUsername(user.email, username)
                .then(() => addToast("Salvataggio completato con successo!", "success"))
                .catch(() => addToast("Si è verificato un errore, riprova più tardi", "danger"));
        }
    }, [username])

    function onSubmit(e) {
        e.preventDefault()
        setUsername(e.target.elements.username.value)
    }

    return (
        <>
            <Modal show={showSettings} onHide={() => setShowSettings(false)} animation={true} onEnter={initModal}
                   contentClassName={"settings-modal"} dialogClassName={"settings-dialog-modal"}>
                <Modal.Header>
                    <Modal.Title>Impostazioni</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Utente</h5>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className={"settings-inputs-modal"}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" id="username"/>
                            </div>
                            <button type="submit" className="btn btn-info">Salva
                            </button>
                        </div>
                    </form>
                    <hr className={"my-4"}/>
                    <h5>Notifiche</h5>
                    <div className={"container-fluid"}>
                        <div className={"row"}>
                            <div className="form-check form-switch d-flex flex-row-reverse justify-content-between">
                                <input className="form-check-input" type="checkbox" role="switch"
                                       id="games-news"/>
                                <label className="form-check-label" htmlFor="games-news">Notizie sui tuoi videogiochi
                                    preferiti</label>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className="form-check form-switch d-flex flex-row-reverse justify-content-between">
                                <input className="form-check-input" type="checkbox"
                                       role="switch"
                                       id="games-out"/>
                                <label className="form-check-label" htmlFor="games-out">Uno dei tuoi giochi preferiti è
                                    stato rilasciato</label>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <h5>Zona pericolosa</h5>
                    <div className={"container-fluid mt-3"}>
                        <div className={"row"}>
                            <div className={"col-md-3 d-flex justify-content-center align-content-center"}>
                                <button
                                    className="btn btn-danger">Elimina
                                    il tuo account
                                </button>
                            </div>
                            <div className={"col d-flex justify-content-center align-content-center"}>
                                <div className="alert alert-danger" role="alert">
                                    <b>Attenzione!</b> Una volta eliminato, il tuo account
                                    non sarà recuperabile
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary-orange" onClick={() => setShowSettings(false)}>Chiudi</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="bottom-end" className={"p-3"}>
                {toasts.map((toast) => (
                    <Toast show={true} onClose={() => removeToast(toast.id)} style={{zIndex: 9999}}
                           autohide={true}
                           bg={toast.type} delay={toast.delay} key={toast.id}>
                        <Toast.Header>
                            <strong className="me-auto">Salvataggio Username</strong>
                        </Toast.Header>
                        <Toast.Body>{toast.message}</Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </>
    )
}