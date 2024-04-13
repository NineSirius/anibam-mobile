import React, { useState, useEffect, createContext, useContext } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as SystemUI from 'expo-system-ui'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface ThemeContextType {
    theme: 'light' | 'dark'
    toggleTheme: (theme: 'light' | 'dark') => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [theme, setTheme] = useState<ThemeContextType['theme']>('light')

    useEffect(() => {
        SplashScreen.hideAsync()
    }, [])

    const toggleTheme = (theme: 'light' | 'dark') => {
        setTheme(theme)
    }

    const getData = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {
                return value
            }
        } catch (e) {}
    }

    useEffect(() => {
        getData('theme').then((resp) => {
            console.log(resp)
            if (resp === 'light' || resp === 'dark') {
                setTheme(resp)
            }
        })
    }, [])

    useEffect(() => {
        if (theme === 'light') {
            SystemUI.setBackgroundColorAsync('light')
        } else {
            SystemUI.setBackgroundColorAsync('dark')
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
