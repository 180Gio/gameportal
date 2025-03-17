import {getUpcomingGames} from "../../external/rawgApi.js";
import {getSteamID, steamDataMap} from "../../external/steamApi.js";
import {Card, Container} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function UpcomingGamesPage() {

    const [upcomingGames, setUpcomingGames] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);


    useEffect(() => {
        async function loadUpcomingGames() {
            return await getUpcomingGames();
        }

        let data = loadUpcomingGames();
    })

    async function clicked() {
        console.log(await getSteamID("180Gio"))
        let data = await getUpcomingGames(pageNumber);
        console.log(data)
        setUpcomingGames(data.results);
        console.log(steamDataMap)
    }

    return (
        <>
            <button onClick={() => clicked()}>CLICK ME!</button>
            <Container style={{maxWidth: "90%"}}>
                <div className={"card-container"}>
                    {upcomingGames.map((game, index) => (
                        <div key={index} className={"card-wrapper"}>
                            <Card style={{height: '50%'}} id={game.id}>
                                <Card.Img variant="top" src={game.background_image} alt="game"
                                          className={"h-50"}/>
                                <Card.Body>
                                    <Card.Title>{game.name}</Card.Title>
                                    <Card.Text>
                                        {game.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </Container>
        </>

    )
}