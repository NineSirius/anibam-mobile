import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useTheme } from './ThemeContext'
import colors from '../theme'

export const Loader = () => {
    const { theme } = useTheme()

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors[theme].bg,
            }}
        >
            <ActivityIndicator size="large" color={colors[theme].primary} />
        </View>
    )
}
