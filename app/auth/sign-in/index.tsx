import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/configs/firebase'

const SignIn = () => {

    const navigation = useNavigation()
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    useEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [])

    const onSignin = () => {

        if (!email) return ToastAndroid.show('Email is required', ToastAndroid.BOTTOM)
        if (!password) return ToastAndroid.show('Password is required', ToastAndroid.BOTTOM)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                router.push('/mytrip')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                ToastAndroid.show('Invalid Credentials', ToastAndroid.BOTTOM)
            });

    }

    return (
        <View style={{ padding: 25, paddingTop: 55, backgroundColor: Colors.WHITE, height: '100%' }} >

            <TouchableOpacity onPress={() => router.back()} >
                <Ionicons name='arrow-back' size={24} color='black' />
            </TouchableOpacity>

            <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, }} >Let's Sign You In</Text>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, color: Colors.GRAY, marginTop: 20 }} >Welcome Back</Text>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 25, color: Colors.GRAY, marginTop: 10 }} >You've been missed</Text>

            {/* Email */}
            <View style={{ marginTop: 40 }} >
                <Text style={{ fontFamily: 'outfit', }} >Email</Text>
                <TextInput
                    placeholder='Enter Email'
                    style={style.input}
                    onChangeText={value => setEmail(value)}
                />
            </View>
            {/* Password */}
            <View style={{ marginTop: 20 }} >
                <Text style={{ fontFamily: 'outfit', }} >Password</Text>
                <TextInput
                    secureTextEntry={true}
                    placeholder='Enter Password'
                    style={style.input}
                    onChangeText={value => setpassword(value)}
                />
            </View>

            {/* Sign In Button */}
            <TouchableOpacity onPress={onSignin} style={{ padding: 15, backgroundColor: Colors.PRIMARY, borderRadius: 15, marginTop: 45, }} >
                <Text style={{ fontFamily: 'outfit-bold', color: Colors.WHITE, textAlign: 'center' }} >Sign In</Text>
            </TouchableOpacity>

            {/* Create Account Button */}
            <TouchableOpacity onPress={() => router.replace('auth/sign-up')} style={{ padding: 15, borderWidth: 1, borderColor: Colors.PRIMARY, backgroundColor: Colors.WHITE, borderRadius: 15, marginTop: 25, }} >
                <Text style={{ fontFamily: 'outfit-bold', color: Colors.PRIMARY, textAlign: 'center' }} >Create Account</Text>
            </TouchableOpacity>

        </View>
    )
}

export default SignIn

const style = StyleSheet.create({
    input: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.GRAY,
        fontFamily: 'outfit',

    }
})