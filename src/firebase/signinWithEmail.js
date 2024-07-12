import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

export const signupUser = async (name, password, email) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, {
            displayName: name,
        });

        console.log("User signed up successfully:", user);
        return `User signed up successfully", ${user}`
    } catch (error) {
        console.error("Error signing up:", error.message);
        return `Error signing up:", ${error.message}`
    }
};

export const signinUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        console.log("User signed up successfully:", user);
    } catch (error) {
        console.error("Error signing up:", error.message);
    }
};

