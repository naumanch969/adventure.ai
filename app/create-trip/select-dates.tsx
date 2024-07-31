import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import CalendarPicker from 'react-native-calendar-picker'
import moment from 'moment'
import { useStateContext } from '@/context/useStateContext'

const SelectDates = () => {

    const navigation = useNavigation()
    const router = useRouter()
    const { tripData, setTripData } = useStateContext()

    const [startDate, setStartDate] = useState<any>('')
    const [endDate, setEndDate] = useState<any>('')

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })
    }, [])

    const onDateChange = (date: any, type: any) => {
        if (type == 'START_DATE') {
            setStartDate(moment(date))
        }
        else {
            setEndDate(moment(date))
        }
    }

    const onDateSelection = () => {
        if (!startDate) return ToastAndroid.show('Please select start date', ToastAndroid.LONG)
        if (!endDate) return ToastAndroid.show('Please select end date', ToastAndroid.LONG)

        const totalNoOfDays = endDate.diff(startDate, 'days')

        setTripData((pre: any) => ({
            ...pre,
            startDate: startDate?.toDate(),
            endDate: endDate?.toDate(),
            totalNoOfDays: totalNoOfDays + 1
        }))

        router.push('/create-trip/select-budget')

    }

    return (
        <View style={{ padding: 25, paddingTop: 75, backgroundColor: Colors.WHITE, height: '100%' }} >
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 35, marginTop: 20 }} >Travel Dates</Text>

            <View style={{ marginTop: 30 }} >
                <CalendarPicker
                    onDateChange={onDateChange}
                    allowRangeSelection={true}
                    minDate={new Date()}
                    maxRangeDuration={7}
                    selectedRangeStyle={{ backgroundColor: Colors.PRIMARY }}
                    selectedDayTextStyle={{ color: Colors.WHITE }}
                />
            </View>

            <TouchableOpacity onPress={onDateSelection} style={{ padding: 15, backgroundColor: Colors.PRIMARY, borderRadius: 15, marginTop: 20 }} >
                <Text style={{ color: Colors.WHITE, textAlign: 'center', fontSize: 20, fontFamily: 'outfit' }} >Continue</Text>
            </TouchableOpacity>

        </View>
    )
}

export default SelectDates