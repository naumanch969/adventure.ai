import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '@/constants/Colors'
import { useNavigation, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useStateContext } from '@/context/useStateContext'
import moment from 'moment'

const ReviewTrip = () => {

    const navigation = useNavigation()
    const router = useRouter()
    const { tripData } = useStateContext()

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })
    }, [])

    const onContinue = () => {
        router.replace('/create-trip/generate-trip')
    }
    return (
        <View style={{ padding: 25, paddingTop: 75, backgroundColor: Colors.WHITE, height: '100%' }} >

            <Text style={{ fontFamily: 'outfit-bold', fontSize: 35, marginTop: 20 }} >Review your trip</Text>

            <View style={{ marginTop: 20 }} >
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, color: Colors.GRAY }} >Before generating your trip, please review your selection</Text>
            </View>

            {/* Destination */}
            <View style={{ marginTop: 40, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }} >
                <Text style={{ fontSize: 24 }} >🌍</Text>
                <View>
                    <Text style={{ fontFamily: 'outfit', fontSize: 20, color: Colors.GRAY }} >Destination</Text>
                    <Text style={{ fontFamily: 'outfit', fontSize: 20 }} >{tripData?.locationInfo?.name}</Text>
                </View>
            </View>

            {/* Date */}
            <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }} >
                <Text style={{ fontSize: 24 }} >📅</Text>
                <View>
                    <Text style={{ fontFamily: 'outfit', fontSize: 20, color: Colors.GRAY }} >Travel Date</Text>
                    <Text style={{ fontFamily: 'outfit', fontSize: 20 }} >{moment(tripData?.startDate).format('DD MMM')}-{moment(tripData?.endDate).format('DD MMM')} ({tripData?.totalNoOfDays} days) </Text>
                </View>
            </View>

            {/* Traveller */}
            <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }} >
                <Text style={{ fontSize: 24 }} >👥</Text>
                <View>
                    <Text style={{ fontFamily: 'outfit', fontSize: 20, color: Colors.GRAY }} >Who is Travelling</Text>
                    <Text style={{ fontFamily: 'outfit', fontSize: 20 }} >{tripData?.traveller?.title}</Text>
                </View>
            </View>

            {/* Budget */}
            <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }} >
                <Text style={{ fontSize: 24 }} >💵</Text>
                <View>
                    <Text style={{ fontFamily: 'outfit', fontSize: 20, color: Colors.GRAY }} >Budget</Text>
                    <Text style={{ fontFamily: 'outfit', fontSize: 20 }} >{tripData?.budget?.title}</Text>
                </View>
            </View>

            {/* Continue */}
            <TouchableOpacity onPress={onContinue} style={{ padding: 15, backgroundColor: Colors.PRIMARY, borderRadius: 15, marginTop: 20 }} >
                <Text style={{ color: Colors.WHITE, textAlign: 'center', fontSize: 20, fontFamily: 'outfit' }} >Build My Trip</Text>
            </TouchableOpacity>

        </View>
    )
}

export default ReviewTrip