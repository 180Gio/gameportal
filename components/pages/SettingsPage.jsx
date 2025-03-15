import {Button, Modal} from "react-bootstrap";
import React, {useState} from "react";

export default function SettingsPage({setShowSettings, showSettings, user}) {
    const [username, setUsername] = useState(null);
    return (
        <>
            <Modal show={showSettings} onHide={() => setShowSettings(false)} animation={true}
                   contentClassName={"settings-modal"} dialogClassName={"settings-dialog-modal"}>
                <Modal.Header>
                    <Modal.Title>Impostazioni</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Utente</h5>
                    <form onSubmit={() => setUsername(username)}>
                        <div className={"settings-inputs-modal"}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" id="username"/>
                            </div>
                            <button type="submit" className="btn btn-info">Salva</button>
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
                                       id="games-news"/>
                                <label className="form-check-label" htmlFor="games-news">Uno dei tuoi giochi preferiti è
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
        </>
    )
}