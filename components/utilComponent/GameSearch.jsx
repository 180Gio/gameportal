import {Typeahead} from "react-bootstrap-typeahead";
import {useToast} from "./toast/ToastProvider.jsx";
import {useState} from "react";
import {getSteamAppInfo, getSteamAutocomplete} from "../../external/steamApi.js";
import "/src/css/components/gameSearch.css"
import {Col, Row} from "react-bootstrap";

export default function GameSearch({setSearchGame, setLoading}) {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedGame, setSelectedGame] = useState([]);
    const {addToast} = useToast();

    function handleSearch(game) {
        if (game.length > 0) {
            let autocomplete = getSteamAutocomplete(game, -1);
            setSuggestions(autocomplete);
        } else {
            setSuggestions([]);
        }
    }

    function searchGame() {
        getSteamAppInfo(selectedGame[0]).then(appInfo => {
            if (appInfo && appInfo.success) {
                setLoading(true);
                setSearchGame({...appInfo.data});
            } else {
                addToast("Ricerca gioco", "Il gioco che hai ricercato non è stato trovato, " +
                    "controlla che il nome sia corretto", "warning")
            }
        })
    }

    return (
        <>
            <Row className={"pb-5 pl-0"}>
                <Col md={11}>
                    <Typeahead
                        id="autocomplete"
                        onChange={(game) => setSelectedGame(game)}
                        options={suggestions}
                        placeholder="Ricerca gioco"
                        selected={selectedGame}
                        onInputChange={game => handleSearch(game)}
                        minLength={2}
                        emptyLabel={"Nessun risultato trovato"}
                        paginate={true}
                        maxResults={8}
                        paginationText={"Mostra altri risultati"}
                    />
                </Col>
                <Col id={"game-searcher-button-row"} className={"d-flex justify-content-between align-items-start"}>
                    <button className={"btn btn-lg btn-outline-info"} onClick={() => setSelectedGame([])}>
                        <i className="bi bi-trash3"></i>
                    </button>
                    <button className={"btn btn-lg btn-info"} onClick={searchGame}>
                        <i className="bi bi-search"></i>
                    </button>
                </Col>
            </Row>
        </>
    )
}