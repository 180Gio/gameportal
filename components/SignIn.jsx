import React, {useState} from "react";
import {loginWithEmailAndPassword, loginWithGoogle, registerWithEmailAndPassword} from "../firebase/auth.js";
import Popup from "./Popup.jsx";
import {getUser} from "../firebase/firestore.js";
import "../src/css/signin.css"

export default function SignIn({setLoggedIn, setUserDb}) {
    const [isRegister, setIsRegister] = useState(true);

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

    async function handleLogin(user) {
        setType("success")
        setMessage("Login avvenuto con successo")
        setShowPopup(true);
        await getUser(user.email)
            .then(userDb => setUserDb(userDb))
        setLoggedIn(true)
    }

    function showError(error) {
        switch (error) {
            case "password-mismatch":
                setMessage("Le password non corrispondono. Inserire due password identiche.")
                break;
            case "auth/email-already-in-use":
                setMessage("La mail è già in uso, prova ad eseguire il login")
                break
            case "auth/invalid-credential":
                setMessage("La password è errata")
                break
            default:
                setMessage("Si è verificato un errore, riprova tra qualche istante. " + error)
        }
        setType("error")
        setShowPopup(true);

    }

    async function doRegistration(event) {
        event.preventDefault();
        if (password !== confirmPassword) {
            showError("password-mismatch");
        } else {
            await registerWithEmailAndPassword(email, password)
                .then(() => handleRegistration())
                .catch((error) => showError(error.code));
        }
    }

    async function doLogin(event) {
        event.preventDefault();
        await loginWithEmailAndPassword(email, password)
            .then((user) => handleLogin(user))
            .catch((error) => showError(error.code));
    }

    async function doGoogleLogin() {
        await loginWithGoogle()
            .then(user => handleLogin(user))
            .catch(error => showError(error.code))
    }

    return (
        <div className="user-login">
            <div className="login-container">
                <h2>{isRegister ? "Registrati" : "Accedi"}</h2>
                <div className={"mt-4"}>
                    <form onSubmit={isRegister ? doRegistration : doLogin}>
                        <div className="input-group">
                            <input type="email" id="email" name="email"
                                   onChange={(e) => setEmail(e.target.value)} autoComplete={"email"}/>
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-group">
                            <input type="password" id="password" name="password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   autoComplete={isRegister ? "new-password" : "password"}/>
                            <label htmlFor="password">Password</label>
                        </div>

                        {isRegister ?
                            <div className="input-group">
                                <input type="password" id="confirm-password" name="confirm-password"
                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                       autoComplete={"new-password"}/>
                                <label htmlFor="password">Conferma password</label>
                            </div>
                            : null}

                        <button type="submit"
                                className={"btn btn-primary-orange mb-4"}>{isRegister ? "Registrati" : "Accedi"}</button>
                        <br/>

                    </form>
                    <button className="btn btn-info" onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? "Hai già un account? Accedi qui!" : "Non hai un account? Registrati qui!"}
                    </button>
                </div>
                <br/>
                <div>
                    <div className="separator mb-4">Oppure</div>
                    <button className={"btn btn-light"} onClick={() => doGoogleLogin()}>
                        <img src={"./GoogleIcon.ico"} alt={"Google Icon"}/> Continua con Google
                    </button>
                </div>
            </div>
            <Popup show={showPopup} setShow={setShowPopup} message={message} type={type}/>
        </div>
    )
}