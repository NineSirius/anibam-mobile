import { StackNavigationOptions } from '@react-navigation/stack'
import SettingsScreen from './SettingsScreen'
import About from './About'

type SettingsT = {
    name: string
    category: string | null
    component: any
    options?: StackNavigationOptions
}

export const settings: SettingsT[] = [
    {
        name: 'SettingsScreen',
        category: null,
        component: SettingsScreen,
        options: {
            headerTitle: 'Настройки',
        },
    },
    {
        name: 'AboutScreen',
        category: 'other',
        component: About,
    },
]
