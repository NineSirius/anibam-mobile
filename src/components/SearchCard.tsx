import { View, Text, Image } from 'react-native'
import MyText from './UI/MyText'
import { TouchableRipple } from 'react-native-paper'

type SearchCardProps = {
    title: string
    desc: string
    type: string
    poster: string
    episodesCount?: number
    onPress: () => void
}

const SearchCard: React.FC<SearchCardProps> = ({
    title,
    desc,
    type,
    poster,
    episodesCount,
    onPress,
}) => {
    return (
        <TouchableRipple onPress={onPress}>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                    gap: 15,
                }}
            >
                <Image
                    source={{ uri: poster }}
                    style={{ width: '20%', height: 100, borderRadius: 5 }}
                />
                <View style={{ width: '75%' }}>
                    <MyText fontWeight={600}>{title}</MyText>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                        }}
                    >
                        <MyText>{type}</MyText>
                        {type !== 'MOVIE' && (
                            <MyText>{episodesCount} эп.</MyText>
                        )}
                    </View>
                    <MyText numberOfLines={2} style={{ marginTop: 10 }}>
                        {desc}
                    </MyText>
                </View>
            </View>
        </TouchableRipple>
    )
}

export default SearchCard
