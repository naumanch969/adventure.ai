import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { OptionCard } from '@/components'
import { useStateContext } from '@/context/useStateContext'

const SelectTraveller = () => {

    const navigation = useNavigation()
    const router = useRouter()
    const { setTripData } = useStateContext()
    const options = [
        { title: 'Just Me', description: 'A sole traveles in exploration', icon: '🙋', people: '1 Person' },
        { title: 'A Couple', description: 'Two traveles in tandem ', icon: '💑', people: '2 People' },
        { title: 'Family', description: 'A group of fun loving adventure', icon: '👨‍👩‍👧‍👦', people: '3 to 5 People' },
        { title: 'Friends', description: 'A bunch of thrill-seekes', icon: '👫', people: '5 to 10 People' },
    ]

    const [selected, setSelected] = useState(options[0])

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })
    }, [])

    useEffect(() => {
        setTripData((pre: any) => ({
            ...pre,
            traveller: options.find((item) => item.title == selected.title)
        }))
    }, [selected])

    return (
        <ScrollView contentContainerStyle={{ padding: 25, paddingTop: 75, backgroundColor: Colors.WHITE, }} >
            <Text style={{ fontSize: 30, fontFamily: 'outfit-bold', marginTop: 20 }} >Who's Travelling</Text>

            <View style={{ marginTop: 20 }} >
                <Text style={{ fontSize: 22, fontFamily: 'outfit-bold', color: Colors.GRAY }} >Choose your travellers</Text>

                <FlatList
                    data={options}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={index} onPress={() => setSelected(item)} style={{ marginVertical: 10 }}>
                            <OptionCard option={item} isSelected={selected.title == item.title} />
                        </TouchableOpacity>
                    )}
                />

            </View>

            <TouchableOpacity onPress={() => router.push('/create-trip/select-dates')} style={{ padding: 15, backgroundColor: Colors.PRIMARY, borderRadius: 15, marginTop: 20 }} >
                <Text style={{ color: Colors.WHITE, textAlign: 'center', fontSize: 20, fontFamily: 'outfit' }} >Continue</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

export default SelectTraveller