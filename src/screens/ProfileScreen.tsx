import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import MyText from '../components/UI/MyText'
import Button from '../components/UI/Button'
import { Alert, View } from 'react-native'
import color from '../theme'
import { useTheme } from '../containers/ThemeContext'

const ProfileScreen = () => {
    const { theme } = useTheme()

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: color[theme].bg,
            }}
        >
            <MyText fontWeight={600} size={20}>
                Вы не авторизованы
            </MyText>
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    marginTop: 10,
                }}
            >
                <Button
                    onPress={() => Alert.alert('Сообщение', 'В разработке')}
                >
                    Авторизоваться
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen
