import "/src/css/pages/gameNews.css"

export default function GameNews({gameInfo, sameGame, index}) {
    return (
        <>
            <div className={"w-100 news-card"}>
                {gameInfo?.news ?
                    <>
                        {!sameGame ? <p className={"news-title"}>{gameInfo.gameName}</p> : null}
                        <div className={"py-3"}>
                            {gameInfo.news.map((news, newsIndex) =>
                                <div className="overflow-hidden"
                                     key={gameInfo.gameName + "-" + index + "-" + newsIndex}>
                                    <div className="p-2">
                                        <h4>{news.title}</h4>
                                        <p className="text-sm text-gray-400 mb-2">
                                            {news.feedlabel} • {new Date(news.date * 1000).toLocaleDateString()}
                                        </p>
                                        <p className="text-base mb-2">{news.content}</p>
                                        <a href={news.url} target="_blank" rel="noopener noreferrer"
                                           className="news-link">
                                            Leggi di più →
                                        </a>
                                    </div>
                                    {newsIndex !== gameInfo.news.length - 1 ?
                                        <hr></hr> : null}
                                </div>
                            )}
                        </div>
                    </> :
                    <div className={"pt-3"}>
                        <p>Per il gioco selezionato non sono disponibili news</p>
                    </div>}
            </div>
        </>
    );
}