// In App.js in a new project

import * as React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Pages/Home'
import Register from '../Auth/Register'
import Login from '../Auth/Login'


const Stack = createNativeStackNavigator()

function Route() {
    return (
        <Stack.Navigator initialRouteName='Register'>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Register" component={Register} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Login" component={Login}  options={{
                headerShown: false
            }}  />
        </Stack.Navigator>
    )
}

export default Route
