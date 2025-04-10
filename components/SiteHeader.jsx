import {logout} from "../firebase/auth.js";
import {Button, ButtonGroup, Image, NavDropdown} from "react-bootstrap";
import {useState} from "react";
import SettingsPage from "./pages/SettingsPage.jsx";
import "../src/css/header.css"


export default function SiteHeader({setLoggedIn, setPage, page, userDb, setUserDb}) {

    const [showSettings, setShowSettings] = useState(false);

    function doLogout() {
        logout()
            .then(() => {
                setLoggedIn(false);
            })
    }

    return (
        <>
            <header className="header">
                <div className={"container-fluid"}>
                    <div className={"row d-flex align-items-center"}>
                        <div className={"col-md-4 d-flex justify-content-start"}>
                            <img src={"/GamePortal.png"} alt="GamePortal" style={{width: "50%"}}/>
                        </div>
                        <div className={"col-md-4"}>
                            {userDb ?
                                <>
                                    <ButtonGroup className="m-3 button-row-holder">
                                        <Button variant={page === 1 ? "info" : "outline-info"}
                                                onClick={() => setPage(1)}>Giochi in uscita</Button>
                                        <Button variant={page === 2 ? "info" : "outline-info"}
                                                onClick={() => setPage(2)}>News</Button>
                                        <Button variant={page === 3 ? "info" : "outline-info"}
                                                onClick={() => setPage(3)}>Profilo</Button>
                                        <Button variant={page === 4 ? "info" : "outline-info"}
                                                onClick={() => setPage(4)}>Cerca gioco</Button>
                                    </ButtonGroup>
                                </> : null
                            }
                        </div>
                        <div className={"col-md-4 d-flex justify-content-end"}>
                            {userDb ?
                                <>
                                    <div className={"avatar-container"}>
                                        <p>{userDb.username}</p>
                                        <NavDropdown
                                            title={
                                                <Image
                                                    src={"/default_avatar.png"}
                                                    roundedCircle
                                                    alt="Profile"
                                                    width="30"
                                                    height="30"
                                                    className="me-2"
                                                />
                                            }
                                            id="profile-dropdown"
                                            align="end">
                                            <NavDropdown.Item
                                                onClick={() => setShowSettings(true)}
                                                className={"settings-dropdown"}>Impostazioni</NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => doLogout()}
                                                              className={"settings-dropdown"}>Esci</NavDropdown.Item>
                                        </NavDropdown>
                                    </div>
                                    <SettingsPage setShowSettings={setShowSettings} showSettings={showSettings}
                                                  userDb={userDb} setUserDb={setUserDb} setLoggedIn={setLoggedIn}/>
                                </>
                                : null}
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}