import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from "react";
import Register from "./Register.jsx";
import Login from "./Login.jsx";

export default function App() {
    const [isRegister, setIsRegister] = useState(true);
    if (isRegister) {
        return (
            <>
                <Register setIsRegister={setIsRegister}/>
            </>
        )
    } else {
        return (
            <>
                <Login setIsRegister={setIsRegister}/>
            </>
        )
    }
}