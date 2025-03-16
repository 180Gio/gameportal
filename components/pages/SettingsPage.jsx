import {Button, Modal, Toast, ToastContainer} from "react-bootstrap";
import React, {useState} from "react";

export default function SettingsPage({setShowSettings, showSettings, userDb}) {

    const [toasts, setToasts] = useState([]);

    function initModal() {
        let usernameElement = document.getElementById("username");
        usernameElement.value = userDb.get("username");

        let newsNotificationElement = document.getElementById("games-news");
        let gameOutNotificationElement = document.getElementById("games-out");
        gameOutNotificationElement.checked = userDb.get("notificationPreferences").gameOut;
        newsNotificationElement.checked = userDb.get("notificationPreferences").news;
    }

    function addToast(title, message, type) {
        const delay = 5000;
        const id = toasts.length + 1;
        const toast = {id: id, title: title, message: message, type: type, delay: delay};
        setToasts([...toasts, toast]);
        setTimeout(() => {
            removeToast(id);
        }, delay);
    }

    function removeToast(id) {
        setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
    }

    // useEffect(() => {
    //     if (user) {
    //         updateUsername(user.email, username)
    //             .then(() => addToast("Salvataggio username", "Username salvato con successo", "success"))
    //             .catch(() => addToast("Salvataggio username", "Si è verificato un errore nel salvataggio dell'username, riprova più tardi", "danger"));
    //     }
    // }, [username])
    // useEffect(() => {
    //     if (user) {
    //         updateNotificationPreferences(user.email, notificationPreferences)
    //             .then(() => addToast("Salvataggio preferenze notifiche", "Preferenze sulle notifiche salvate correttamente", "success"))
    //             .catch(() => addToast("Salvataggio preferenze notifiche", "Si è verificato un errore nel salvataggio delle preferenze sulle notifiche, riprova più tardi", "danger"));
    //     }
    // }, [notificationPreferences])

    // function onSubmit(e) {
    //     e.preventDefault()
    //     setUsername(e.target.elements.username.value)
    // }

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
                                       id="games-news"
                                    // onChange={(e) =>
                                    //     setNotificationPreferences({newsNotifications: e.target.checked})}/>
                                />
                                <label className="form-check-label" htmlFor="games-news">Notizie sui tuoi videogiochi
                                    preferiti</label>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className="form-check form-switch d-flex flex-row-reverse justify-content-between">
                                <input className="form-check-input" type="checkbox"
                                       role="switch"
                                       id="games-out"
                                    // onChange={(e) =>
                                    //     setNotificationPreferences({gameOut: e.target.checked})}/>
                                />
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
                            <strong className="me-auto">{toast.title}</strong>
                        </Toast.Header>
                        <Toast.Body>{toast.message}</Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </>
    )
}