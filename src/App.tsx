import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Recipe } from "./classes/RecipeClass";
import { User } from "./classes/User";
import Login from "./Login";
import MainContainer from "./MainContainer";
import RecipeCreator from "./RecipeCreator";
import RecipeSite from "./RecipeSite";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";


function App() {
    const [recipe, setRecipe] = useState<Recipe[]>();
    const [user, setUser] = useState<User>();

    console.log("EZ A USER", user)


    useEffect(() => {
      const fetchRecipes = async () => {
        try{
          const res = await axios.get('https://localhost:7026/api/Recipes');
          setRecipe(res.data);
        } catch(err: any){
          console.log(err);
        }
      }
      fetchRecipes();
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainContainer recipe={recipe} user={user} />} />
                <Route path="recipesite/:id" element={<RecipeSite recipes={recipe} user={user}/>} />
                <Route path="user" element={<UserProfile user={user} />} />
                <Route path="create" element={<RecipeCreator user={user} />} />
                <Route path="login" element={<Login user={user} setUser={setUser} />} />
                <Route path="signup" element={<SignUp user={user} />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;