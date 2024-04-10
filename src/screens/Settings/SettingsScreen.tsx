import { View, Text, ScrollView } from 'react-native'
import Button from '../../components/UI/Button'
import { ScreenT } from '../../types/ScreenT'

const SettingsScreen: React.FC<ScreenT> = ({ navigation }) => {
    return (
        <ScrollView
            style={{ flex: 1, paddingVertical: 10, backgroundColor: '#fff' }}
        >
            <Button onPress={() => navigation.navigate('AboutScreen')}>
                О приложении
            </Button>
        </ScrollView>
    )
}

export default SettingsScreen
