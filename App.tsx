import { useCallback, useEffect, useState } from 'react'
import { BottomNavigation, IconButton, Text } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
    NavigationContainer,
    DefaultTheme,
    ThemeProvider,
    DarkTheme,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import HomeScreen from './src/screens/HomeScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import TitleScreen from './src/screens/TitleScreen'
import { settings } from './src/screens/Settings'
import SettingsScreen from './src/screens/Settings/SettingsScreen'
import { AppThemeProvider, useTheme } from './src/containers/ThemeContext'
import {
    BottomSheetProvider,
    useBottomSheet,
} from './src/containers/BottomSheetContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import SearchScreen from './src/screens/SearchScreen'
import SearchBottomSheet from './src/components/SearchBottomSheet'
import WatchScreen from './src/screens/WatchScreen'
import * as SplashScreen from 'expo-splash-screen'
import { Provider, useSelector } from 'react-redux'
import { store } from './src/store'
import colors from './src/theme'

const Stack = createStackNavigator()

const Home = () => {
    const { openBottomSheet } = useBottomSheet()
    const { theme } = useTheme()

    return (
        <NavigationContainer
            theme={theme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={({ navigation }) => ({
                        headerTitle: 'AniBam',
                        headerRight: () => (
                            <IconButton
                                onPress={() =>
                                    openBottomSheet(
                                        <SearchBottomSheet
                                            navigation={navigation}
                                        />,
                                    )
                                }
                                icon="magnify"
                            />
                        ),
                    })}
                />
                <Stack.Screen
                    name="Title"
                    component={TitleScreen}
                    options={({ route }: { route: any }) => ({
                        title: route.params ? route.params.names.ru : 'Аниме',
                    })}
                />
                <Stack.Screen
                    name="Watch"
                    component={WatchScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{ headerTitle: 'Поиск' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Profile = () => {
    const { theme } = useTheme()

    return (
        <NavigationContainer
            theme={theme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <Stack.Navigator>
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={({ navigation }) => ({
                        headerTitle: 'Профиль',
                        headerRight: () => (
                            <IconButton
                                icon="cog"
                                onPress={() => navigation.navigate('Settings')}
                            />
                        ),
                    })}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{ headerTitle: 'Настройки' }}
                />
                {settings.map((item) => (
                    <Stack.Screen
                        navigationKey={item.name}
                        key={item.name}
                        name={item.name}
                        component={item.component}
                        options={item.options}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const App = () => {
    const visible = useSelector((store) => store.home.isBottomBar)

    const [appIsReady, setAppIsReady] = useState(false)
    const { theme } = useTheme()

    const [fontsLoaded, fontError] = useFonts({
        'Rubik-800': require('./assets/fonts/Rubik/Rubik-Black.ttf'),
        'Rubik-700': require('./assets/fonts/Rubik/Rubik-Bold.ttf'),
        'Rubik-600': require('./assets/fonts/Rubik/Rubik-SemiBold.ttf'),
        'Rubik-500': require('./assets/fonts/Rubik/Rubik-Medium.ttf'),
        'Rubik-400': require('./assets/fonts/Rubik/Rubik-Regular.ttf'),
    })

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        {
            key: 'home',
            title: 'Главная',
            focusedIcon: 'home',
            unfocusedIcon: 'home-outline',
        },
        {
            key: 'profile',
            title: 'Профиль',
            focusedIcon: 'account-circle',
            unfocusedIcon: 'account-circle-outline',
        },
    ])

    useEffect(() => {
        if (fontsLoaded) {
            setAppIsReady(true)
        }
    })

    const renderScene = BottomNavigation.SceneMap({
        home: Home,
        profile: Profile,
    })

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync()
        }
    }, [appIsReady])

    if (!appIsReady) {
        return null
    }

    return (
        <SafeAreaProvider onLayout={onLayoutRootView}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetProvider>
                    <BottomNavigation
                        navigationState={{ index, routes }}
                        onIndexChange={setIndex}
                        renderScene={renderScene}
                        // sceneAnimationEnabled
                        // sceneAnimationType="shifting"
                        barStyle={{
                            display: !visible ? 'none' : 'flex',
                            backgroundColor: colors[theme].bottomBar.bg,
                            borderTopColor: colors[theme].border.color,
                            borderTopWidth: 0.5,
                        }}
                        activeIndicatorStyle={{
                            backgroundColor:
                                colors[theme].bottomBar.activeColor,
                        }}
                    />
                </BottomSheetProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    )
}

export default function Main() {
    return (
        <AppThemeProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </AppThemeProvider>
    )
}
