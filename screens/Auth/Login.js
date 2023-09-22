import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik'
import * as yup from 'yup'
import { StackActions } from '@react-navigation/native'


const Login = ({ navigation }) => {

    const validationSchema = yup.object().shape({
        email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
        password: yup.string().min(6, "Password minimal harus 6 karakter").required("Password wajib diisi")
    })

    const handleLogin = async (formValues) => {
        try {
            await validationSchema.validate(formValues, { abortEarly: false })
            const auth = getAuth()
            const userCredential = await signInWithEmailAndPassword(auth, formValues.email, formValues.password)
            if (userCredential) {
                // Check if the user's email is verified
                const user = userCredential.user;
                if (user.emailVerified) {
                    // Email is verified, navigate to the Home screen
                    Alert.alert("Verified", "Your email verified!")
                    navigation.dispatch(StackActions.replace('Home'));
                } else {
                    // Email is not verified, display an alert
                    sendEmailVerification(auth.currentUser).then(() => {
                        Alert.alert("Verify", "Please verify your email!")
                        navigation.dispatch(StackActions.replace('Login'));
                    })
                    await signOut(auth)
                }
            }
        } catch (error) {
            Alert.alert("Failed", "Login failed. Make sure the email and password are correct")
        }
    }

    return (
        <SafeAreaView>
            <View className="container px-4 flex h-full w-full justify-center">
                <Text className="my-2 font-bold text-[20px] text-slate-700 text-center">Metahub</Text>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        handleLogin(values)
                        resetForm()
                    }}
                >
                    {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                        <View>
                            <TextInput
                                className="bg-white border border-slate-700 p-3 rounded text-slate-600 mb-2"
                                placeholder='Enter Your Email'
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                name="email"
                            />
                            {touched.email && errors.email && (
                                <Text className="text-red-500 mb-2 mt-0 text-[12px]">{errors.email}</Text>
                            )}

                            <TextInput
                                className="bg-white border border-slate-700 p-3 rounded text-slate-600 mb-2"
                                placeholder='Enter Your Password'
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                secureTextEntry={true}
                                name="password"
                            />
                            {touched.password && errors.password && (
                                <Text className="text-red-500 mb-2 mt-0 text-[12px]">{errors.password}</Text>
                            )}


                            <TouchableOpacity className="bg-sky-700 rounded p-4 mt-2" onPress={handleSubmit}>
                                <Text className="text-white text-center font-bold">Login</Text>
                            </TouchableOpacity>


                            <View className="flex flex-nowrap flex-row justify-center my-2">
                                <Text>Don't have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                    <Text className="text-blue-500">Register</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                </Formik>
            </View>
        </SafeAreaView>
    )

}

export default Login

const styles = StyleSheet.create({})
