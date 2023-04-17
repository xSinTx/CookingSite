import { Link, useParams } from 'react-router-dom'
import { Flex, VStack, Text, Center, Heading, UnorderedList, ListItem, Box, Stack, Button, Image } from '@chakra-ui/react'
import Header from './components/Header';
import { Recipe } from './classes/RecipeClass';
import { User } from './classes/User'

function RecipeSite({recipes, user} : {recipes: Recipe[] | undefined, user: User | undefined}) {
   const { id } = useParams();
   
   const selectedRecipe = recipes?.filter(function (recipe : any) {
      return recipe.id.toString() === id;
    });

   return (
   <>

   <Header user={user}/>
   <Center bg={'#8cb865'} w={'full'} p={10}>
      { selectedRecipe?.map(recipe => (
         <Flex key={id}>
         <Box maxW={'100%'} w={'full'} bg={'green.100'} rounded={'md'} p={10}>
            <VStack>
               <Box maxW={'100%'} w={'full'}  bg={'green.400'} boxShadow={'2xl'} rounded={'md'} p={7}>
                  <Heading as='h1' size='2xl'> { recipe.title } </Heading>
               </Box>
               <Image src='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F39%2F2012%2F09%2F20222214%2FHearty-Multigrain-Pancakes-RU189325.jpg&w=400&h=400&c=sc&poi=face&q=60' 
               h='200px' alt="" />
               <Text> Cooking time: {recipe.time} perc </Text>
               <Box maxW={'60%'} w={'full'} bg={'green.300'} boxShadow={'2xl'} rounded={'md'} p={2}>
                  <Text as='b'> Ingredients: </Text>
                  <Stack spacing={0} align={'center'} mb={4}>
                     <UnorderedList styleType="none">
                        {recipe.ingredients.map(
                           function(ingredient, idx) {
                              return (<ListItem key={idx}>{ingredient.name}</ListItem>)
                        })}
                     </UnorderedList>
                  </Stack>
               </Box>
               <Box maxW={'100%'} w={'full'} bg={'green.400'} boxShadow={'2xl'} rounded={'md'} p={3}>
                  <Text as='b'> Recipe: </Text>
                  <Stack spacing={0} align={'left'} mb={5} ml={10}>
                     <Text> { recipe.description } </Text>
                  </Stack>
               </Box>
               <Link to='/' color='white'>
         <Button colorScheme='orange' variant='ghost' ml={10}>
            Back to the main page
         </Button>
      </Link>
            </VStack>
         </Box>
         </Flex>
      ))}
      
   </Center>
   </>
   )

  }
  
  export default RecipeSite