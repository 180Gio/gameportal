import {useEffect, useState} from "react";
import {getSteamNews} from "../../external/steamApi.js";
import {isObjectEmpty} from "../../src/util.js";
import LoadingComponent from "../LoadingComponent.jsx";
import GameNews from "../GameNews.jsx";
import {Container, Row} from "react-bootstrap";

export default function NewsPage() {
    const [gamesNews, setGamesNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let fetchNews = async (gameList) => {
            let getNewsForGame = async (gameObj) => {
                let gameNews = {};
                await getSteamNews(gameObj).then(news => {
                    if (!isObjectEmpty(news)) {
                        gameNews = {gameName: gameObj.name, news: news};
                    }
                });
                return gameNews;
            }
            let news = await Promise.all(gameList.map(getNewsForGame));
            news = news.filter(n => !isObjectEmpty(n));
            setGamesNews(news);
            console.log(news)
        }

        let defaultGames = JSON.parse(import.meta.env.VITE_DEFAULT_GAMES_ID);
        fetchNews(defaultGames);
        setLoading(false);
    }, []);


    return (
        <> {loading ? <LoadingComponent text={"Caricamento delle notizie"}/> :
            <Container>
                {gamesNews.map((gameInfo, index) =>
                    <Row>
                        <GameNews gameInfo={gameInfo} key={index}/>
                    </Row>
                )}
            </Container>
        }
        </>
    )
}