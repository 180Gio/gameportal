import {isObjectEmpty, truncateNumberToDigit} from "../src/util.js";

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
    let isGame = (gameName) => {
        let toLowerCase = gameName.toLowerCase();
        if (toLowerCase.includes(" dlc") || toLowerCase.includes(" set")
            || toLowerCase.includes(" pack ") || toLowerCase.includes(" artbook")
            || toLowerCase.includes("soundtrack") || toLowerCase.includes("guide")
            || toLowerCase.includes("bonus") || toLowerCase.includes(" deluxe")
            || toLowerCase.includes("expansion") || toLowerCase.includes(" trailer ") || toLowerCase.includes(" video ")) {
            return false;
        }
        return true;
    }
    allGames = allGames.filter(game => game.toLowerCase()
        .includes(steamGameName.toLowerCase()) && isGame(game)).slice(0, maxResults);
    return [...new Set(allGames)]
}

export function getSteamAppId(steamAppName) {
    return steamDataMap.getGameId(steamAppName);
}

export function getSteamAppName(steamAppId) {
    return steamDataMap.getGameName(steamAppId);
}

export async function getSteamNews(game, newsCount = 1) {
    try {
        if (game) {
            const response = await fetch("/steam/ISteamNews/GetNewsForApp/v0002/?appid=" + game.appid + "&count=" + newsCount + "&maxlength=300&format=json");
            let data = await response.json()
            if (data && !isObjectEmpty(data)) {
                return data.appnews.newsitems;
            }
        }
        return [];
    } catch (err) {
        throw err;
    }
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
        let userData = (await response.json()).response.players[0];
        let userFormattedData = {}
        userFormattedData["steamId"] = userData["steamid"];
        userFormattedData["steamUsername"] = userData["personaname"]
        userFormattedData["steamProfileUrl"] = userData["profileurl"]
        userFormattedData["steamAvatarUrl"] = userData["avatarfull"]
        userFormattedData["steamAccountCreationDate"] = new Date(userData["timecreated"] * 1000).toLocaleString()
        return userFormattedData;
    }

    async function getUnlockedAchievementsCount(appId) {
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

    async function getTotalAchievementsCount(appId) {
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
        let formattedGames = []
        for (let game of games) {
            let gameData = {};
            gameData["gameName"] = game["name"];
            gameData["gameId"] = game["appid"];
            gameData["totalHoursPlayed"] = truncateNumberToDigit((game["playtime_forever"] / 60), 1)
            gameData["unlockedAchievementsCount"] = await getUnlockedAchievementsCount(game["appid"])
            gameData["totalAchievementsCount"] = await getTotalAchievementsCount(game["appid"])
            gameData["gameImage"] = "https://cdn.cloudflare.steamstatic.com/steam/apps/" + game["appid"] + "/library_hero.jpg"
            formattedGames.push(gameData);
        }
        return formattedGames;
    }

    steamUserInfo["userInfo"] = await getSteamUserSummary();
    steamUserInfo["recentlyPlayedGames"] = await getUserSteamRecentGames();
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
        return Object.values(this.map).map(game => game.name);
    }
}

const steamDataMap = new SteamDataSingleton();