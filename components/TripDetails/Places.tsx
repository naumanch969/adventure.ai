import { View, Text } from 'react-native'
import React from 'react'
import Place from './Place'
import { Place as TPlace } from '@/interfaces'

const Places = ({ places }: { places: TPlace[] }) => {


    return (
        <View style={{ marginTop: 20 }} >
            <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }} >📍 TripPlan</Text>

            {
                places.map((place, index) => (
                    <Place place={place} key={index} />
                ))
            }

        </View>
    )
}

export default Places