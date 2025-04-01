const steamApiKey = import.meta.env.VITE_STEAM_API_KEY

export async function getSteamID(username) {
    let response = await fetch("/steam/ISteamUser/ResolveVanityURL/v0001/?key=" + steamApiKey + "&vanityurl=" + username)
    return (await response.json()).response;
}

export async function getSteamAppInfo(steamAppName) {
    let steamAppId = getSteamAppId(steamAppName);
    let steamAppInfo = {}
    if (steamAppId) {
        await fetch("/store/appdetails?appids=" + steamAppId)
            .then(response => response.text()
                .then((data) => steamAppInfo = Object.values(JSON.parse(data))[0]))
            .catch(console.error)
            .catch(console.error);
    }
    return steamAppInfo;
}

export function getSteamAutocomplete(steamGameName, maxResults) {
    let allGames = steamDataMap.getAllGameNames()
    allGames = allGames.filter(game => game.toLowerCase().includes(steamGameName.toLowerCase())).slice(0, maxResults);
    return [...new Set(allGames)]
}

export function getSteamAppId(steamAppName) {
    return steamDataMap.getGameId(steamAppName);
}

export function getSteamAppName(steamAppId) {
    return steamDataMap.getGameName(steamAppId);
}

export async function getSteamNews(game, newsCount = 1) {
    // if (game) {
    //     let news = [];
    //     await fetch("/steam/ISteamNews/GetNewsForApp/v0002/?appid=" + game.appid + "&count=" + newsCount + "&maxlength=300&format=json")
    //         .then(response => response.text()
    //             .then((data) => news = JSON.parse(data).appnews.newsitems)).catch(console.error)
    //     debugger
    //     return news;
    // }
}

export function getRandomGames(numberOfGames) {
    let randomGames = [];
    for (let i = 0; i < numberOfGames; i++) {
        randomGames.push(steamDataMap.getRandomGame())
    }
    return randomGames;
}

async function getSteamData() {
    let response = await fetch("/steam/ISteamApps/GetAppList/v2/");
    let appsList = (await response.json()).applist.apps;
    return appsList.filter((app) => app.name !== "");
}

class SteamDataSingleton {
    constructor() {
        if (!SteamDataSingleton.instance) {
            async function initData() {
                return await getSteamData()
            }

            initData().then(data => this.map = data)
            SteamDataSingleton.instance = this;
        }
        return SteamDataSingleton.instance;
    }

    getGameName(appId) {
        return this.map.values().find(gameObj => gameObj.appid === appId)?.name
    }

    getGameId(gameName) {
        return this.map.values().find(gameObj => gameObj.name === gameName)?.appid
    }

    getRandomGame() {
        return this.map.values().toArray()[Math.floor(Math.random() * this.map.length)];
    }

    getAllGameNames() {
        //TODO prendere solo giochi?
        return Object.values(this.map).map(game => game.name);
    }
}

const steamDataMap = new SteamDataSingleton();