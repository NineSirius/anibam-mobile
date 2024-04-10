import React, { useEffect, useState } from 'react'
import { ScreenT } from '../types/ScreenT'
import {
    View,
    Text,
    ScrollView,
    Image,
    Alert,
    ImageBackground,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { getTitleByCode } from '../api'
import { Loader } from '../containers/Loader'
import NotFound from '../containers/NotFound'
import MyText from '../components/UI/MyText'
import Button from '../components/UI/Button'
import { TitleT } from '../types/TitleT'
import {
    RefreshControl,
    TouchableWithoutFeedback,
} from 'react-native-gesture-handler'

const TitleScreen: React.FC<ScreenT> = ({ navigation, route }) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [titleInfo, setTitleInfo] = useState<TitleT | null>(null)

    useEffect(() => {
        getTitle()
    }, [])

    const getTitle = async (isRefresh?: boolean) => {
        if (isRefresh) {
            setRefreshing(true)
        }
        setLoading(true)
        getTitleByCode(route.params.code)
            .then((resp) => {
                const title = resp.data

                const format = {
                    label: 'Формат',
                    value: title.type.string,
                }
                const release_date = {
                    label: 'Дата выхода',
                    value: `${title.season.year}, ${title.season.string}`,
                }
                const dub = {
                    label: 'Озвучка',
                    value: 'AniLibria',
                }
                const episodeCount = {
                    label: 'Количество эпизодов',
                    value: `${title.player.episodes.last} эп.`,
                }
                const status = {
                    label: 'Статус',
                    value: title.status.string,
                }

                const infoArr = [
                    format,
                    release_date,
                    dub,
                    episodeCount,
                    status,
                ]

                setTitleInfo({ ...title, info: infoArr })
            })
            .finally(() => {
                setLoading(false)
                setRefreshing(false)
            })
    }
    if (loading) {
        return <Loader />
    }

    if (!titleInfo) {
        return <NotFound />
    }

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#fff' }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => getTitle(true)}
                />
            }
        >
            <ImageBackground
                source={{
                    uri: `https://anilibria.tv${titleInfo.posters.medium.url}`,
                }}
                blurRadius={15}
            >
                <View style={{ alignItems: 'center', paddingVertical: 15 }}>
                    <Image
                        source={{
                            uri: `https://anilibria.tv${titleInfo.posters.medium.url}`,
                        }}
                        style={{ width: 250, height: 350, borderRadius: 10 }}
                    />
                    <TouchableWithoutFeedback
                        onPress={() =>
                            Alert.alert('Полное название', titleInfo.names.ru)
                        }
                    >
                        <MyText
                            color="#fff"
                            numberOfLines={2}
                            style={{ marginTop: 10, paddingHorizontal: 15 }}
                            fontWeight={700}
                            size={24}
                            center
                        >
                            {titleInfo.names.ru}
                        </MyText>
                    </TouchableWithoutFeedback>
                    <MyText
                        color="#f2f2f2"
                        style={{ marginTop: 5, paddingHorizontal: 15 }}
                        center
                    >
                        {titleInfo.names.en}
                    </MyText>
                </View>
            </ImageBackground>

            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: 15,
                    paddingHorizontal: 15,
                    gap: 10,
                }}
            >
                <Button
                    style={{ flex: 1 }}
                    onPress={() => Alert.alert('Сообщение', 'Пока недоступно')}
                >
                    Смотреть
                </Button>
                <Button
                    style={{ flex: 0.1 }}
                    onPress={() => Alert.alert('Сообщение', 'Пока недоступно')}
                >
                    <Icon name="arrow-redo-outline" size={20} />
                </Button>
            </View>

            <ScrollView
                horizontal
                style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    gap: 10,
                }}
            >
                {titleInfo.genres.map((genre) => (
                    <View
                        style={{
                            backgroundColor: '#222',
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            marginRight: 10,
                            marginBottom: 10,
                        }}
                    >
                        <MyText color="#f2f2f2">{genre}</MyText>
                    </View>
                ))}
            </ScrollView>

            <View style={{ marginTop: 25, paddingHorizontal: 15, gap: 15 }}>
                {titleInfo.info.map((item) => (
                    <View
                        key={item.label}
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <MyText fontWeight={600} size={18}>
                            {item.label}
                        </MyText>
                        <MyText size={18}>{item.value}</MyText>
                    </View>
                ))}
            </View>

            <MyText
                size={17}
                lineHeight={28}
                style={{ marginTop: 25, paddingHorizontal: 15 }}
            >
                {titleInfo.description}
            </MyText>
        </ScrollView>
    )
}

export default TitleScreen
