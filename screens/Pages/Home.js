import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAuth, signOut } from 'firebase/auth'
import { StackActions } from '@react-navigation/native'


const Home = ({ navigation }) => {

    const auth = getAuth()
    const user = auth.currentUser

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigation.navigate('Login')
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <SafeAreaView>
            <View className="flex w-full h-full justify-center items-center">

                <Text className="text-lg">Email : {user.email}</Text>
                <Text className="text-lg">UID : {user.uid}</Text>
                <Text className="text-lg">Name : {user.displayName}</Text>

                <TouchableOpacity className="p-3 bg-red-500 rounded px-5" onPress={handleLogout}
                >
                    <Text>

                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})
