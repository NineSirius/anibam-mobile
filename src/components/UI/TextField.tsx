import { View, TextInput, StyleProp, TextStyle } from 'react-native'
import React from 'react'

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
    const customInputStyles = inputStyle ? { ...inputStyle } : {}

    return (
        <View
            style={{
                borderColor: '#ccc',
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
            }}
        >
            <TextInput
                style={{
                    fontFamily: `Rubik-${fontWeight ? fontWeight : 400}`,
                    ...customInputStyles,
                }}
                placeholder={placeholder}
                onChangeText={(text) => onChange(text)}
            />
        </View>
    )
}

export default TextField
