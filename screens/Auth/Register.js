import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { SafeAreaView } from 'react-native-safe-area-context'
import auth from '../../config/FIRESTORE'


const Register = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleRegister = async () => {
        try {
            const auth = getAuth()
            const isUserCreated = await createUserWithEmailAndPassword(auth, email, password)
            navigation.navigate("Login");

            setMessage(Alert.alert("Success", "User registered successfully."));

            setPassword("");
            setEmail("");
        } catch (error) {
            setMessage(Alert.alert("Failed", isUserCreated.message))
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


                <TouchableOpacity className="bg-sky-700 rounded p-4 mt-2" onPress={() => handleRegister()}>
                    <Text className="text-white text-center font-bold">Register</Text>
                </TouchableOpacity>

                <View className="flex flex-nowrap flex-row justify-center my-2">
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text className="text-blue-500">Login</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )

}

export default Register

const styles = StyleSheet.create({})
