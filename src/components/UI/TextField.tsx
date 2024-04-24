import { View, TextInput, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { useTheme } from '../../containers/ThemeContext'
import colors from '../../theme'

type TextFieldProps = {
    type?: 'password' | 'text'
    fontWeight?: 400 | 500 | 600 | 700 | 800
    placeholder?: string
    inputStyle?: StyleProp<TextStyle>
    onChange: (text: string) => void
}

const TextField: React.FC<TextFieldProps> = ({
    type,
    fontWeight,
    inputStyle,
    placeholder,
    onChange,
}) => {
    const { theme } = useTheme()
    const customInputStyles = inputStyle ? { ...inputStyle } : {}

    return (
        <View
            style={{
                borderColor: colors[theme].border.color,
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                backgroundColor: colors[theme].secondary_bg,
            }}
        >
            <TextInput
                style={{
                    fontFamily: `Rubik-${fontWeight ? fontWeight : 400}`,
                    color: colors[theme].text.color.input,
                    ...customInputStyles,
                }}
                placeholderTextColor={colors[theme].text.color.input}
                placeholder={placeholder}
                onChangeText={(text) => onChange(text)}
            />
        </View>
    )
}

export default TextField
