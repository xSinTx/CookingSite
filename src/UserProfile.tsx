import { VStack, Text, Center, Box, Container } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Header from './components/Header'
import RecipeComponent from './components/RecipeComponent'
import { User } from './classes/User'
import { useEffect, useState } from 'react'
import { Recipe } from './classes/RecipeClass'
import axios from 'axios'
import authHeader from './auth/auth_header'

function UserProfile({user} : {user: User | undefined}) {

    const [recipes, setRecipes] = useState<Recipe[]>()

    useEffect(() => {
        const fetchRecipes = async () => {            
            try { 

                const res = await axios.get('https://localhost:7026/api/RecipesOfUser', { headers: authHeader() });
                setRecipes(res.data);

          } catch(err: any){

                window.alert(err);
          }
          
        }

        fetchRecipes();

      }, [])

  return (
    <div className='profile'>
        <Header user={user}/>
            <Center>
                <VStack>
                <Text fontSize='6xl'>My recipes:</Text>
                <RecipeComponent recipes={recipes} filterText={""} checkedList={[]} />
                </VStack>
            </Center>
            <br />
        <Container maxW='6xl' bg='tomato.600'>
            <Link to='/create'>
                <Box display='flex' bg='tomato' w='15%' p={4} color='white'>
                    Upload new recipe
                </Box>
            </Link>
        </Container>
    </div>
  )
}

export default UserProfile
