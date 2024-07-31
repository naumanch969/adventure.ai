import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

const Login = () => {

    const router = useRouter()

    return (
        <View>
            <Image
                source={require('@/assets/images/login.jpg')}
                style={{ width: '100%', height: 450 }}
            />
            <View style={{ height: '100%', backgroundColor: Colors.WHITE, marginTop: -20, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25 }} >
                <Text style={{ fontSize: 25, fontFamily: 'outfit-bold', textAlign: 'center' }} >AI Travel Planner</Text>
                <Text style={{ textAlign: 'center', fontFamily: 'outfit', fontSize: 15, color: Colors.GRAY, marginTop: 1 }} >Discover your next adventure effortlessly. Personalized experience at your fingertips. Travel smarter with AI-driven insights.</Text>

                <TouchableOpacity onPress={() => router.push('auth/sign-in')} style={{ padding: 15, backgroundColor: Colors.PRIMARY, borderRadius: 99, marginTop: '16%' }} >
                    <Text style={{ color: Colors.WHITE, textAlign: 'center', fontFamily: 'outfit', fontSize: 17 }} >Get Started</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Login

