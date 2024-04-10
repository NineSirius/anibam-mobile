import { StyleProp, Text, TextStyle } from 'react-native'

type MyTextProps = {
    children: React.ReactNode
    numberOfLines?: number
    fontWeight?: 800 | 700 | 600 | 500 | 400
    size?: number
    lineHeight?: number
    center?: boolean
    color?: string
    style?: StyleProp<TextStyle>
}

const MyText: React.FC<MyTextProps> = ({
    children,
    numberOfLines,
    fontWeight,
    size,
    lineHeight,
    center,
    color,
    style,
}) => {
    const initialStyles: StyleProp<TextStyle> = {
        fontFamily: `Rubik-${fontWeight ? fontWeight : '400'}`,
        fontSize: size ? size : 16,
        textAlign: center ? 'center' : 'auto',
        lineHeight: lineHeight ? lineHeight : size ? size * 1.2 : 18,
        color: color ? color : '#111',
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
