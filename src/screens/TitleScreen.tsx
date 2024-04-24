import React, { useEffect, useState } from 'react'
import { ScreenT } from '../types/ScreenT'
import {
    View,
    Text,
    ScrollView,
    Image,
    Alert,
    ImageBackground,
    Linking,
    ToastAndroid,
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
import { useBottomSheet } from '../containers/BottomSheetContext'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import color from '../theme'
import { useTheme } from '../containers/ThemeContext'

const TitleScreen: React.FC<ScreenT> = ({ navigation, route }) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [titleInfo, setTitleInfo] = useState<TitleT | null>(null)

    const { openBottomSheet, closeBottomSheet } = useBottomSheet()
    const { theme } = useTheme()

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
                    value: title.player.episodes.first
                        ? title.player.episodes.first !== 1
                            ? `с ${title.player.episodes.first} по ${title.player.episodes.last} эп.`
                            : `${title.player.episodes.last} эп.`
                        : '0 эп.',
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

                setTitleInfo({
                    ...title,
                    info: infoArr,
                    episodes: Object.keys(title.player.list).map(
                        (key) => title.player.list[key],
                    ),
                })
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
            style={{ flex: 1, backgroundColor: color[theme].bg }}
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
                            style={{
                                marginTop: 10,
                                paddingHorizontal: 15,
                                textAlign: 'center',
                            }}
                            fontWeight={700}
                            size={24}
                        >
                            {titleInfo.names.ru}
                        </MyText>
                    </TouchableWithoutFeedback>
                    <MyText
                        color="#f2f2f2"
                        style={{
                            marginTop: 5,
                            paddingHorizontal: 15,
                            textAlign: 'center',
                        }}
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
                    onPress={() => {
                        if (titleInfo.episodes.length > 0) {
                            openBottomSheet(
                                <View
                                    style={{
                                        flex: 1,
                                        paddingHorizontal: 15,
                                        gap: 10,
                                    }}
                                >
                                    <MyText fontWeight={600} size={18}>
                                        Выберите серию
                                    </MyText>
                                    <BottomSheetScrollView>
                                        {titleInfo &&
                                            titleInfo.episodes.map(
                                                (episode, index) => (
                                                    <Button
                                                        key={episode.uuid}
                                                        style={{
                                                            marginBottom: 10,
                                                            justifyContent:
                                                                'flex-start',
                                                        }}
                                                        onPress={() => {
                                                            closeBottomSheet()
                                                            navigation.navigate(
                                                                'Watch',
                                                                {
                                                                    ...titleInfo,
                                                                    activeEpisode:
                                                                        index,
                                                                },
                                                            )
                                                        }}
                                                        textProps={{
                                                            size: 18,
                                                            numberOfLines: 1,
                                                        }}
                                                    >
                                                        {episode.name
                                                            ? `${episode.episode} серия - ${episode.name}`
                                                            : `${episode.episode} серия`}
                                                    </Button>
                                                ),
                                            )}
                                    </BottomSheetScrollView>
                                </View>,
                            )
                        } else {
                            ToastAndroid.show(
                                'У этого тайтла нету эпизодов',
                                ToastAndroid.SHORT,
                            )
                        }
                    }}
                >
                    Смотреть
                </Button>
                <Button
                    style={{ flex: 0.1 }}
                    onPress={() =>
                        ToastAndroid.show('В разработке', ToastAndroid.SHORT)
                    }
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
