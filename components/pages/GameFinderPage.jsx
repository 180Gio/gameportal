import {useState} from "react";
import {getSteamAppInfo, getSteamAutocomplete} from "../../external/steamApi.js";
import {MenuItem, Typeahead} from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {Col, Row} from "react-bootstrap";
import "../../src/css/gameFinder.css"
import {isObjectEmpty} from "../../src/util.js";
import SteamAppInfo from "../SteamAppInfo.jsx";


export default function GameFinderPage() {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedGame, setSelectedGame] = useState([]);
    const [autoCompleteTime, setAutoCompleteTime] = useState(0);
    const [steamAppInfo, setSteamAppInfo] = useState({});

    function handleSearch(game) {
        const now = Date.now();
        if (autoCompleteTime === 0 || now - autoCompleteTime > 500) {
            setAutoCompleteTime(now);
            if (game.length > 0) {
                let autocomplete = getSteamAutocomplete(game, 10);
                setSuggestions(autocomplete);
            } else {
                setSuggestions([]);
            }
        }
    }

    function searchGame() {
        getSteamAppInfo(selectedGame[0]).then(appInfo => {
            if (appInfo && appInfo.success) {
                setSteamAppInfo(appInfo.data);
            } else {
                //showToast Warning
            }
        })
    }

    return (
        <>
            <Row xs={1} md={3} className="g-2 px-5 first-row">
                <Col md={11}>
                    <Typeahead
                        renderMenu={option =>
                            option.map((option, index) =>
                                <MenuItem option={option} position={index}> {option} </MenuItem>)}
                        id="autocomplete"
                        onChange={(game) => setSelectedGame(game)}
                        options={suggestions}
                        placeholder="Ricerca gioco"
                        selected={selectedGame}
                        positionFixed={true}
                        onInputChange={game => handleSearch(game)}
                    />
                </Col>
                <Col md={1}>
                    <div className={"d-flex justify-content-around align-items-center"}>
                        <button className={"btn btn-lg btn-outline-info"} onClick={() => setSelectedGame([])}
                                disabled={selectedGame.length === 0}>
                            <i className="bi bi-trash3"></i>
                        </button>
                        <button className={"btn btn-lg btn-info"} onClick={searchGame}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </Col>
            </Row>
            <Row xs={1} md={3} className="g-2 px-5 pt-3">
                {isObjectEmpty(steamAppInfo) ? Object.keys(steamAppInfo).length :
                    <SteamAppInfo steamAppInfo={steamAppInfo}/>}
            </Row>
        </>
    );
}