import axios from "axios";
import { Flex, Input, VStack, Text, Box, Button, FormControl, FormLabel, Center} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup" 
import './style/SignUp.css'
import Header from './components/Header'
import { useState } from "react";
import { User } from './classes/User'



function SignUp({user} : {user:User | undefined}) {

    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().min(4).max(12).required("min 4 letters, maximum 12"),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
        email: yup.string().email().required()
      });

           

    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema),});

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("Unknown")

    const submitForm = (data: any) => {


      axios.post('https://localhost:7026/api/SignUp', {
          username,
          email,
          password
      }).catch((error) => {
        console.log(error);
        window.alert("Ilyen felhasználónév vagy e-mail már létezik")
    })
      console.log(data);
    };


  return (
    <div>
        <Header user={user}/>
        <Center>
            <Flex  className='signUp--back' w='100%' h='100vh'>
                <VStack m='auto'>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <Box className='signUp--box' w='500px'>
                            <Text className='signUp'> Sign Up</Text>
                            <FormControl isRequired>
                                <FormLabel className='signUp--text'> Username </FormLabel>
                                <Input {...register("username")} placeholder='username' bg='white' name="username" onChange={e => setUsername(e.target.value)}/>
                                <> {errors.username?.message} </>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel className='signUp--text'>Password</FormLabel>
                                <Input {...register("password")} type='password' placeholder='password' bg='white' name="password" onChange={e => setPassword(e.target.value)}/>
                                <> {errors.password?.message} </>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel className='signUp--text'>Password again</FormLabel>
                                <Input type='password' {...register("confirmPassword")}  placeholder='password' bg='white'/>
                                <> {errors.confirmPassword && "Passwords Should Match!"} </>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel className='signUp--text'>Email</FormLabel>
                                <Input {...register("email")} type='email' bg='white' name="email" onChange={e => setEmail(e.target.value)}/>
                            </FormControl>
                            <Button className='signUp--button' type='submit' id = "submit"><p color='white'>Sign Up</p></Button>
                        </Box>
                    </form>
                </VStack>
            </Flex>
    </Center>
    </div>
  )
}


export default SignUp