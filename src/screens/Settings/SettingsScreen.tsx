import Button from '../../components/UI/Button'
import MyText from '../../components/UI/MyText'
import Icon from 'react-native-vector-icons/Ionicons'
import { View, Text, ScrollView, Image } from 'react-native'
import { useState } from 'react'
import { ScreenT } from '../../types/ScreenT'
import { TouchableRipple } from 'react-native-paper'
import { useBottomSheet } from '../../containers/BottomSheetContext'

type SettingsItemProps = {
    title: string
    value?: any
    first?: boolean
    end?: boolean
    isActive?: boolean
    onPress?: () => void
}

const SettingsItem = ({
    title,
    value,
    first,
    end,
    isActive,
    onPress,
}: SettingsItemProps) => (
    <TouchableRipple onPress={onPress}>
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 15,
                paddingHorizontal: 15,
                backgroundColor: '#fff',
                borderTopRightRadius: first && 10,
                borderTopLeftRadius: first && 10,
                borderBottomLeftRadius: end && 10,
                borderBottomRightRadius: end && 10,
            }}
        >
            <MyText fontWeight={500} size={18}>
                {title}
            </MyText>
            <MyText size={18}>
                {isActive ? <Icon name="checkmark" size={22} /> : value}
            </MyText>
        </View>
    </TouchableRipple>
)

const SettingsScreen: React.FC<ScreenT> = ({ navigation }) => {
    const [theme, setTheme] = useState<string>('system')

    const { openBottomSheet } = useBottomSheet()

    return (
        <ScrollView
            style={{
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 10,
                backgroundColor: '#f2f2f2',
            }}
        >
            <MyText
                fontWeight={500}
                size={16}
                style={{ marginTop: 20, paddingHorizontal: 10 }}
            >
                Тема
            </MyText>
            <View style={{ marginTop: 10 }}>
                <SettingsItem
                    first
                    title="Системная"
                    isActive={theme === 'system'}
                    onPress={() => setTheme('system')}
                />
                <SettingsItem
                    title="Светлая"
                    isActive={theme === 'light'}
                    onPress={() => setTheme('light')}
                />
                <SettingsItem
                    end
                    title="Темная"
                    isActive={theme === 'dark'}
                    onPress={() => setTheme('dark')}
                />
            </View>
            <MyText
                fontWeight={500}
                size={16}
                style={{ marginTop: 50, paddingHorizontal: 10 }}
            >
                О приложении
            </MyText>
            <View style={{ marginTop: 10 }}>
                <SettingsItem title="Версия" value="0.0.1" first />
                <SettingsItem title="Движок" value="React Native Expo" />
                <SettingsItem title="Авторы" value="NineSirius" end />
                {/* <SettingsItem title="ввы" value="dsds" end /> */}
            </View>
        </ScrollView>
    )
}

export default SettingsScreen
