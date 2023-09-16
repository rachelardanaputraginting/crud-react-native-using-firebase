import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
    return (
        <SafeAreaView>
            <View className="flex w-full h-full justify-center items-center">
                <Text className="text-lg">Hello</Text>
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})
