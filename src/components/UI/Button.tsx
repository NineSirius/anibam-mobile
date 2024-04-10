import { TouchableRipple } from 'react-native-paper'
import MyText from './MyText'
import { StyleProp, TextStyle, View } from 'react-native'

type ButtonProps = {
    children: React.ReactNode
    style?: StyleProp<TextStyle>
    onPress: () => void
}

const Button: React.FC<ButtonProps> = ({ children, style, onPress }) => {
    const intialStyles = {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        overflow: 'hidden',
    }

    const customStyles = style ? { ...style } : {}

    return (
        <TouchableRipple
            style={{ ...intialStyles, ...customStyles }}
            onPress={onPress}
            rippleColor="#cfcfcf"
        >
            <MyText center>{children}</MyText>
        </TouchableRipple>
    )
}

export default Button