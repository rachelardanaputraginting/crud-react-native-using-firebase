import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Pages/Home'
import Register from '../Auth/Register'
import Login from '../Auth/Login'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import SplashScreen from '../Pages/SplashScreen'

const Stack = createNativeStackNavigator()

function Route() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}

export default Route
