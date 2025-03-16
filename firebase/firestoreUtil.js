import {db} from "./firebase.js"
import {collection, getDocs, query, updateDoc, where} from "firebase/firestore"

async function getUser(email) {
    let user = {};
    await getDocs(query(collection(db, "users"), where("email", "==", email))).then(userList => {
        if (userList && !userList.empty) {
            user = userList.docs[0]
        }
    })
    return user;
}

export async function getUsername(email) {
    let username;
    await getUser(email).then(user => {
        if (user && (user.get("username") !== undefined && user.get("username").trim().length > 0)) {
            username = user.get("username")
        } else {
            username = email
        }
    });
    return username;
}

export async function updateUsername(email, username) {
    let user = await getUser(email);
    await updateDoc(user.ref, {"username": username})
}

export async function getNotificationPreferences(email) {
    let notifications = {}
    await getDocs(query(collection(db, "notifications"), where("email", "==", email))).then(notificationList => {
        if (notificationList && !notificationList.empty) {
            notifications = notificationList.docs[0]
        }
    })
    return notifications;
}