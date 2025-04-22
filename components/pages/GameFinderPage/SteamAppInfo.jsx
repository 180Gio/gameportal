import "../../../src/css/pages/gameFinder.css"
import {Badge, Carousel, Col, Container, Image, Row} from "react-bootstrap";
import {mergeArray} from "../../../src/util.js";
import GameAchievementsDisplay from "./GameAchievementsDisplay.jsx";
import GamePriceDisplay from "./GamePriceDisplay.jsx";
import GameDLCDisplay from "./GameDLCDisplay.jsx";

export default function SteamAppInfo({steamAppInfo}) {

    return (
        <>
            <Container fluid={true} className={"mx-0 px-0"}>
                <Row className={"pb-2"}>
                    <h2><b>{steamAppInfo.name}</b></h2>
                    <h4>Sviluppato da {mergeArray(steamAppInfo.developers, ", ")}</h4>
                    <h4>Data di uscita: {steamAppInfo.release_date.date}</h4>
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