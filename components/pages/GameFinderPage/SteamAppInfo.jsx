import "../../../src/css/pages/gameFinder.css"
import {Carousel, Col, Container, Image, Row} from "react-bootstrap";

export default function SteamAppInfo({steamAppInfo}) {
    return (
        <>
            <Container fluid={true} className={"mx-0 px-0"}>
                <Row className={"pb-2"}>
                    <h2>{steamAppInfo.name}</h2>
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
                        <p>{steamAppInfo.short_description}</p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}