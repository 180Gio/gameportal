import {Button, Modal, Toast, ToastContainer} from "react-bootstrap";
import React, {useState} from "react";
import {deleteUser, updateNotificationPreferences, updateUsername} from "../../firebase/firestore.js";
import {removeUser} from "../../firebase/auth.js";

export default function SettingsPage({setShowSettings, showSettings, userDb, setUserDb, setLoggedIn}) {

    const [toasts, setToasts] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    function initModal() {
        let usernameElement = document.getElementById("username");
        usernameElement.value = userDb.username;

        let newsNotificationElement = document.getElementById("games-news");
        let gameOutNotificationElement = document.getElementById("games-out");
        gameOutNotificationElement.checked = userDb.notificationPreferences.gameOut;
        newsNotificationElement.checked = userDb.notificationPreferences.news;
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


    function onSubmit(e) {
        e.preventDefault()
        updateUsername(userDb.email, e.target.elements.username.value).then(userDb => {
            setUserDb(userDb);
            addToast("Salvataggio username", "L'username è stato salvato correttamente", "success")
        })
            .catch(() => {
                addToast("Salvataggio username", "Si è verificato un errore " +
                    "nel salvataggio dell'username, riprova più tardi", "danger")
            })
    }

    function handleNotificationSettings(notificationPreferences) {
        let notificationPreferencesUpdated = {...userDb.notificationPreferences, ...notificationPreferences};
        updateNotificationPreferences(userDb.email, notificationPreferencesUpdated).then(
            userDb => {
                setUserDb(userDb)
                addToast("Salvataggio preferenze di notifica", "Preferenze di notifica " +
                    "salvate correttamente", "success")
            })
            .catch(() => {
                addToast("Salvataggio preferenze di notifica", "Si è verificato un errore " +
                    "nel salvataggio delle preferenze di notifica, riprova più tardi", "danger");
            })
    }

    function doDeleteAccount() {
        deleteUser(userDb.email)
            .then(async () => {
                await removeUser()
                    .then(() => setLoggedIn(false))
            })
            .catch((e) => {
                console.log(e)
                addToast("Cancellazione account",
                    "Si è verificato un errore durante la cancellazione dell'account, riprova più tardi", "danger")
            })
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
                        <div className={"settings-modal-container mt-4"}>
                            <div className={"container"}>
                                <div className={"row d-flex align-items-start"}>
                                    <div className={"col-md-6"}>
                                        <div className="d-flex align-items-center input-group">
                                            <input type="text" id="username"/>
                                            <label htmlFor="username">Username</label>
                                        </div>
                                    </div>
                                    <div className={"col-md-6 d-flex justify-content-end text"}>
                                        <button type="submit" className="btn btn-lg btn-info">Salva
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <hr className={"my-4"}/>
                    <h5>Notifiche</h5>
                    <div className={"container-fluid"}>
                        <div className={"row"}>
                            <div className="form-check form-switch
                            d-flex flex-row-reverse align-items-center justify-content-between">
                                <input className="form-check-input" type="checkbox" role="switch"
                                       id="games-news"
                                       onChange={(e) =>
                                           handleNotificationSettings({news: e.target.checked})}/>
                                <label className="form-check-label" htmlFor="games-news">Notizie sui tuoi
                                    videogiochi preferiti</label>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className="form-check form-switch d-flex flex-row-reverse justify-content-between">
                                <input className="form-check-input" type="checkbox"
                                       role="switch"
                                       id="games-out"
                                       onChange={(e) =>
                                           handleNotificationSettings({gameOut: e.target.checked})}/>
                                <label className="form-check-label" htmlFor="games-out">Uno dei tuoi giochi preferiti è
                                    stato rilasciato</label>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <h5>Zona pericolosa</h5>
                    <div className={"container mt-3"}>
                        <button className="btn btn-md btn-danger"
                                onClick={() => setShowDeleteModal(true)}>Elimina il
                            tuo account
                        </button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={"btn-lg"} variant="primary-orange"
                            onClick={() => setShowSettings(false)}>Chiudi</Button>
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

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered
                   contentClassName={"delete-modal"} dialogClassName={"settings-dialog-modal"}>
                <Modal.Header className={"delete-modal-header"} closeButton closeVariant={"white"}>
                    <Modal.Title>Attenzione</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Una volta eliminato, l'account e tutti i dati associati non saranno più recuperabili. Vuoi procedere
                    con la cancellazione?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Annulla</Button>
                    <Button variant="danger" onClick={() => doDeleteAccount()}>Elimina</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}