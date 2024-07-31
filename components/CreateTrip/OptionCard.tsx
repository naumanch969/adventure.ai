import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

const OptionCard = ({ option, isSelected }: { option: { title: string, description: string, icon: string, people?: string }, isSelected: boolean }) => {



  return (
    <View style={[{
      padding: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Colors.LIGHT_GRAY,
      borderRadius: 15
    }, isSelected && {
      borderWidth: 3
    }]} >

      <View style={{}} >
        <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }} >{option.title}</Text>
        <Text style={{ fontSize: 16, fontFamily: 'outfit', color: Colors.GRAY }} >{option.description}</Text>
      </View>
      <Text style={{ fontSize: 24, }} >{option.icon}</Text>

    </View>
  )
}

export default OptionCard