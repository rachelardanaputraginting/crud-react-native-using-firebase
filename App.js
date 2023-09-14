import { Alert, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { doc, getDoc } from 'firebase/firestore';
import { ref, set, off, onValue, remove, update } from 'firebase/database'

import firestoreDb from './config/FIRESTORE.js'
import { SafeAreaView } from 'react-native-safe-area-context'

const App = () => {

    const [inputText, setInputText] = useState()

    const [list, setList] = useState(null)

    const [isUpdate, setIsUpdate] = useState(false)

    const [selectedText, setSelectedText] = useState(null)

    useEffect(() => {
        const dbRef = ref(firestoreDb, 'todo')

        const dbListener = onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                const dataList = Object.values(data)
                setList(dataList) // Memperbarui state list langsung di dalam callback
            }
        })

        // Membersihkan pendengar ketika komponen unmount
        return () => {
            off(dbRef, 'value', dbListener)
        }
    }, [])

    const handleAddData = async () => {
        try {
            if (inputText.length > 0) {
                const currentTimestamp = Math.floor(new Date().getTime() / 1000)
                const dbRef = ref(firestoreDb, `todo/${currentTimestamp}`)
                await set(dbRef, {
                    id: currentTimestamp,
                    value: inputText
                })
                setInputText('')
            } else {
                Alert.alert("Failed", "Valus is required, please input again!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateData = async () => {
        try {
            if (inputText.length > 0) {
                const dbRef = ref(firestoreDb, `todo/${selectedText}`)
                await update(dbRef, {
                    id: selectedText,
                    value: inputText
                })
                setInputText('')
                setIsUpdate(false)
            } else {
                Alert.alert("Failed", "Valus is required, please input again!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCardIndex = (index, value) => {
        try {
            // setIsUpdate(true)
            setIsUpdate(true)
            setInputText(value)
            setSelectedText(index)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCardLongIndex = (index, value) => {
        try {
            Alert.alert("Alert", `Are you sure deletes ${value}?`, [
                {
                    text: 'No',
                    onPress: () => {
                        console.log('Cancel')
                    },
                    style: 'cancel'
                }, {
                    text: 'Yes',
                    onPress: async () => {
                        const dbRef = ref(firestoreDb, `todo/${index}`)
                        await remove(dbRef)
                    },
                }
            ])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>


            <SafeAreaView>

                <View className="container px-4">
                    <Text className="my-2 font-bold text-[20px] text-slate-700 text-center">Todo App</Text>
                    <TextInput style={{ textAlignVertical: 'top' }}
                        className="bg-white border border-slate-700 p-3 rounded text-slate-600"
                        placeholder='Enter Ay Value'
                        value={inputText}
                        onChangeText={(value) => setInputText(value)}
                        multiline
                        numberOfLines={4}
                    />

                    {
                        !isUpdate ? (
                            <TouchableOpacity className="bg-sky-700 rounded p-4 mt-2" onPress={() => handleAddData()}>
                                <Text className="text-white text-center font-bold">Add</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity className="bg-sky-700 rounded p-4 mt-2" onPress={() => handleUpdateData()}>
                                <Text className="text-white text-center font-bold">Update</Text>
                            </TouchableOpacity>
                        )
                    }

                </View>
            </SafeAreaView>

            <Text className="my-2 font-bold text-[16px] text-slate-700 my-5 px-4">Todo List</Text>
            <ScrollView>
                <View className="px-4">
                    <FlatList
                        data={list}
                        renderItem={({ item }) =>
                        (
                            <TouchableOpacity
                                onPress={() => handleCardIndex(item.id, item.value)}
                                onLongPress={() => handleCardLongIndex(item.id, item.value)}
                            >
                                <Text key={item.id} className="mb-2 p-3 border border-slate-500 rounded">{item.value}</Text>
                            </TouchableOpacity>
                        )
                        }
                    />
                </View>
            </ScrollView>
        </>
    )
}

export default App

const styles = StyleSheet.create({})
