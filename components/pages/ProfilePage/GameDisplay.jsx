import {Col, Container, Image, ProgressBar, Row} from "react-bootstrap";
import "/src/css/components/gameDisplayer.css"

export default function GameDisplay({game}) {

    function getProgressBarVariant() {
        if (calculateAchievementsPercentage() === 100) {
            return "orange"
        }
        return "info"
    }

    function calculateAchievementsPercentage() {
        return (game.unlockedAchievementsCount / game.totalAchievementsCount) * 100;
    }

    return (
        <>
            <Col md={6} xs={12} className={"d-flex pb-3"}>
                <Container className={"game-container"}>
                    <Row className={"px-3 pb-3"}>
                        {game.gameName}
                    </Row>
                    <Row className={"px-3 pb-0"}>
                        <Col md={"6"}>
                            <Image src={game.gameImage} thumbnail={true}/>
                        </Col>
                        <Col className={"d-flex flex-column justify-content-start"}>
                            <Row>
                                <p>Giocato per {game.totalHoursPlayed} ore</p>
                            </Row>
                            <Row className={"pb-2"}>
                                {game.totalAchievementsCount === -1 ? <p>Nessun achievement</p> :
                                    <>
                                        <p>Achievements: {game.unlockedAchievementsCount} / {game.totalAchievementsCount}</p>
                                        <div>
                                            <ProgressBar variant={getProgressBarVariant()}
                                                         now={calculateAchievementsPercentage()}/>
                                        </div>
                                    </>
                                }
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Col>
        </>
    );
}