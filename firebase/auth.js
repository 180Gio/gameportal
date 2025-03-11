import {auth} from "./firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

export async function registerWithEmailAndPassword(email, password){
    return createUserWithEmailAndPassword(auth, email, password);
}

export async function loginWithEmailAndPassword(email, password){
    return signInWithEmailAndPassword(auth, email, password);
}

export async function loginWithGoogle(){
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result.user)
    return result;
}

export function logout(){
    return auth.signOut();
}