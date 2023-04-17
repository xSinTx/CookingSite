import { Box, Checkbox, CheckboxGroup, Input, SimpleGrid } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { Ingredient } from "../classes/Ingredient";
import axios from "axios";
import '../style/Ingredients.css'
import authHeader from '../auth/auth_header';


function Ingredients({checkedList, setcheckedList} : {checkedList : any, setcheckedList : any}) {
  const list_temp = ['butter','flour','egg','sugar','apple','chicken','cheese','honey','onion','rice','oil','ham','pepper','mayo','bread']

  const [list, setList] =  useState<Ingredient[]>();
  //const [list, setList] =  useState(list_temp)
  const [listFilter, setListFilter] = useState('')

  useEffect(() => {
    const fetchIngredients = async () => {
      try{
        const res = await axios.get('https://localhost:7026/api/Ingredients', { headers: authHeader() });
        
        setList(res.data);
         
      } catch(err: any){
        console.log(err);
      }
      
    }
    fetchIngredients();
  }, [])

  function filterFunc(e: any){
   setListFilter(e.target.value)
  }

  const checkHandler = (event : any) => {
    const { checked, value } = event.target;

    setcheckedList(
      (prev: any[]) => checked
        ? [...prev, value]
        : prev.filter(val => val !== value)
    )
    //console.log(checkedList)
  }

  return (
    <Box className='container' w="80%">
    <Box className='header'><h1>Ingredients:</h1></Box> 
    <Input className='text' type='search' placeholder='Search...' m='auto' mb="8pt" onInput={filterFunc}/>
    <CheckboxGroup colorScheme='green' >
      <SimpleGrid columns={3} spacing='40px'>
        {
        list?.filter( item => item.name.indexOf(listFilter)>=0).map((item) => 
            <Checkbox borderColor='black' key={list.indexOf(item)} value={item.name} onChange={checkHandler}>
              {item.name}
            </Checkbox> )
        }
      </SimpleGrid>
    </CheckboxGroup>
    </Box>
  );
}

export default Ingredients