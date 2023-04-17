import { Link } from 'react-router-dom'
import {Box, Avatar, Menu, MenuButton, MenuList, MenuItem} from '@chakra-ui/react'
import '../style/Header.css'
import { User } from '../classes/User'


function Header({user} : {user:any}) {

  let isLoggedIn = user!=null

  if(isLoggedIn){
    return (
      <Box className="headerBox" id="header" w='100%' bg='tomato' p='15px'>
          
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
                            window.location.href = "http://127.0.0.1:5173/";
              }}>Log out</MenuItem>
            </MenuList>
          </Menu>
      </Box>
    )
  }

  else{
    return (
      <Box className="headerBox" id="header" w='100%' bg='tomato' p='15px'>
          
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

export default Header