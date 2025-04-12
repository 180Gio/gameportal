import {MenuItem, Typeahead} from "react-bootstrap-typeahead";
import {useToast} from "../toast/ToastProvider.jsx";
import {useState} from "react";
import {getSteamAppInfo, getSteamAutocomplete} from "../../external/steamApi.js";
import "/src/css/gameSearch.css"

export default function GameSearch({setSearchGame, disabled}) {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedGame, setSelectedGame] = useState([]);
    const {addToast} = useToast();

    function handleSearch(game) {
        if (game.length > 0) {
            let autocomplete = getSteamAutocomplete(game, 10);
            setSuggestions(autocomplete);
        } else {
            setSuggestions([]);
        }
    }

    function searchGame() {
        getSteamAppInfo(selectedGame[0]).then(appInfo => {
            if (appInfo && appInfo.success) {
                setSearchGame(appInfo.data);
            } else {
                addToast("Ricerca gioco", "Il gioco che hai ricercato non è stato trovato, " +
                    "controlla che il nome sia corretto", "warning")
            }
        })
    }

    return (
        <>
            <div id={"game-searcher-root-div"}>
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
                    disabled={disabled}
                />
                <div id={"game-searcher-button-row"}>
                    <button className={"btn btn-lg btn-outline-info"} onClick={() => setSelectedGame([])}
                            disabled={selectedGame.length === 0}>
                        <i className="bi bi-trash3"></i>
                    </button>
                    <button className={"btn btn-lg btn-info"} onClick={searchGame}>
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </>
    )
}