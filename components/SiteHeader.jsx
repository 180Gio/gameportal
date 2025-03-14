import {logout} from "../firebase/auth.js";
import {Button, ButtonGroup, Image, NavDropdown} from "react-bootstrap";


export default function SiteHeader({user, setLoggedIn, setUser, setPage, page}) {


    function doLogout() {
        logout()
            .then(() => {
                setLoggedIn(false);
                setUser(null);
            })
    }

    return (
        <>
            <header className="header">
                <img src={"/GamePortal.png"} alt="GamePortal" style={{width: "15%"}}/>
                {user ?
                    <>
                        <ButtonGroup className="m-3 button-row-holder">
                            <Button variant={page === 1 ? "info" : "outline-info"}
                                    onClick={() => setPage(1)}>Giochi in arrivo</Button>
                            <Button variant={page === 2 ? "info" : "outline-info"}
                                    onClick={() => setPage(2)}>News</Button>
                            <Button variant={page === 3 ? "info" : "outline-info"}
                                    onClick={() => setPage(3)}>Profilo</Button>
                            <Button variant={page === 4 ? "info" : "outline-info"}
                                    onClick={() => setPage(4)}>Cerca gioco</Button>
                        </ButtonGroup>
                        <div className={"avatar-container"}>
                            <p>{user.email}</p>
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
                                <NavDropdown.Item href="#">Impostazioni</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => doLogout()}>Esci</NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </>
                    : null
                }
            </header>
        </>
    )
}