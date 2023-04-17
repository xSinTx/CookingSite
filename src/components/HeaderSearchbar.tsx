import { Link } from 'react-router-dom'
import {Box, Input, InputGroup, InputLeftElement, Avatar, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import '../style/Header.css'
import authService from '../auth/auth_service';
import { User } from '../classes/User'


function HeaderSearchbar({filterText, onFilterTextChange, user} : { filterText : any, onFilterTextChange : any, user: any}) {
  const handleChange = (e : any) => onFilterTextChange(e.target.value)
  const isLoggedIn = user!=null
  

if(isLoggedIn){
  return (
    <Box className="headerBox" w='100%' bg='tomato' p='15px'>
        <InputGroup w='40%' bg='white' borderRadius='50%' >
            <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon />} />
            <Input 
              className='text' type='search' placeholder='Search...' 
              value={filterText} 
              onChange={handleChange}
            />
        </InputGroup>

        <Menu>
          <MenuButton w='200px' h='40px' bg='white' borderRadius='6%'>
          {user?.userName}&nbsp;&nbsp;
            <Avatar bg='teal.500' size="xs"/>
          </MenuButton>
          <MenuList>
              <Link to='/user'><MenuItem>My profile</MenuItem></Link>
              <Link to='/'><MenuItem>Mainpage</MenuItem></Link>
              <MenuItem onClick={() => {
                            localStorage.removeItem("token");
                            location.reload();
              }}>Log out</MenuItem>
          </MenuList>
        </Menu>
        
    </Box>
  )
}
else{
  return (
    <Box className="headerBox" w='100%' bg='tomato' p='15px'>
        <InputGroup w='40%' bg='white' borderRadius='50%' >
            <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon />} />
            <Input 
              className='text' type='search' placeholder='Search...' 
              value={filterText} 
              onChange={handleChange}
            />
        </InputGroup>

        <Menu>
          <MenuButton w='200px' h='40px' bg='white' borderRadius='6%'>
            Sign up/ sign in&nbsp;&nbsp;
            <Avatar bg='teal.500' size="xs"/>
          </MenuButton>
          <MenuList>
            <Link to='/signup'><MenuItem>Sign up</MenuItem></Link>
            <Link to='/login'><MenuItem>Sign in</MenuItem></Link>
            <Link to='/'><MenuItem>Mainpage</MenuItem></Link>
          </MenuList>
          
        </Menu>
        
    </Box>
  )
}
 
}

export default HeaderSearchbar
