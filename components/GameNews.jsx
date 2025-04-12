import "/src/css/gameNews.css"

export default function GameNews({gameInfo}) {
    return (
        <>
            <div className={"w-100 news-card"}>
                <p className={"news-title"}>{gameInfo.gameName}</p>
                <div className={"news-body"}>
                    {gameInfo.news.map((news, index) =>
                        <div className="overflow-hidden"
                             id={gameInfo.gameName + "-" + index}>
                            <div className="p-2">
                                <h4>{news.title}</h4>
                                <p className="text-sm text-gray-400 mb-2">
                                    {news.feedlabel} • {new Date(news.date * 1000).toLocaleDateString()}
                                </p>
                                <p className="text-base mb-4">{news.content}</p>
                                <a href={news.url} target="_blank" rel="noopener noreferrer" className="news-link">
                                    Leggi di più →
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}