import {getUpcomingGames} from "../../external/rawgApi.js";
import {Card, Col, Pagination, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {formatDate} from "../../src/util.js";
import "../../src/css/upcomingGames.css"

export default function UpcomingGamesPage() {

    const [upcomingGames, setUpcomingGames] = useState([]);
    const [pages, setPages] = useState([]);

    async function loadUpcomingGames(pageNumber) {
        const data = await getUpcomingGames(pageNumber);
        setUpcomingGames(data.results);
        loadPages(data.total, data.nextPage)
    }

    useEffect(() => {
        const fetchUpcomingGames = async () => {
            await loadUpcomingGames(1);
        }
        fetchUpcomingGames();
    }, [])

    function loadPages(total, nextPage) {
        let activePage = nextPage - 1;
        let pageToLoad = Math.ceil(total / 9);
        let pageList = []
        for (let i = 1; i <= pageToLoad; i++) {
            pageList.push(
                <Pagination.Item key={i} onClick={() => loadUpcomingGames(i)}
                                 active={i === activePage}>{i}</Pagination.Item>
            )
        }
        setPages(pageList);
    }

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

    return (
        <>
            <Row xs={1} md={3} className="g-4 px-5">
                {upcomingGames.map((game, idx) => (
                    <Col key={idx}>
                        <Card className={"custom-card"}>
                            <Card.Img variant="top" src={game.background_image || "no_image_found.png"}
                                      className={"card-img"}
                                      alt={"The image was a lie"}/>
                            <Card.Title>{game.name}</Card.Title>
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
                ))}
            </Row>
            <Row>
                <Pagination className={"card-iterator"}>
                    {pages}
                </Pagination>
            </Row>
        </>

    )
}