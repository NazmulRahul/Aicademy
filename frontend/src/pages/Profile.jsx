import React from "react";
import { useContext } from "react";
import { userContextProvider } from "../context/UserContext";
const Profile = () => {
    const { signedIn, user, subjects, topics, curUser, getData, curData } =
        useContext(userContextProvider);
    
    return(
        <div class="p-2 bg-gray-100 mr-6">
            
        </div>
    )
};

export default Profile;
