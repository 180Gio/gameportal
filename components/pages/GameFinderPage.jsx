import {useState} from "react";
import {getSteamAutocomplete} from "../../external/steamApi.js";
import {MenuItem, Typeahead} from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {Col, Row} from "react-bootstrap";
import "../../src/css/gameFinder.css"


export default function GameFinderPage() {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedGame, setSelectedGame] = useState([]);
    const [autoCompleteTime, setAutoCompleteTime] = useState(0);

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

    return (
        <>
            <Row xs={1} md={3} className="g-4 px-5">
                <Col md={10}>
                    <Typeahead
                        renderMenu={option => option.map((option, index) => <MenuItem option={option}
                                                                                      position={index}> {option} </MenuItem>)}
                        id="autocomplete"
                        onChange={(game) => setSelectedGame(game)}
                        options={suggestions}
                        placeholder="Ricerca gioco"
                        selected={selectedGame}
                        onInputChange={game => handleSearch(game)}
                    />
                </Col>
                <Col md={2}>
                    <div className={"d-flex justify-content-around align-items-center"}>
                        <button className={"btn btn-lg btn-outline-info"} onClick={() => setSelectedGame([])}>
                            Cancella
                        </button>
                        <button className={"btn btn-lg btn-info"}>
                            <i className="bi bi-search"></i>Cerca
                        </button>
                    </div>
                </Col>
            </Row>
        </>
    );
}