import {useState} from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "../../../src/css/pages/gameFinder.css"
import SteamAppInfo from "./SteamAppInfo.jsx";


export default function GameFinderPage() {
    const [steamAppInfo, setSteamAppInfo] = useState({});

    return (
        <>
            {/*TODO empty page component*/}
            {/*{isObjectEmpty(steamAppInfo) ?*/}
            {/*    // <SteamGameFinder setSteamAppInfo={setSteamAppInfo}/> :*/}
            <GameSearcherBar setSteamAppInfo={setSteamAppInfo}/>
            <SteamAppInfo steamAppInfo={steamAppInfo}/>
            {/*<GameSearcher setSteamAppInfo={setSteamAppInfo}/>*/}
            {/*<Row xs={1} md={3} className="g-2 px-5 pt-3">*/}
            {/*</Row>*/}
        </>
    );
}