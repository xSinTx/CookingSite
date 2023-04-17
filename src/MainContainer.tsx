import { Box, Flex, HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react';
import Ingredients from './components/Ingredients';
import RecipeComponent from './components/RecipeComponent';
import HeaderSearchbar from './components/HeaderSearchbar';
import './style/MainContainer.css'
import { Recipe } from './classes/RecipeClass';
import { User } from './classes/User'

function MainContainer({recipe, user} : {recipe: Recipe[] | undefined, user:User | undefined}) {
  const [checkedList, setcheckedList] = useState<Array<string>>([]);;
  const [filterText, setFilterText] = useState('');

  return (
    <>
    <Box className='mainContainer'>
      <HeaderSearchbar filterText={filterText} onFilterTextChange={setFilterText} user={user} />
      <Flex className='middlePart'>
	      <HStack bg='#8cb865' p='20px' spacing={8} display={{ md: "flex" }} width={{md: 1000}} height={{md: 900}} > 
          <Ingredients checkedList={checkedList} setcheckedList={setcheckedList} />
          <VStack>
            <RecipeComponent recipes={recipe} filterText={filterText} checkedList={checkedList} />
          </VStack>
        </HStack>
      </Flex>
      </Box>
    </>
  );
}



export default MainContainer