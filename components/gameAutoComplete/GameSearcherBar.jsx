import {GameSearcher} from "./GameSearcher.jsx";
import "/src/css/gameSearchBar.css"

export function GameSearcherBar({setSteamAppInfo}) {
    return (
        <>
            <div className={"game-searcher-bar"}>
                <GameSearcher setSteamAppInfo={setSteamAppInfo}/>
            </div>
        </>
    )
}