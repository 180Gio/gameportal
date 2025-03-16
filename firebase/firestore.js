import {db} from "./firebase.js"
import {addDoc, collection, getDocs, query, updateDoc, where} from "firebase/firestore"

async function createUser(email) {
    let user = {
        email: email,
        favoriteGames: [],
        notificationPreferences: {news: false, gameOut: false},
        username: email
    };
    return await addDoc(collection(db, "users"), user);
}

export async function getUser(email) {
    let user = undefined;
    await getDocs(query(collection(db, "users"), where("email", "==", email))).then(userList => {
        if (userList && !userList.empty) {
            user = userList.docs[0]
        }
    })
    if (!user) {
        user = createUser(email)
    }
    return user;
}

export async function getUsername(email) {
    let user = await getUser(email);
    return user.get("username")
}

export async function getNotificationPreferences(email) {
    let user = await getUser(email);
    return user.get("notificationPreferences")
}

export async function getFavoriteGames(email) {
    let user = await getUser(email);
    return user.get("favoriteGames")
}

export async function updateUsername(email, username) {
    let user = await getUser(email);
    if (user) {
        await updateDoc(user.ref, {username: username})
    }
}

export async function updateNotificationPreferences(email, notificationPreferences) {
    let user = await getUser(email);
    if (user) {
        await updateDoc(user.ref, {notificationPreferences: notificationPreferences});
    }
}

export async function updateFavoriteGames(email, favoriteGames) {
    let user = await getUser(email);
    if (user) {
        await updateDoc(user.ref, {favoriteGames: favoriteGames});
    }
}