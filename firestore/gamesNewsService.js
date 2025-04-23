import {addDoc, collection, deleteDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase/firebase.js";

export async function createGamesNews(email, gameName, steamAppId) {
    let gamesNews = {
        gameName: gameName,
        steamAppId: steamAppId,
        userEmail: email,
    };
    return await addDoc(collection(db, "gamesNews"), gamesNews);
}

export async function deleteGamesNews(email, gameId) {
    const gamesNews = await getGamesNewsRef(email, gameId);
    if (gamesNews !== null) {
        await deleteDoc(gamesNews.ref);
    }
}

export async function getGamesNewsList(email) {
    const queryGames = query(collection(db, "gamesNews"), where("userEmail", "==", email));
    const gamesNewsList = await getDocs(queryGames);
    return gamesNewsList.empty ? null : gamesNewsList.docs.map(game => game.data());
}

export async function isUserRegisteredForNews(email, gameId) {
    const gamesNews = await getGamesNewsRef(email, gameId);
    return gamesNews !== null;
}

async function getGamesNewsRef(email, gameId) {
    const queryGames = query(collection(db, "gamesNews"),
        where("userEmail", "==", email), where("steamAppId", "==", gameId));
    const gamesNewsList = await getDocs(queryGames);
    return gamesNewsList.empty ? null : gamesNewsList.docs[0];
}