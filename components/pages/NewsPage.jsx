import {useEffect, useState} from "react";
import {getSteamNews} from "../../external/steamApi.js";
import {isObjectEmpty} from "../../src/util.js";
import LoadingComponent from "../LoadingComponent.jsx";
import GameNews from "../GameNews.jsx";
import {Container, Row} from "react-bootstrap";
import GameSearch from "../gameAutoComplete/GameSearch.jsx";

export default function NewsPage() {
    const [gamesNews, setGamesNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchGame, setSearchGame] = useState({});

    async function getNewsForGame(gameObj, count = 1) {
        let gameNews = {};
        await getSteamNews(gameObj, count).then(news => {
            if (!isObjectEmpty(news)) {
                gameNews = {gameName: gameObj.name, news: news};
            }
        });
        return gameNews;
    }

    useEffect(() => {
        let fetchNews = async (gameList) => {
            let news = await Promise.all(gameList.map(getNewsForGame));
            news = news.filter(n => !isObjectEmpty(n));
            setGamesNews(news);
            console.log(news)
        }
        let defaultGameList = JSON.parse(import.meta.env.VITE_DEFAULT_GAMES_ID);
        fetchNews(defaultGameList);
        setLoading(false);
    }, []);

    useEffect(() => {
        console.log(gamesNews);
        if (!isObjectEmpty(searchGame)) {
            let gameObj = {appid: searchGame.steam_appid, name: searchGame.name};
            getNewsForGame(gameObj, 10).then(news => {
                console.log(news);
                let a = [];
                a.push(news);
                setGamesNews(a);
            })
        }
    }, [searchGame])
    return (
        <>
            <GameSearch setSearchGame={setSearchGame} disabled={loading}/>
            {loading ? <LoadingComponent text={"Caricamento delle notizie"}/> :
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