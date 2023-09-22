import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { StackActions } from '@react-navigation/native';


export default function SplashScreen({ navigation }) {

    useEffect(() => {
        setTimeout(() => {
            const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
                const routeName = user !== null ? 'Home' : 'Login'
                navigation.dispatch({
                    ...StackActions.replace(routeName)
                })
            })

            // unsubscribe();
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
