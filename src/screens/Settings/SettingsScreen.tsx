import Button from '../../components/UI/Button'
import MyText from '../../components/UI/MyText'
import Icon from 'react-native-vector-icons/Ionicons'
import { View, Text, ScrollView, Image, useColorScheme } from 'react-native'
import { useEffect, useState } from 'react'
import { ScreenT } from '../../types/ScreenT'
import { TouchableRipple } from 'react-native-paper'
import { useBottomSheet } from '../../containers/BottomSheetContext'
import { useTheme } from '../../containers/ThemeContext'
import color from '../../theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Application from 'expo-application'
import * as Updates from 'expo-updates'

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
}: SettingsItemProps) => {
    const { theme } = useTheme()

    return (
        <TouchableRipple onPress={onPress}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    backgroundColor: color[theme].secondary_bg,
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
}

const SettingsScreen: React.FC<ScreenT> = ({ navigation }) => {
    const { theme, toggleTheme } = useTheme()
    const [settings, setSettings] = useState<any>(null)

    const { openBottomSheet } = useBottomSheet()

    const storeData = async (key: string, value: any) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {}
    }

    const getData = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {
                return value
            }
        } catch (e) {}
    }

    async function onFetchUpdateAsync() {
        try {
            const update = await Updates.checkForUpdateAsync()

            if (update.isAvailable) {
                await Updates.fetchUpdateAsync()
                await Updates.reloadAsync()
            } else {
                alert('you use last app version')
            }
        } catch (error) {
            alert(`Error fetching latest Expo update: ${error}`)
        }
    }

    return (
        <ScrollView
            style={{
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 10,
                backgroundColor: color[theme].bg,
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
                    title="Светлая"
                    isActive={theme === 'light'}
                    onPress={() => {
                        toggleTheme('light')
                        storeData('theme', 'light')
                    }}
                    first
                />
                <SettingsItem
                    end
                    title="Темная"
                    isActive={theme === 'dark'}
                    onPress={() => {
                        toggleTheme('dark')
                        storeData('theme', 'dark')
                    }}
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
                <SettingsItem
                    title="Версия"
                    value={Application.nativeApplicationVersion}
                    first
                    onPress={() => onFetchUpdateAsync()}
                />
                <SettingsItem title="Движок" value="React Native Expo" />
                <SettingsItem title="Авторы" value="NineSirius" end />
                {/* <SettingsItem title="ввы" value="dsds" end /> */}
            </View>
        </ScrollView>
    )
}

export default SettingsScreen
