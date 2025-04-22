import {Col, Container, Image, Row} from "react-bootstrap";

export default function GameAchievementsDisplay({achievementsObj}) {

    return (
        <>
            <Container fluid={true} className={"px-0 py-4"}>
                <Row className={"pb-3"}>
                    <h5>Achievements totali: {achievementsObj.total}</h5>
                </Row>
                <Row className={"d-flex justify-content-end align-items-center"}>
                    {achievementsObj.highlighted.slice(0, 12).map((achievement, index) => {
                        return (
                            <>
                                <Col md={1} key={index}>
                                    <Image src={achievement.path} thumbnail title={achievement.name}/>
                                </Col>
                            </>
                        )
                    })}
                </Row>
            </Container>
        </>
    )
}