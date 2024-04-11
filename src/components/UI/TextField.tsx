import {
    View,
    Text,
    TextInput,
    NativeSyntheticEvent,
    TextInputChangeEventData,
} from 'react-native'
import React from 'react'

type TextFieldProps = {
    type?: 'password' | 'text'
    placeholder?: string
    onChange: (text: string) => void
}

const TextField: React.FC<TextFieldProps> = ({
    type,
    placeholder,
    onChange,
}) => {
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
                style={{ fontFamily: 'Rubik-400' }}
                placeholder={placeholder}
                onChangeText={(text) => onChange(text)}
            />
        </View>
    )
}

export default TextField
