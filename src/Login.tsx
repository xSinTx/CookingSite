import { useNavigate } from 'react-router-dom'
import { Flex, Input, VStack, Text, Box, Button, Center} from '@chakra-ui/react'
import { useState } from 'react'
import './style/Login.css'
import Header from './components/Header'
import axios from 'axios'


function Login({user, setUser} : {user:any, setUser:any}) {

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const navigate = useNavigate();

function login() {

  return axios
      .post('https://localhost:7026/api/login', {
        email,
        password
      })
      .then(response => {
       
        if (response.data) {
          localStorage.removeItem("token")
          localStorage.setItem("token", JSON.stringify(response.data.token));
        }

        setUser(response.data.user)

        return response.data.user;
      })
      .then( () =>
        navigate("/")
      )
      .catch( (reason => {
        window.alert("Helytelen adatok\n"+reason)
        navigate("/login")
      }));
      


}



  return (
    <div>
      <Header user={user} />
      <Center>
      <Flex  className='login--back' w='100%' h='100vh'> 
          <VStack>
              <Box className='login--box'>
                  <Text className='login--mainText'> Login</Text>
                  <Text className='login--text'> Please enter your email: </Text>
                  <Input placeholder='email...' type="email" bg='white' name ='email' onChange={e => setEmail(e.target.value)} />
                  <Text className='login--text'> Please enter your password:</Text>
                  <Input type="password" placeholder='password...' bg='white' name ='password' onChange={e => setPassword(e.target.value)} />
                  <Button className='login--button' onClick={login}>Let's go</Button>
              </Box>    
          </VStack>
             
      </Flex>
      </Center>
    </div>
  )
}

export default Login