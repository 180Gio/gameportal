import React, {useState} from "react";
import {registerWithEmailAndPassword} from "../firebase/auth.js";

export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    async function onSubmit(e){
        e.preventDefault();
        if(!email || !password){
            alert("Please enter a valid email");
        } else if(password !== confirmPassword) {
            alert("Passwords do not match");
        } else {
            await registerWithEmailAndPassword(email, password);
        }
    }
    return (
        <div className="user-login">
            <div className="login-container">
                <h2>Registrazione</h2>
                <form onSubmit={onSubmit}>
                    <div className={"mt-4"}>
                        <div className="input-group">
                            <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)}/>
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-group">
                            <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}/>
                            <label htmlFor="password">Password</label>
                        </div>

                        <div className="input-group">
                            <input type="password" id="confirm-password" name="confirm-password" required onChange={(e) => setConfirmPassword(e.target.value)}/>
                            <label htmlFor="password">Conferma password</label>
                        </div>

                        <button type="submit">Registrati</button>
                    </div>
                </form>
            </div>
        </div>
    )
}