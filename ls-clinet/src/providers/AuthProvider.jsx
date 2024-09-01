import { createContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

// Create context
export const AuthContext = createContext(null);

// Initialize Firebase Auth
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider()

    // Create User function
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign In function
    const SignIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Log Out function
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };
    //-Photo Url --
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photo
        });
    };

    //Google Provider -
    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    const axiosPublic = useAxiosPublic()

    // Monitor auth state change
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
           if(currentUser){
            const userInfo = {email:currentUser.email};
            axiosPublic.post('jwt',userInfo)
            .then(res =>{
                if(res.data.token){
                    localStorage.setItem('access-token', res.data.token);
                }
            })
           }
           else{
            //
            localStorage.removeItem('access-token')
           }
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unSubscribe();
    }, []);

    // Auth context value
    const authInfo = {
        user,
        loading,
        createUser,
        SignIn,
        logOut,
        updateUserProfile,
        googleSignIn
    };

    // Provide context to children
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
