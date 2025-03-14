import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from "react";
import SiteHeader from "./SiteHeader.jsx";
import SignIn from "./SignIn.jsx";
import UpcomingGamesPage from "./pages/UpcomingGamesPage.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import GameFinderPage from "./pages/GameFinderPage.jsx";

export default function App() {
    const [register, setRegister] = useState(true);

    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const [page, setPage] = useState(1);

    function renderPage() {
        switch (page) {
            case 1:
                return <UpcomingGamesPage/>
            case 2:
                return <NewsPage/>
            case 3:
                return <ProfilePage/>
            case 4:
                return <GameFinderPage/>
        }
    }


    return (
        <>
            <SiteHeader user={user} setUser={setUser} setLoggedIn={setLoggedIn} setPage={setPage} page={page}/>
            {loggedIn ? renderPage() :
                <div className={"credentials-wrapper"}>
                    <SignIn setRegister={setRegister} setUser={setUser} setLoggedIn={setLoggedIn}
                            register={register}/>
                </div>
            }
        </>
    )
}