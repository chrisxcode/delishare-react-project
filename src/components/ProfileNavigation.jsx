import { Route, Routes } from "react-router-dom";
import { createContext } from "react";
import { ProfileNavRecipes } from "./ProfileNavRecipes";

export const ProfileNavContext = createContext(null);

export const ProfileNavigation = ({
    themeColors,
    recipes,
    userId,
    userProfile
}) => {

    return (
        <ProfileNavContext.Provider value={{
            themeColors,
            recipes,
            userId,
            userProfile
        }}>
            <div>
                <Routes>
                    <Route path="" element={<ProfileNavRecipes sortBy="authored" />} />
                    <Route path="authored" element={<ProfileNavRecipes sortBy="authored" />} />
                    <Route path="liked" element={<ProfileNavRecipes sortBy="liked" />} />
                    <Route path="saved" element={<ProfileNavRecipes sortBy="saved" />} />
                    <Route path="following" element={<ProfileNavRecipes sortBy="following" />} />
                </Routes>
            </div>
        </ProfileNavContext.Provider>
    )
}

