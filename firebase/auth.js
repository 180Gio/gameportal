import {auth} from "./firebase";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";

export async function registerWithEmailAndPassword(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export async function loginWithEmailAndPassword(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return (await signInWithPopup(auth, provider)).user;
}

export function logout() {
    return auth.signOut();
}