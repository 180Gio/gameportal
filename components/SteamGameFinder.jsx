import React from "react";
import {GameSearcherBar} from "./gameAutoComplete/GameSearcherBar.jsx";

export default function SteamGameFinder({setSteamAppInfo}) {
    return (
        <div className="user-login">
            <div className="login-container">
                <h2>Cerca gioco</h2>
                <div className={"mt-4"}>
                    <GameSearcherBar setSteamAppInfo={setSteamAppInfo}/>
                </div>
                <br/>
            </div>
        </div>
    )
}