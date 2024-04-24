import { View, Text } from 'react-native'
import React, { useState } from 'react'
import TextField from './UI/TextField'
import { TitleT } from '../types/TitleT'
import { getTitleBySearch } from '../api'
import MyText from './UI/MyText'
import { TouchableRipple } from 'react-native-paper'
import { useBottomSheet } from '../containers/BottomSheetContext'
import Button from './UI/Button'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { Loader } from '../containers/Loader'
import SearchCard from './SearchCard'

const SearchBottomSheet = ({ navigation }) => {
    const [searchResults, setSearchResults] = useState<TitleT[]>([])
    const [searchTimeout, setSearchTimeout] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const { closeBottomSheet } = useBottomSheet()

    const fetchTitles = async (query: string) => {
        setLoading(true)
        getTitleBySearch(query)
            .then((resp) => setSearchResults(resp.data.list))
            .finally(() => setLoading(false))
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <TextField
                inputStyle={{ fontSize: 16 }}
                placeholder="Введите название или описание"
                onChange={(value) => {
                    clearTimeout(searchTimeout)
                    const timeout = setTimeout(() => fetchTitles(value), 500)
                    setSearchTimeout(timeout)
                }}
            />

            {loading ? (
                <Loader />
            ) : (
                <BottomSheetScrollView style={{ marginTop: 15, gap: 10 }}>
                    {searchResults.map((title) => (
                        <SearchCard
                            key={title.id}
                            title={title.names.ru}
                            desc={title.description}
                            poster={`https://anilibria.tv${title.posters.small.url}`}
                            type={title.type.string}
                            episodesCount={title.player.episodes.last}
                            onPress={() => {
                                closeBottomSheet()
                                navigation.navigate('Title', title)
                            }}
                        />
                    ))}
                </BottomSheetScrollView>
            )}
        </View>
    )
}

export default SearchBottomSheet
