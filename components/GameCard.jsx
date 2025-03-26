import {Card, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import {formatDate} from "../src/util.js";
import {useToast} from "./toast/ToastProvider.jsx";
import {
    createGamesWaitingFor,
    deleteWaitingForGame,
    isUserWaitingForGame
} from "../firestore/gamesWaitingForService.js";
import {useEffect, useState} from "react";

export default function GameCard({game, idx, email}) {
    const [waitingForGame, setWaitingForGame] = useState(false);
    const {addToast} = useToast();
    useEffect(() => {
        isWaitingForGame(game.name);
    }, [game]);

    function getPlatformPill(platform) {
        let platformName = platform["platform"]["name"]
        let platformId = platform["platform"]["id"]
        switch (platformId) {
            //PC
            case 4:
                return <span className={"badge rounded-pill bg-info"}>{platformName}</span>
            //PS5
            case 187:
            //PS4
            case 18:
                return <span className={"badge rounded-pill bg-primary"}>{platformName}</span>
            //Switch
            case 7:
                return <span className={"badge rounded-pill bg-danger"}>{platformName}</span>
            //Xbox
            case 1:
            //Xbox Serie S/X
            case 186:
                return <span className={"badge rounded-pill bg-success"}>{platformName}</span>
            default:
                return <span className={"badge rounded-pill bg-gradient"}>{platformName}</span>
        }
    }

    function getTagElement(tag) {
        return <span className={"badge bg-white text-black"}>{"#" + tag.name}</span>
    }

    function getGenreElement(genre) {
        return <span className={"badge rounded-pill bg-custom"}>{genre.name}</span>
    }

    function isWaitingForGame(gameName) {
        const isWaitingFor = async () => isUserWaitingForGame(email, gameName)
            .then(result => setWaitingForGame(result));
        isWaitingFor()
    }

    function toggleWaitingStatus() {
        if (waitingForGame) {
            deleteWaitingForGame(email, game.name)
                .then(() => {
                    addToast("Notifica", "Non verrai notificato quando " + game.name + " uscirà", "success")
                    setWaitingForGame(false);
                }).catch(error => {
                addToast("Notifica", "Errore nel salvataggio della preferenza di notifica, riprova più tardi", "danger")
                console.error(error);
            });
        } else {
            createGamesWaitingFor(email, game.name, formatDate(game["released"]))
                .then(() => {
                    addToast("Notifica", "Se hai abilitato le notifiche, riceverai una notifica il giorno di uscita di " + game.name, "success")
                    setWaitingForGame(true);
                }).catch(error => {
                addToast("Notifica", "Errore nel salvataggio della preferenza di notifica, riprova più tardi", "danger")
                console.error(error);
            })
        }
    }


    return (
        <>
            <Col key={idx}>
                <Card className={"custom-card"}>
                    <Card.Img variant="top" src={game.background_image || "no_image_found.png"}
                              className={"card-img"}
                              alt={"The image was a lie"}/>
                    <Card.Title className={"d-flex justify-content-between px-1"}>
                        {game.name}
                        <OverlayTrigger
                            key={"top"}
                            placement={"top"}
                            overlay={
                                <Tooltip id={`tooltip-top`} className={"custom-tooltip"}>
                                    {waitingForGame ? "Se hai abilitato le notifiche, riceverai una " +
                                        "notifica il giorno di uscita!" : "Non riceverai alcuna notifica " +
                                        "il giorno dell'uscita"}
                                </Tooltip>
                            }
                        >
                            <a onClick={toggleWaitingStatus} type={"button"}>
                                {waitingForGame ?
                                    <i className="bi bi-bell-fill"></i> : <i className="bi bi-bell-slash"></i>
                                }

                            </a>
                        </OverlayTrigger>

                    </Card.Title>
                    <Card.Body className={"pt-0"}>
                                <span className={"platform-row"}>
                                    {game["platforms"]?.map((plat, i) => (
                                        <span key={idx + "." + i}>{getPlatformPill(plat)}</span>
                                    ))}
                                </span>
                        <Card.Text className={"pt-4"}>
                            <b>Data di uscita:</b>&nbsp;{formatDate(game["released"])}
                            <span className={"genre-row pt-2"}>
                                        {game["genres"]?.map((genre, i) => (
                                            <span key={idx + "." + i}>{getGenreElement(genre)}</span>
                                        ))}
                                    </span>
                        </Card.Text>
                        <Card.Footer className={"pt-0 border-top-0"}>
                            {game["tags"]?.filter(gameTag => gameTag["language"] === "eng" || gameTag["language"] === "ita").slice(0, 5).map((gameTag, i) => (
                                <span key={idx + "." + i}>{getTagElement(gameTag)}</span>
                            ))}
                        </Card.Footer>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}