import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { BottomNavigation, IconButton, Text } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import HomeScreen from './src/screens/HomeScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import TitleScreen from './src/screens/TitleScreen'
import Settings, { settings } from './src/screens/Settings'
import SettingsScreen from './src/screens/Settings/SettingsScreen'
import { BottomSheetProvider } from './src/containers/BottomSheetContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Stack = createStackNavigator()

const Home = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerTitle: 'AniBam' }}
                />
                <Stack.Screen
                    name="Title"
                    component={TitleScreen}
                    options={({ route }: { route: any }) => ({
                        title: route.params ? route.params.names.ru : 'Аниме',
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Profile = () => {
    return (
        <NavigationContainer>
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

export default function App() {
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

    const renderScene = BottomNavigation.SceneMap({
        home: Home,
        profile: Profile,
    })

    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetProvider>
                    <BottomNavigation
                        navigationState={{ index, routes }}
                        onIndexChange={setIndex}
                        renderScene={renderScene}
                        sceneAnimationEnabled
                        sceneAnimationType="shifting"
                        barStyle={{
                            backgroundColor: '#fff',
                            borderTopColor: '#d6d6d6',
                            borderTopWidth: 0.5,
                        }}
                    />
                </BottomSheetProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    )
}
