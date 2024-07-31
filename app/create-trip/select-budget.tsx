import { View, Text, TouchableOpacity, ToastAndroid, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useStateContext } from '@/context/useStateContext'
import { OptionCard } from '@/components'
import { TripData } from '@/interfaces'

const SelectBudget = () => {

    const navigation = useNavigation()
    const router = useRouter()
    const { setTripData } = useStateContext()
    const options = [
        { title: 'Cheap', description: 'Stay conscious of costs', icon: '🏷️' },
        { title: 'Moderate', description: 'Keep cost on average spending', icon: '💵' },
        { title: 'Expensive', description: 'Dont worry about cost', icon: '💎' },
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
        setTripData((pre: TripData) => ({
            ...pre,
            budget: options.find((item) => item.title == selected.title)
        }))
    }, [selected])

    const onContinue = () => {
        if (!selected) {
            ToastAndroid.show('Please select a budget option', ToastAndroid.SHORT)
            return
        }
        router.push('/create-trip/review-trip')
    }

    return (
        <View style={{ padding: 25, paddingTop: 75, backgroundColor: Colors.WHITE, height: '100%' }} >
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 35, marginTop: 20 }} >Budget</Text>

            <View style={{ marginTop: 20 }} >
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, color: Colors.GRAY }} >Choose spending habits for your trip</Text>
            </View>

            <FlatList
                data={options}
                renderItem={({ item, index }) => (
                    <TouchableOpacity key={index} onPress={() => setSelected(item)} style={{ marginVertical: 10 }}>
                        <OptionCard option={item} isSelected={selected.title == item.title} />
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity onPress={onContinue} style={{ padding: 15, backgroundColor: Colors.PRIMARY, borderRadius: 15, marginTop: 20 }} >
                <Text style={{ color: Colors.WHITE, textAlign: 'center', fontSize: 20, fontFamily: 'outfit' }} >Continue</Text>
            </TouchableOpacity>

        </View>
    )
}

export default SelectBudget