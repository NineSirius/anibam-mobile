import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

export const Loader = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
            }}
        >
            <ActivityIndicator size="large" />
        </View>
    )
}
