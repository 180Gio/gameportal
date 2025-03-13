import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from "react";
import SiteHeader from "./SiteHeader.jsx";
import SignIn from "./SignIn.jsx";

export default function App() {
    const [register, setRegister] = useState(true);

    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <>
            <SiteHeader user={user} setUser={setUser} setLoggedIn={setLoggedIn}/>
            {loggedIn ? null :
                <div className={"credentials-wrapper"}>
                    <SignIn setRegister={setRegister} setUser={setUser} setLoggedIn={setLoggedIn}
                            register={register}/>
                </div>
            }
        </>
    )
}