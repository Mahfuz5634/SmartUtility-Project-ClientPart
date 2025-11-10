import { UserStar } from "lucide-react";
import { app } from "../Firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user,setuser]=useState(null);
    const [loading, setLoading] = useState(true);
    const [email,setemail]=useState('');

  const SignInFunc=(email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password);

  }

  const LogInFunc =(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password);
  }

  const LogOutFunc=()=>{
     return signOut(auth);
  }

  useEffect(()=>{
     const unsubscribe=onAuthStateChanged(auth,(curUser)=>{
        setuser(curUser)
        setLoading(false);
     })
     return ()=>{
        unsubscribe();
     }
  },[])



  const AuthData = {
    auth,
    user,
    loading,
    email,
    setemail,

  };
  return (
    <AuthContext value={AuthData}>{children}</AuthContext>
  );
};

export default AuthProvider;
