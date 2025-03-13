import {logout} from "../firebase/auth.js";

export default function SiteHeader({user, setLoggedIn, setUser}) {
    function doLogout() {
        logout()
            .then(() => {
                setLoggedIn(false);
                setUser(null);
            }).catch(error => {
            showError(error.code);
        })
    }

    return (
        <>
            <header className="header">
                <img src={"/GamePortal.png"} alt="GamePortal" style={{width: "15%"}}/>
            </header>
            {user ?
                <button onClick={() => doLogout()}>Logout</button>
                : null
            }
        </>
    )
}