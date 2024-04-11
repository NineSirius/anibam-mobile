import { View, Text } from 'react-native'
import React, { useState } from 'react'
import TextField from './UI/TextField'
import { TitleT } from '../types/TitleT'
import { getTitleBySearch } from '../api'
import MyText from './UI/MyText'
import { TouchableRipple } from 'react-native-paper'
import { useBottomSheet } from '../containers/BottomSheetContext'

const SearchBottomSheet = ({ navigation }) => {
    const [searchResults, setSearchResults] = useState<TitleT[]>([])
    const [searchTimeout, setSearchTimeout] = useState<any>(null)

    const { closeBottomSheet } = useBottomSheet()

    const fetchTitles = async (query: string) => {
        getTitleBySearch(query).then((resp) => setSearchResults(resp.data.list))
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <TextField
                placeholder="Введите название или описание"
                onChange={(value) => {
                    clearTimeout(searchTimeout)
                    const timeout = setTimeout(() => fetchTitles(value), 300)
                    setSearchTimeout(timeout)
                }}
            />

            <View>
                {searchResults.map((title) => (
                    <TouchableRipple
                        rippleColor="#cfcfcf"
                        onPress={() => {
                            closeBottomSheet()
                            navigation.navigate('Title', title)
                        }}
                    >
                        <View>
                            <MyText>{title.names.ru}</MyText>
                        </View>
                    </TouchableRipple>
                ))}
            </View>
        </View>
    )
}

export default SearchBottomSheet
