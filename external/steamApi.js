const steamApiKey = import.meta.env.VITE_STEAM_API_KEY

export async function getSteamID(username) {
    let response = await fetch("/steam/ISteamUser/ResolveVanityURL/v0001/?key=" + steamApiKey + "&vanityurl=" + username)
    return (await response.json()).response;
}

export async function getSteamAppInfo(steamAppName) {
    //TODO get steam app id from name
    let response = await fetch("/steam/appdetails?appids={APP_ID}")
    return (await response.json()).response;
}

async function getSteamAppId(steamAppName) {
    let response = await fetch("/steam/appdetails?appids={APP_ID}")
    return (await response.json()).response;
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
        return this.map.values().find(gameObj => gameObj.appid === appId)
    }

    getGameId(gameName) {
        return this.map.values().find(gameObj => gameObj.name === gameName)
    }
}

const steamDataMap = new SteamDataSingleton();
export {steamDataMap}