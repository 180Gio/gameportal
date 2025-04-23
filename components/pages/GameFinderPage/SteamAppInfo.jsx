import "../../../src/css/pages/gameFinder.css"
import {Badge, Carousel, Col, Container, Image, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {mergeArray} from "../../../src/util.js";
import GameAchievementsDisplay from "./GameAchievementsDisplay.jsx";
import GamePriceDisplay from "./GamePriceDisplay.jsx";
import GameDLCDisplay from "./GameDLCDisplay.jsx";
import {useEffect, useState} from "react";
import {createGamesNews, deleteGamesNews, isUserRegisteredForNews} from "../../../firestore/gamesNewsService.js";
import {useToast} from "../../utilComponent/toast/ToastProvider.jsx";

export default function SteamAppInfo({steamAppInfo, email}) {
    const [registeredForNews, setRegisteredForNews] = useState(false);

    const {addToast} = useToast();

    useEffect(() => {
        isRegisteredForNews(steamAppInfo.steam_appid)
    }, [steamAppInfo])

    function toggleNews() {
        if (registeredForNews) {
            deleteGamesNews(email, steamAppInfo.steam_appid)
                .then(() => {
                    addToast("Notifica", "Non verrai notificato quando ci saranno nuove notizie su " + steamAppInfo.name, "success")
                    setRegisteredForNews(false);
                }).catch(error => {
                addToast("Notifica", "Errore nel salvataggio della preferenza di notifica, riprova più tardi", "danger")
                console.error(error);
            });
        } else {
            createGamesNews(email, steamAppInfo.name, steamAppInfo.steam_appid)
                .then(() => {
                    addToast("Notifica", "Se hai abilitato le notifiche, riceverai una notifica quando ci saranno nuove notizie su " + steamAppInfo.name, "success")
                    setRegisteredForNews(true);
                }).catch(error => {
                addToast("Notifica", "Errore nel salvataggio della preferenza di notifica, riprova più tardi", "danger")
                console.error(error);
            })
        }
    }

    function isRegisteredForNews(gameId) {
        const isRegisteredFor = async () => isUserRegisteredForNews(email, gameId)
            .then(result => setRegisteredForNews(result));
        isRegisteredFor()
    }

    return (
        <>
            <Container fluid={true} className={"mx-0 px-0"}>
                <Row className={"pb-2"}>
                    <Col>
                        <h2><b>{steamAppInfo.name}</b></h2>
                        <h4>Sviluppato da {mergeArray(steamAppInfo.developers, ", ")}</h4>
                        <h4>Data di uscita: {steamAppInfo.release_date.date}</h4>
                    </Col>
                    <Col className={"d-flex justify-content-end"}>
                        <h2>
                            <OverlayTrigger
                                key={"top"}
                                placement={"top"}
                                overlay={
                                    <Tooltip id={`tooltip-top`} className={"custom-tooltip"}>
                                        {registeredForNews ? "Se hai abilitato le notifiche, riceverai una " +
                                            "notifica quando saranno presenti nuove notizie!" : "Non riceverai alcuna notifica " +
                                            "quando saranno presente nuove notizie"}
                                    </Tooltip>
                                }>
                                <a onClick={toggleNews} type={"button"}>
                                    {registeredForNews ?
                                        <i className="bi bi-bookmark-star-fill"></i> :
                                        <i className="bi bi-bookmark-star"></i>
                                    }
                                </a>
                            </OverlayTrigger>
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                        <Carousel title={steamAppInfo.title} touch={true}>
                            {steamAppInfo.screenshots ? steamAppInfo.screenshots.map((screenshotObj, idx) => {
                                return (
                                    <Carousel.Item key={idx}>
                                        <Image src={screenshotObj.path_thumbnail} alt="Screenshot"/>
                                    </Carousel.Item>
                                )
                            }) : null}
                        </Carousel>
                    </Col>
                    <Col>
                        <h5 className={"pb-3"}><b>Descrizione</b></h5>
                        <p>{steamAppInfo.short_description}</p>
                        <Row>
                            {steamAppInfo.genres?.map((genre, index) => {
                                return (
                                    <Col key={index} md={"auto"}>
                                        <Badge bg={"light"} text={"black"} pill={true}>{genre.description}</Badge>
                                    </Col>
                                )
                            })}
                        </Row>
                        {steamAppInfo.achievements ?
                            <GameAchievementsDisplay achievementsObj={steamAppInfo.achievements}/> : null}
                    </Col>
                </Row>
                <Row className={"pt-5"}>
                    <Col>
                        <GamePriceDisplay steamAppPrice={steamAppInfo.price_overview} isFree={steamAppInfo.is_free}/>
                    </Col>
                </Row>
                {steamAppInfo.dlc ?
                    <Row>
                        <p><b>DLC ({steamAppInfo.dlc.length})</b></p>
                        {steamAppInfo.dlc.slice(0, 15).map((dlc, index) => {
                            return (
                                <div key={index}>
                                    <GameDLCDisplay dlcAppId={dlc}/>
                                </div>
                            )
                        })
                        }
                    </Row> : null}
            </Container>
        </>
    )
}