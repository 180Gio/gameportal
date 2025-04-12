import {getUpcomingGames} from "../../../external/rawgApi.js";
import {Pagination, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import "../../../src/css/pages/upcomingGames.css"
import GameCard from "./GameCard.jsx";
import LoadingComponent from "../../utilComponent/LoadingComponent.jsx";
import {isArrayEmpty} from "../../../src/util.js";
import ErrorComponent from "../../utilComponent/ErrorComponent.jsx";

export default function UpcomingGamesPage({userDb}) {

    const [upcomingGames, setUpcomingGames] = useState([]);
    const [pages, setPages] = useState([]);
    const [error, setError] = useState(false);

    async function loadUpcomingGames(pageNumber) {
        try {
            const data = await getUpcomingGames(pageNumber);
            setUpcomingGames(data.results);
            loadPages(data.total, data.nextPage)
        } catch (error) {
            setError(true);
        }
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

    return (
        <>
            {error ? <ErrorComponent/> : isArrayEmpty(upcomingGames) ?
                <LoadingComponent text={"Caricamento giochi in uscita"}/> :
                <>
                    <Row xs={1} md={3} className="g-4">
                        {upcomingGames.map((game, idx) => (
                            <div key={idx}>
                                <GameCard game={game} idx={idx} email={userDb.email}/>
                            </div>
                        ))}
                    </Row>
                    <Row>
                        <Pagination className={"card-iterator"}>
                            {pages}
                        </Pagination>
                    </Row>
                </>
            }
        </>

    )
}