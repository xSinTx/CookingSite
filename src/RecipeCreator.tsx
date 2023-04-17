import { Link } from 'react-router-dom'
import { Flex, Input, Textarea, VStack, Text, Button } from '@chakra-ui/react'
import IngredientsCreator from './components/IngredientsCreator'
import { Recipe } from './classes/RecipeClass'
import axios from 'axios'
import { Ingredient } from './classes/Ingredient'
import { useState } from 'react'
import { User } from './classes/User'

function RecipeCreator({user} : {user:User | undefined}) {
  
  const [tags, setTags] = useState(Array<string>)

  function handleSubmit (event : any) {
    event.preventDefault()
    let newRecipe = new Recipe()
    
    newRecipe.title = event.target[1].value
    newRecipe.description = event.target[2].value
    newRecipe.time = event.target[3].value
    
    for (let i = 0; i < tags.length; i++) {
      let newIngredients = new Ingredient()
      newIngredients.name = tags[i]
      newRecipe.ingredients.push(newIngredients)
    }
    
    const recipe = { 
        Title: newRecipe.title,
        Time: newRecipe.time,
        Description: newRecipe.description,
        Ingredients: newRecipe.ingredients,
        User: user
      };

    console.log(recipe)
    
    axios.post('https://localhost:7026/api/Recipes', recipe)
          .then(response => newRecipe.id = response.data.id)
          .catch(error => {
          console.log(error.response);
          })  
  }

  return (
    <Flex bg='tomato' w='100%' h='100vh' alignItems='center' alignContent='center' >
      <VStack m='auto' w='50%'>
        <form onSubmit={handleSubmit}>
          <Button type="submit" disabled display="none" aria-hidden="true"></Button>
          <Text color='white' fontSize='6xl'>New recipe</Text>
          <Input placeholder='Recipe title' bg='white' />
          <Textarea placeholder='Recipe Description...'  bg='white' />
          <Input placeholder='Time' type="number" bg='white' />
          <IngredientsCreator tags={tags} setTags={setTags} />
          <Button type='submit' colorScheme='green' mt='20pt' w='100%'>Create recipe!</Button>
        </form>
        <Link to='/' color='white'>
          <Button colorScheme='white' variant='ghost' ml={10}>
            Back to the main page
          </Button>
        </Link>
      </VStack>
    </Flex>
  )
}

export default RecipeCreator
