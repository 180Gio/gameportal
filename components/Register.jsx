import React, {useState} from "react";
import {loginWithGoogle, registerWithEmailAndPassword} from "../firebase/auth.js";
import Popup from "./Popup.jsx";

export default function Register({setRegister}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    function handleRegistration() {
        setType("success")
        setMessage("Registrazione avvenuta con successo")
        setShowPopup(true);
    }

    function showError(error) {
        switch (error) {
            case "password-mismatch":
                setMessage("Le password non corrispondono. Inserire due password identiche.")
                break;
            case "auth/email-already-in-use":
                setMessage("La mail è già in uso, prova ad eseguire il login")
                break
            default:
                setMessage("Si è verificato un errore, riprova tra qualche istante. " + error)
        }
        setType("error")
        setShowPopup(true);

    }

    async function onSubmit(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            showError("password-mismatch");
        } else {
            await registerWithEmailAndPassword(email, password)
                .then(() => handleRegistration())
                .catch((error) => showError(error.code));
        }
    }

    return (
        <div className="user-login">
            <div className="login-container">
                <h2>Registrazione</h2>
                <form onSubmit={onSubmit}>
                    <div className={"mt-4"}>
                        <div className="input-group">
                            <input type="email" id="email" name="email" required
                                   onChange={(e) => setEmail(e.target.value)}/>
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-group">
                            <input type="password" id="password" name="password" required
                                   onChange={(e) => setPassword(e.target.value)}/>
                            <label htmlFor="password">Password</label>
                        </div>

                        <div className="input-group">
                            <input type="password" id="confirm-password" name="confirm-password" required
                                   onChange={(e) => setConfirmPassword(e.target.value)}/>
                            <label htmlFor="password">Conferma password</label>
                        </div>
                        <button type="submit" className={"btn btn-primary-orange mb-4"}>Registrati</button>
                        <div>
                            <button className="btn btn-info" onClick={() => setRegister(false)}>Hai già un account?
                                Accedi
                                qui!
                            </button>
                        </div>
                    </div>
                </form>
                <br/>

                <div>
                    <div className="separator mb-4">Oppure</div>
                    <button className={"btn btn-light"} onClick={(() => loginWithGoogle())}>
                        <img src={"./GoogleIcon.ico"} alt={"Google Icon"}/> Continua con Google
                    </button>
                </div>
            </div>
            <Popup show={showPopup} setShow={setShowPopup} message={message} type={type}/>
        </div>
    )
}