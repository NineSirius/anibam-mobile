import { StyleProp, Text, TextStyle } from 'react-native'
import { ThemeT } from '../../types/ThemeT'
import themeColor from '../../theme'
import { useTheme } from '../../containers/ThemeContext'
import Button from './Button'

export type MyTextProps = {
    children?: React.ReactNode
    numberOfLines?: number
    fontWeight?: 800 | 700 | 600 | 500 | 400
    size?: number
    lineHeight?: number
    color?: string
    style?: StyleProp<TextStyle>
}

const MyText: React.FC<MyTextProps> = ({
    children,
    numberOfLines,
    fontWeight,
    size,
    lineHeight,
    color,
    style,
}) => {
    const { theme, toggleTheme } = useTheme()

    const initialStyles: StyleProp<TextStyle> = {
        fontFamily: `Rubik-${fontWeight ? fontWeight : '400'}`,
        fontSize: size ? size : 16,
        lineHeight: lineHeight ? lineHeight : size ? size * 1.2 : 18,
        color: color ? color : themeColor[theme].text.color.primary,
    }

    //@ts-ignore
    const customStyles = style ? { ...style } : {}

    return (
        <Text
            style={{ ...initialStyles, ...customStyles }}
            numberOfLines={numberOfLines}
        >
            {children}
        </Text>
    )
}

export default MyText
