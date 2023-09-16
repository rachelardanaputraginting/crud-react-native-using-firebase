import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { SafeAreaView } from 'react-native-safe-area-context'


const Login = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleLogin = async () => {
        try {
            const auth = getAuth()
            const isUserCreated = await signInWithEmailAndPassword(auth, email, password)
            console.log(isUserCreated)
            navigation.navigate('Home', {
                email: isUserCreated.user.email,
                uid: isUserCreated.user.uid,
            })

            setMessage(Alert.alert("Success", "Login succesfully."));

            setPassword("")
            setEmail("")
        } catch (error) {
            setMessage(Alert.alert("Failed", "Login failed. Make sure the email and password are correct"));
        }
    }

    return (
        <SafeAreaView>
            <View className="container px-4 flex h-full w-full justify-center">
                <Text className="my-2 font-bold text-[20px] text-slate-700 text-center">Metahub</Text>
                <TextInput
                    className="bg-white border border-slate-700 p-3 rounded text-slate-600 mb-2"
                    placeholder='Enter Your Email'
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />
                <TextInput
                    className="bg-white border border-slate-700 p-3 rounded text-slate-600 mb-2"
                    placeholder='Enter Your Password'
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    secureTextEntry={true}
                />


                <TouchableOpacity className="bg-sky-700 rounded p-4 mt-2" onPress={() => handleLogin()}>
                    <Text className="text-white text-center font-bold">Login</Text>
                </TouchableOpacity>


                <View className="flex flex-nowrap flex-row justify-center my-2">
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text className="text-blue-500">Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )

}

export default Login

const styles = StyleSheet.create({})
