import React, {useState} from "react";
import {
    loginWithEmailAndPassword,
    loginWithGoogle,
    registerWithEmailAndPassword,
    sendVerification
} from "../../firebase/auth.js";
import {getUser} from "../../firestore/userService.js";
import "../../src/css/components/signin.css"
import {useToast} from "../utilComponent/toast/ToastProvider.jsx";
import {Button, Col, Container, Row} from "react-bootstrap";

export default function SignIn({setLoggedIn, setUserDb}) {
    const [isRegister, setIsRegister] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {addToast} = useToast();

    async function handleRegistration() {
        await sendVerification()
            .then(() => addToast("Benvenuto!", "Registrazione avvenuta con successo, clicca sul link che hai " +
                "ricevuto nella mail per verificare il tuo account", "success"));
    }

    async function handleLogin(user) {
        addToast("Bentornato!", "Login avvenuto con successo", "success")
        await getUser(user.email)
            .then(userDb => setUserDb(userDb))
        setLoggedIn(true)
    }

    function showError(error) {
        let message;
        switch (error) {
            case "password-mismatch":
                message = "Le password non corrispondono. Inserire due password identiche."
                break;
            case "auth/email-already-in-use":
                message = "La mail è già in uso, prova ad eseguire il login"
                break
            case "auth/invalid-credential":
                message = "La password è errata"
                break
            case "auth/invalid-email":
                message = "L'indirizzo mail che hai inserito non è valido."
                break;
            default:
                message = "Si è verificato un errore, riprova tra qualche istante. " + error
        }
        addToast("Errore", message, "danger")

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
        <div className={"user-login"}>
            <form onSubmit={isRegister ? doRegistration : doLogin}>
                <Container className={"login-container"}>
                    <Row>
                        <h2>{isRegister ? "Registrati" : "Accedi"}</h2>
                    </Row>
                    <Row className={"mt-4"}>
                        <div className="input-group">
                            <input type="email" id="email" name="email"
                                   onChange={(e) => setEmail(e.target.value)} autoComplete={"email"}/>
                            <label htmlFor="email">Indirizzo email</label>
                        </div>
                    </Row>
                    <Row>
                        <div className="input-group">
                            <input type="password" id="password" name="password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   autoComplete={isRegister ? "new-password" : "password"}/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </Row>
                    {isRegister ?
                        <Row>
                            <div className="input-group">
                                <input type="password" id="confirm-password" name="confirm-password"
                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                       autoComplete={"new-password"}/>
                                <label htmlFor="password">Conferma password</label>
                            </div>
                        </Row> :
                        null}
                    <Row className={"d-flex justify-content-center"}>
                        <Col md={4} offset-md={4}>
                            <Button type="submit"
                                    variant={"primary-orange"}>{isRegister ? "Registrati" : "Accedi"}</Button>
                        </Col>
                    </Row>
                    <Row className={"d-flex justify-content-center py-4"}>
                        <Col>
                            <Button variant="info" onClick={() => setIsRegister(!isRegister)}>
                                {isRegister ? "Hai già un account? Accedi qui!" : "Non hai un account? Registrati qui!"}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <div className="separator mb-4">Oppure</div>
                        <Button variant={"google"} className={"google-btn"} onClick={() => doGoogleLogin()}>
                            <img src={"./GoogleIcon.ico"} alt={"Google Icon"}/> Continua con Google
                        </Button>
                    </Row>
                </Container>
            </form>
        </div>
    )
}