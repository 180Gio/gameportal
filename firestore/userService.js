import {db} from "../firebase/firebase.js"
import {addDoc, collection, deleteDoc, getDocs, query, updateDoc, where} from "firebase/firestore"

async function createUser(email) {
    let user = {
        email: email,
        notificationPreferences: {news: false, gameOut: false},
        username: email
    };
    return await addDoc(collection(db, "users"), user);
}

async function getUserRef(email) {
    const userQuery = query(collection(db, "users"), where("email", "==", email));
    const userList = await getDocs(userQuery);
    let userRef;
    if (!userList.empty) {
        userRef = userList.docs[0];
    } else {
        userRef = createUser(email)
    }
    return userRef;
}

export async function getUser(email) {
    let userRef = await getUserRef(email);
    return {id: userRef.id, ...userRef.data()}
}

export async function getUsername(email) {
    let user = await getUser(email);
    return user.username;
}

export async function getNotificationPreferences(email) {
    let user = await getUser(email);
    return user.notificationPreferences
}

export async function updateUsername(email, username) {
    let user = await getUserRef(email);
    if (user) {
        await updateDoc(user.ref, {username: username});
    }
    return getUser(email);
}

export async function updateNotificationPreferences(email, notificationPreferences) {
    let user = await getUserRef(email);
    if (user) {
        await updateDoc(user.ref, {notificationPreferences: notificationPreferences});
    }
    return getUser(email)
}

export async function deleteUser(email) {
    let userRef = await getUserRef(email);
    if (userRef) {
        await deleteDoc(userRef.ref);
    }
}