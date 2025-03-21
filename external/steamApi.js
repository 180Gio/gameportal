const steamApiKey = import.meta.env.VITE_STEAM_API_KEY

export async function getSteamID(username) {
    let response = await fetch("/steam/ISteamUser/ResolveVanityURL/v0001/?key=" + steamApiKey + "&vanityurl=" + username)
    return (await response.json()).response;
}

export async function getSteamAppInfo(steamAppName) {
    let steamAppId = getSteamAppId(steamAppName);
    if (steamAppId) {
        return await fetch("/store/appdetails?appids=" + steamAppId)
            .then(response => response.text()
                .then((data) => JSON.parse(data)))
            .catch(console.error)
            .catch(console.error);
    }
}

export function getSteamAppId(steamAppName) {
    return steamDataMap.getGameId(steamAppName);
}

export function getSteamAppName(steamAppId) {
    return steamDataMap.getGameName(steamAppId);
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
}

const steamDataMap = new SteamDataSingleton();