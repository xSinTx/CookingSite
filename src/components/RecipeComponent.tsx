import { Link } from 'react-router-dom'
import {VStack, Box, Text, Image } from '@chakra-ui/react'
import '../style/RecipeComponent.css'
import { Recipe } from '../classes/RecipeClass';


function RecipeComponent({ recipes, filterText, checkedList } : {recipes: Recipe[] | undefined, filterText: any, checkedList: any}) {
  const filterRecipes = recipes?.filter((recipe : any) => {
    return recipe.title.toLowerCase().includes(filterText);
  });

  const checkedRecipes = filterRecipes?.filter(function (recipe : any) {
    if (!checkedList.length)
      return recipe
    
    var checkedIngredient;
    for (let i = 0; i < recipe.ingredients.length; i++) {
      if (checkedList.indexOf(recipe.ingredients[i].name) >= 0)
        checkedIngredient = true
    }
    return checkedIngredient;
  });


  if(checkedRecipes?.length != undefined) {
    if (checkedRecipes.length >= 1) {
    return (
        <>
          {
            checkedRecipes?.map((recipes: any) => 
            {
              //console.log(checkedRecipes)
              return(
                <Link to={`/recipesite/${recipes.id}`} key={recipes.id}>
                    <Box className='recipeBox' >
                    <Image src='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F39%2F2012%2F09%2F20222214%2FHearty-Multigrain-Pancakes-RU189325.jpg&w=400&h=400&c=sc&poi=face&q=60' 
                    className='recipeImage'/>
                    <VStack>
                            <Text className='recipeText'>{recipes.title}</Text> 
                            <Text className='recipeText'>Cooking time: {recipes.time} min</Text>
                    </VStack>
                    
                    </Box>
                </Link>
              );
            })
          }
        </>
    );
    } else {
      return (
        <Box className='recipeBox' bg='gray' >                
            <Text className='recipeText' textAlign='center'>Sajnos nincs ilyen recept :(</Text>
        </Box>
      );
    }
  } else {
    return (
      <Box className='recipeBox' bg='gray' >                
          <Text className='recipeText' textAlign='center'>Sajnos nincsenek receptek :(</Text>
      </Box>
    );
  }
}

export default RecipeComponent