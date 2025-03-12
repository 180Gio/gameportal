import React, {useState} from "react";
import {loginWithEmailAndPassword, loginWithGoogle} from "../firebase/auth.js";
import Popup from "./Popup.jsx";

export default function Login({setRegister}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    function handleLogin() {
        setType("success")
        setMessage("Login avvenuto con successo")
        setShowPopup(true);
    }

    function showError(error) {
        switch (error) {
            case "auth/invalid-credential":
                setMessage("La password è errata")
                break
            default:
                setMessage("Si è verificato un errore, riprova tra qualche istante. " + error)
        }
        setType("error")
        setShowPopup(true);

    }

    async function onSubmit(e) {
        e.preventDefault();
        await loginWithEmailAndPassword(email, password)
            .then(() => handleLogin())
            .catch((error) => showError(error.code));
    }

    return (
        <div className="user-login">
            <div className="login-container">
                <h2>Login</h2>
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

                        <button type="submit" className={"btn btn-primary-orange mb-4"}>Accedi</button>
                        <br/>
                        <button className="btn btn-info" onClick={() => setRegister(true)}>Non hai un account?
                            Registrati
                            qui!
                        </button>
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