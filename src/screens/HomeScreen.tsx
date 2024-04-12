import React, { useEffect, useState } from 'react'
import { View, ScrollView, Image, RefreshControl } from 'react-native'
import { ActivityIndicator, Text, TouchableRipple } from 'react-native-paper'
import { getTitlesBySeason, getTitlesUpdates } from '../api'
import MyText from '../components/UI/MyText'
import { ScreenT } from '../types/ScreenT'
import { format } from 'date-fns'

const HomeScreen: React.FC<ScreenT> = ({ navigation }) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [currentSeasonString, setCurrentSeasonString] = useState<
        null | string
    >(null)
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        getTitles()
    }, [])

    const getTitles = async (isRefresh?: boolean) => {
        if (isRefresh) {
            setRefreshing(true)
        }
        setLoading(true)

        const currentYear = format(new Date(), 'yyyy')
        const currentSeason = format(new Date(), 'Q')

        switch (currentSeason) {
            case '1':
                setCurrentSeasonString('зимнего')
                break
            case '2':
                setCurrentSeasonString('весеннего')
                break
            case '3':
                setCurrentSeasonString('летнего')
                break
            case '4':
                setCurrentSeasonString('осеннего')
                break
            default:
                break
        }

        await getTitlesBySeason(currentYear, currentSeason)
            .then((resp) => {
                setData(resp.data.list)
                console.log(resp.data)
            })
            .finally(() => {
                setLoading(false)
                setRefreshing(false)
            })
    }

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#fff' }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => getTitles(true)}
                />
            }
        >
            <MyText
                size={24}
                fontWeight={600}
                style={{ paddingVertical: 10, paddingHorizontal: 10 }}
            >
                Аниме {currentSeasonString} сезона
            </MyText>
            <View
                style={{
                    paddingVertical: 10,
                    justifyContent: 'center',
                }}
            >
                {loading ? (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                    <ScrollView horizontal>
                        {data.map((title) => {
                            return (
                                <TouchableRipple
                                    onPress={() =>
                                        navigation.navigate('Title', title)
                                    }
                                    key={title.id}
                                >
                                    <View
                                        style={{
                                            width: 200,
                                            paddingHorizontal: 10,
                                        }}
                                    >
                                        <Image
                                            source={{
                                                uri: `https://anilibria.tv${title.posters.medium.url}`,
                                            }}
                                            style={{
                                                height: 270,
                                                width: '100%',
                                                borderRadius: 10,
                                            }}
                                        />
                                        <MyText
                                            fontWeight={600}
                                            size={18}
                                            numberOfLines={2}
                                            style={{ marginTop: 10 }}
                                        >
                                            {title.names.ru}
                                        </MyText>
                                    </View>
                                </TouchableRipple>
                            )
                        })}
                    </ScrollView>
                )}
            </View>
        </ScrollView>
    )
}

export default HomeScreen
