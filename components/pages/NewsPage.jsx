import {useEffect, useState} from "react";
import {getSteamNews} from "../../external/steamApi.js";
import {isObjectEmpty} from "../../src/util.js";
import LoadingComponent from "../LoadingComponent.jsx";
import GameNews from "../GameNews.jsx";
import {Row} from "react-bootstrap";
import GameSearch from "../gameAutoComplete/GameSearch.jsx";
import ErrorComponent from "../ErrorComponent.jsx";

export default function NewsPage() {
    const [gamesNews, setGamesNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchGame, setSearchGame] = useState({});
    const [error, setError] = useState(false);

    async function getNewsForGame(gameObj, count = 1) {
        try {
            let gameNews = {};
            await getSteamNews(gameObj, count).then(news => {
                if (!isObjectEmpty(news)) {
                    gameNews = {gameName: gameObj.name, news: news};
                }
            });
            return gameNews;
        } catch (error) {
            setError(true);
        }
    }

    useEffect(() => {
        if (isObjectEmpty(searchGame)) {
            let fetchNews = async (gameList) => {
                let news = await Promise.all(gameList.map(getNewsForGame));
                news = news.filter(n => !isObjectEmpty(n));
                setGamesNews(news);
            }
            let defaultGameList = JSON.parse(import.meta.env.VITE_DEFAULT_GAMES_ID);
            fetchNews(defaultGameList);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isObjectEmpty(searchGame)) {
            let gameObj = {appid: searchGame.steam_appid, name: searchGame.name};
            getNewsForGame(gameObj, 10).then(news => {
                setGamesNews(Array.of(news));
            })
        }
        setLoading(false);
    }, [searchGame])
    return (
        <>
            <GameSearch setSearchGame={setSearchGame} disabled={loading || error} setLoading={setLoading}/>
            {error ? <ErrorComponent/> : loading ?
                <LoadingComponent text={"Caricamento delle notizie"}/> : gamesNews.length > 0 ?
                    <>
                        {gamesNews.map((gameInfo, index) =>
                            <div key={index}>
                                <Row>
                                    <GameNews gameInfo={gameInfo} sameGame={!isObjectEmpty(searchGame)}/>
                                </Row>
                            </div>
                        )}
                    </> : <GameNews/>
            }
        </>
    )
}