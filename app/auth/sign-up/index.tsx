import { View, Text, StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { auth } from '@/configs/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {

    const navigation = useNavigation()
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [])

    const onCreateAccount = () => {

        if (!name) return ToastAndroid.show('Name is required', ToastAndroid.BOTTOM)
        if (!email) return ToastAndroid.show('Email is required', ToastAndroid.BOTTOM)
        if (!password) return ToastAndroid.show('Password is required', ToastAndroid.BOTTOM)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential: any) => {
                const user = userCredential.user;
                router.push('/mytrip')
            })
            .catch((error: any) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(error)
            });

    }


    return (
        <View style={{ padding: 25, paddingTop: 55, backgroundColor: Colors.WHITE, height: '100%' }} >

            <TouchableOpacity onPress={() => router.back()} >
                <Ionicons name='arrow-back' size={24} color='black' />
            </TouchableOpacity>

            <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, marginTop: 30 }} >Create New Account</Text>

            {/* Full Name */}
            <View style={{ marginTop: 40 }} >
                <Text style={{ fontFamily: 'outfit', }} >Full Name</Text>
                <TextInput
                    placeholder='Enter Full Name'
                    style={style.input}
                    onChangeText={(value: string) => setName(value)}
                />
            </View>
            {/* Email */}
            <View style={{ marginTop: 20 }} >
                <Text style={{ fontFamily: 'outfit', }} >Email</Text>
                <TextInput
                    placeholder='Enter Email'
                    style={style.input}
                    onChangeText={(value: string) => setEmail(value)}
                />
            </View>
            {/* Password */}
            <View style={{ marginTop: 20 }} >
                <Text style={{ fontFamily: 'outfit', }} >Password</Text>
                <TextInput
                    secureTextEntry={true}
                    placeholder='Enter Password'
                    style={style.input}
                    onChangeText={(value: string) => setPassword(value)}
                />
            </View>

            {/* Sign In Button */}
            <TouchableOpacity onPress={onCreateAccount} style={{ padding: 15, backgroundColor: Colors.PRIMARY, borderRadius: 15, marginTop: 45, }} >
                <Text style={{ fontFamily: 'outfit-bold', color: Colors.WHITE, textAlign: 'center' }} >Create Account</Text>
            </TouchableOpacity>

            {/* Create Account Button */}
            <TouchableOpacity onPress={() => router.replace('auth/sign-in')} style={{ padding: 15, borderWidth: 1, borderColor: Colors.PRIMARY, backgroundColor: Colors.WHITE, borderRadius: 15, marginTop: 25, }} >
                <Text style={{ fontFamily: 'outfit-bold', color: Colors.PRIMARY, textAlign: 'center' }} >Sign In</Text>
            </TouchableOpacity>


        </View>
    )
}

export default SignUp

const style = StyleSheet.create({
    input: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.GRAY,
        fontFamily: 'outfit',

    }
})