import { useEffect, useRef, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { ScreenT } from '../types/ScreenT'
import { playerListT } from '../types/TitleT'
import { ResizeMode, Video } from 'expo-av'
import CustomVideoControls from '../components/CustomVideoControls'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useDispatch } from 'react-redux'
import { disableBottomBar, enableBottomBar } from '../store/actions/home.action'
import { StatusBar } from 'expo-status-bar'
import { useBottomSheet } from '../containers/BottomSheetContext'

const playbackSpeedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2]

const WatchScreen: React.FC<ScreenT> = ({ navigation, route }) => {
    const [activeEpisode, setActiveEpisode] = useState<number>(
        route.params.activeEpisode ? route.params.activeEpisode : 0,
    )

    const [playList] = useState<playerListT[]>(
        route.params
            ? Object.keys(route.params.player.list).map(
                  (key) => route.params.player.list[key],
              )
            : [],
    )
    const [status, setStatus] = useState<any>({})
    const [seek, setSeek] = useState<number>(0)

    const [isPaused, setIsPaused] = useState(false)
    const [playbackRate, setPlaybackRate] = useState(1)

    const videoRef = useRef<any>(null)
    const dispatch = useDispatch()
    const { closeBottomSheet } = useBottomSheet()

    const handlePlaybackStatusUpdate = (status) => {
        setStatus(status)
    }

    const handlePlayPause = async () => {
        if (status.isPlaying) {
            console.log(status)
            await videoRef.current.pauseAsync()
        } else {
            await videoRef.current.playAsync()
        }
    }

    const handleSeek = async (value: number) => {
        if (videoRef.current) {
            console.log(videoRef.current)
            await videoRef.current.playFromPositionAsync(value / 1000)
        }
    }

    const handlePlaybackRateChange = (rate: number[]) => {
        setPlaybackRate(rate[0])
    }
    useEffect(() => {
        closeBottomSheet()
        const lockOrientation = async () => {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT,
            )
        }
        dispatch(disableBottomBar())
        lockOrientation()

        return () => {
            dispatch(enableBottomBar())
            closeBottomSheet()
            ScreenOrientation.unlockAsync()
        }
    }, [])

    return (
        <View
            style={{ flex: 1, position: 'relative', backgroundColor: '#000' }}
        >
            <StatusBar hidden />
            <Video
                ref={videoRef}
                style={{ flex: 1 }}
                resizeMode={ResizeMode.CONTAIN}
                onLoad={(status) => console.log(status)}
                source={{
                    uri: `https://cache.libria.fun/${playList[activeEpisode].hls.hd}`,
                }}
                rate={status.rate || 1}
                isMuted={status.isMuted || false}
                shouldPlay={true}
                positionMillis={seek}
                // useNativeControls
                onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />
            {status.durationMillis && (
                <CustomVideoControls
                    status={status}
                    isPaused={isPaused}
                    playbackRate={playbackRate}
                    navigation={navigation}
                    handlePlayPause={handlePlayPause}
                    handlePlaybackRateChange={handlePlaybackRateChange}
                    handleSeek={handleSeek}
                />
            )}
        </View>
    )
}

export default WatchScreen
