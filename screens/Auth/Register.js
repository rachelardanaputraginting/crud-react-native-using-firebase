import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { SafeAreaView } from 'react-native-safe-area-context'
import auth from '../../config/FIRESTORE'
import * as yup from 'yup'
import { Formik } from 'formik'

const Register = ({ navigation }) => {
    const [formValue, setFormValues] = useState({
        email: "",
        password: ""
    })


    const validationSchema = yup.object().shape({
        email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
        password: yup.string().min(6, "Password minimal harus 6 karakter").required("Password wajib diisi")
    })

    const handleRegister = async (formValues) => {
        try {
            await validationSchema.validate(formValues, { abortEarly: false })
            const authInstance = getAuth()
            await createUserWithEmailAndPassword(authInstance, formValues.email, formValues.password)
            navigation.navigate('Login')
        } catch (error) {
            console.log('Error during registration:', error)
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
                        handleRegister(values)
                        resetForm()
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <TextInput
                                name="email"
                                className="bg-white border border-slate-700 p-3 rounded text-slate-600"
                                placeholder="Enter Your Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            {touched.email && errors.email && (
                                <Text className="text-red-500 mb-2 mt-0 text-[12px]">{errors.email}</Text>
                            )}

                            <TextInput
                                name="password"
                                className="bg-white border border-slate-700 p-3 rounded text-slate-600 "
                                placeholder="Enter Your Password"
                                secureTextEntry
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                            {touched.password && errors.password && (
                                <Text className="text-red-500 mb-2 mt-0 text-[12px]">{errors.password}</Text>
                            )}

                            <TouchableOpacity
                                className="bg-sky-700 rounded p-4 mt-2"
                                onPress={handleSubmit}
                            >
                                <Text className="text-white text-center font-bold">Register</Text>
                            </TouchableOpacity>

                        </View>
                    )}
                </Formik>

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
