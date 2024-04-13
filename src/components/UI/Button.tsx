import { TouchableRipple } from 'react-native-paper'
import MyText, { MyTextProps } from './MyText'
import { StyleProp, TextStyle, View } from 'react-native'
import { useTheme } from '../../containers/ThemeContext'
import color from '../../theme'

type ButtonProps = {
    children: React.ReactNode
    style?: StyleProp<TextStyle>
    textProps?: MyTextProps
    onPress: () => void
}

const Button: React.FC<ButtonProps> = ({
    children,
    style,
    textProps,
    onPress,
}) => {
    const { theme } = useTheme()

    const intialStyles = {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'center',
        paddingHorizontal: 15,
        backgroundColor: color[theme].button.bg,
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
            <MyText center {...textProps}>
                {children}
            </MyText>
        </TouchableRipple>
    )
}

export default Button
