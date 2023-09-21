import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { StackActions } from '@react-navigation/native';


export default function SplashScreen({ navigation }) {

    const [isUserLogin, setIsUserLogin] = useState(false)

    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user !== null) {
            setIsUserLogin(true)
        }
    })

    useEffect(() => {
        setTimeout(() => {
            const routeName = isUserLogin ? 'Home' : 'Login'
            navigation.dispatch({
                ...StackActions.replace(routeName)
            })
            // navigation.navigate(routeName)
        }, 3000)
    }, [])


    return (
        <View className="w-full h-full flex justify-center items-center">
            <Text>SplashScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
