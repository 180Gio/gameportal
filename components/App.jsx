import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from "react";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import SiteHeader from "./SiteHeader.jsx";

export default function App() {
    const [register, setRegister] = useState(true);

    return (
        <>
            <SiteHeader/>
            <div className={"credentials-wrapper"}>
                {register ? <Register setRegister={setRegister}/> : <Login setRegister={setRegister}/>}
            </div>
        </>
    )
}