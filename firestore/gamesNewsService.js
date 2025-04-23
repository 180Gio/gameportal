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

export async function deleteGamesNews(email, gameName) {
    const queryGames = query(collection(db, "gamesNews"),
        where("userEmail", "==", email), where("gameName", "==", gameName));
    const gamesNewsList = await getDocs(queryGames);
    const gamesNews = gamesNewsList.empty ? null : gamesNewsList.docs[0];
    if (gamesNews !== null) {
        await deleteDoc(gamesNews.ref);
    }
}

export async function getGamesNewsList(email) {
    const queryGames = query(collection(db, "gamesNews"), where("userEmail", "==", email));
    const gamesNewsList = await getDocs(queryGames);
    return gamesNewsList.empty ? null : gamesNewsList.docs.map(game => game.data());
}