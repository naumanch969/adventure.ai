import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import { getPhotoRef } from '@/services/GooglePlaceApi'
import Hotel from './Hotel'
import { Hotel as THotel } from '@/interfaces'

const HotelList = ({ hotels }: { hotels: THotel[] }) => {


    return (
        <View style={{ marginTop: 20 }} >
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }} >🏨 Hotel Recommendation</Text>

            <FlatList
                data={hotels}
                style={{ marginTop: 8 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <Hotel item={item} key={index} />
                )}
            />

        </View>
    )
}

export default HotelList