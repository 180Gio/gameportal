import "../src/css/gameFinder.css"
import {Carousel, Image, Row} from "react-bootstrap";

export default function SteamAppInfo({steamAppInfo}) {
    return (
        <>
            <Row>
                <h2>{steamAppInfo.name}</h2>
            </Row>
            <Row>
                <Carousel title={steamAppInfo.title} touch={true}>
                    {steamAppInfo.screenshots ? steamAppInfo.screenshots.map((screenshotObj, idx) => {
                        return (
                            <Carousel.Item key={idx}>
                                <Image src={screenshotObj.path_thumbnail} alt="Screenshot"/>
                            </Carousel.Item>
                        )
                    }) : null}
                </Carousel>
            </Row>
        </>
    )
}