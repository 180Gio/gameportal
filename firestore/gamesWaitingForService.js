import {db} from "../firebase/firebase.js"
import {addDoc, collection, deleteDoc, getDocs, query, where} from "firebase/firestore"

export async function createGamesWaitingFor(email, gameName, releaseDate) {
    let gameWaitingFor = {
        gameName: gameName,
        releaseDate: releaseDate,
        userEmail: email,
    };
    return await addDoc(collection(db, "gamesWaitingFor"), gameWaitingFor);
}

async function getGamesWaitingForRef(email, gameName) {
    const gameWaitingForQuery = query(collection(db, "gamesWaitingFor"),
        where("userEmail", "==", email), where("gameName", "==", gameName));
    const gameWaitingForRefList = await getDocs(gameWaitingForQuery);
    return gameWaitingForRefList.empty ? null : gameWaitingForRefList.docs[0];
}

export async function isUserWaitingForGame(email, gameName) {
    let gameWaitingForRef = await getGamesWaitingForRef(email, gameName);
    return gameWaitingForRef != null;
}

export async function deleteWaitingForGame(email, gameName) {
    let gameWaitingForRef = await getGamesWaitingForRef(email, gameName);
    await deleteDoc(gameWaitingForRef.ref);
}