const steamApiKey = import.meta.env.VITE_STEAM_API_KEY

export async function getSteamID(username) {
    let response = await fetch("/steam/ISteamUser/ResolveVanityURL/v0001/?key=" + steamApiKey + "&vanityurl=" + username)
    return (await response.json()).response.steamid;
}

export async function getSteamAppInfo(steamAppName) {
    let steamAppId = getSteamAppId(steamAppName);
    let steamAppInfo = {}
    if (steamAppId) {
        await fetch("/store/appdetails?appids=" + steamAppId)
            .then(response => response.text()
                .then((data) => steamAppInfo = Object.values(JSON.parse(data))[0]))
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
    //     
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

export async function getSteamUserInfo(username) {
    let steamId = await getSteamID(username);
    let steamUserInfo = {};

    async function getSteamUserSummary() {
        let response = await fetch("steam/ISteamUser/GetPlayerSummaries/v2/?key=" + steamApiKey +
            "&format=json&steamids=" + steamId);
        return (await response.json()).response.players[0];
    }

    async function getDoneAchievements(appId) {
        let achievementsDone;
        try {
            let response = await fetch("steam/ISteamUserStats/GetUserStatsForGame/v0002/?appid=" + appId + "&key=" + steamApiKey + "&steamid=" + steamId)
            if (!response.ok) {
                achievementsDone = -1;
            } else {
                let data = await response.json();
                achievementsDone = data.playerstats.achievements.length;
            }
        } catch (e) {
            achievementsDone = -1;
        }
        return achievementsDone;
    }

    async function getTotalAchievements(appId) {
        let totalAchievements;
        try {
            let response = await fetch("steam/ISteamUserStats/GetSchemaForGame/v2/?appid=" + appId + "&key=" + steamApiKey)
            if (!response.ok) {
                totalAchievements = -1;
            } else {
                let data = await response.json();
                totalAchievements = data.game.availableGameStats.achievements.length;
            }
        } catch (err) {
            totalAchievements = -1;
        }
        return totalAchievements;
    }

    async function getUserSteamRecentGames() {
        let response = await fetch("steam/IPlayerService/GetRecentlyPlayedGames/v0001/?key=" + steamApiKey + "&steamid=" + steamId + "&format=json&count=9");
        let games = (await response.json()).response.games;

        for (let game of games) {
            game["gameImage"] = "http://media.steampowered.com/steamcommunity/public/images/apps/" + game["appid"] + "/" + game["img_icon_url"] + ".jpg"
            game["achievementsDone"] = await getDoneAchievements(game["appid"])
            game["achievementsTotal"] = await getTotalAchievements(game["appid"])
        }
        return games;
    }

    steamUserInfo["userInfo"] = await getSteamUserSummary();
    steamUserInfo["recentlyPlayedGames"] = await getUserSteamRecentGames();
    // /**Chiamata per recupero achievements
    //  * https://api.steampowered.com/IPlayerService/GetAchievementsProgress/v1/?access_token=eyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInI6MDAwQl8yNUEwQzMzRF9DMTlEQyIsICJzdWIiOiAiNzY1NjExOTgxMzY1OTUyNTEiLCAiYXVkIjogWyAid2ViOmNvbW11bml0eSIgXSwgImV4cCI6IDE3NDM2MjI4MDksICJuYmYiOiAxNzM0ODk0NzE2LCAiaWF0IjogMTc0MzUzNDcxNiwgImp0aSI6ICIwMDE4XzI2MENEMTMyXzM5NDhGIiwgIm9hdCI6IDE3MzYwODUxMDYsICJydF9leHAiOiAxNzU0MTc5MTI0LCAicGVyIjogMCwgImlwX3N1YmplY3QiOiAiMi4zOC43Ny4yOSIsICJpcF9jb25maXJtZXIiOiAiMi4zOC43Ny4yOSIgfQ.9-xu_by2Tk9fhNJ9c0yhY-eQnINRsHUGIvsOQ0qDp8OqqntHwW3eQ-DNNJ34YDKEmkx8jf8tqy5xWGZkOV5lCg&steamid=76561198136595251&appids%5B0%5D=730&appids%5B1%5D=730
    //  */
    console.log(steamUserInfo);
    return steamUserInfo;
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