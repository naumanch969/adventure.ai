import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Flight } from '@/interfaces'
import { Link } from 'expo-router'

const FlightInfo = ({ flight }: { flight: Flight }) => {
    return (
        <View style={{ marginTop: 20, borderWidth: 1, borderColor: Colors.LIGHT_GRAY, padding: 10, borderRadius: 15 }} >

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }} >✈️ Flights</Text>
                <Link href={flight?.details?.bookingUrl || ""} style={{ backgroundColor: Colors.PRIMARY, padding: 5, width: 100, borderRadius: 7, marginTop: 7 }} >
                    <Text style={{ textAlign: 'center', color: Colors.WHITE, fontFamily: 'outfit', }} >Book Here</Text>
                </Link>
            </View>
            <Text style={{ fontFamily: 'outfit', fontSize: 16, marginTop: 7 }} >Airline: {flight?.details?.departure}</Text>
            <Text style={{ fontFamily: 'outfit', fontSize: 16, marginTop: 7 }} >Price: {flight?.price}</Text>

        </View>
    )
}

export default FlightInfo