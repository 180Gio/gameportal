import {useState} from "react";

export default function NewsPage() {
    const [gamesNews, setGamesNews] = useState([]);

    // useEffect(() => {
    //     let news = [];
    //     let retrieveNews = async (game) => {
    //         let gameNews = {};
    //         await getSteamNews(game).then(news => {
    //             if (news.length > 0) {
    //                 gameNews = {gameName: game.name, news: news};
    //             }
    //         });
    //         return gameNews;
    //     }
    //     while (news.length < 10) {
    //         let game = getRandomGames(1)[0];
    //         console.log(game);
    //         retrieveNews(game).then(gameNews => {
    //             if (!isObjectEmpty(gameNews)) {
    //                 news.push(gameNews)
    //             }
    //         });
    //     }
    //     console.log(news);
    //     setGamesNews(news);
    // }, []);


    return (
        <p>NewsPage</p>
    )
}