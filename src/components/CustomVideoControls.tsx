import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { ActivityIndicator, IconButton } from 'react-native-paper'
import Slider from '@react-native-community/slider'
import MyText from './UI/MyText'

type CustomVideoControlsProps = {
    status: any
    navigation: any
    handlePlayPause?: () => void
    handleSeek?: (rate: number) => void
    handlePlaybackRateChange?: (rate: number[]) => void
}

const CustomVideoControls: React.FC<CustomVideoControlsProps> = ({
    status,
    navigation,
    handlePlayPause,
    handleSeek,
    handlePlaybackRateChange,
}) => {
    const [showControls, setShowControls] = useState<boolean>(true)
    const [controlsTimeout, setControlsTimeout] = useState<any>(null)

    const min = 0
    const max = status.durationMillis * 1000
    const seek = status.playableDurationMillis * 1000

    const formatTime = (milliseconds: number) => {
        const seconds = milliseconds / 1000

        let minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.floor(seconds % 60)
        if (seconds > 3600) {
            const hours = Math.floor(seconds / 3600)
            minutes = Math.floor(seconds / 60) - hours * 60
            return `${hours}:${minutes
                .toString()
                .padStart(2, '0')}:${remainingSeconds
                .toString()
                .padStart(2, '0')}`
        } else {
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
                .toString()
                .padStart(2, '0')}`
        }
    }

    const hideControls = () => {
        setShowControls(false)
    }

    const handleUserActivity = () => {
        setShowControls(true)

        clearTimeout(controlsTimeout)
        setControlsTimeout(() => setTimeout(hideControls, 3000))
    }

    return (
        <View
            onTouchStart={handleUserActivity}
            onTouchMove={handleUserActivity}
            onTouchEnd={handleUserActivity}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            }}
        >
            {showControls && (
                <>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <IconButton
                            icon="arrow-left"
                            size={36}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                    {status.isBufferring ? (
                        <View
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: [
                                    { translateX: -50 },
                                    { translateY: -50 },
                                ],
                            }}
                        >
                            <ActivityIndicator size="large" />
                        </View>
                    ) : (
                        <View
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 20,
                                transform: [
                                    { translateX: -50 },
                                    { translateY: -50 },
                                ],
                            }}
                        >
                            {/* <IconButton
                                icon="skip-previous"
                                size={60}
                                iconColor="#f2f2f2"
                            /> */}
                            <IconButton
                                onPress={handlePlayPause}
                                icon={!status.isPlaying ? 'play' : 'pause'}
                                size={72}
                                iconColor="#fff"
                            />
                            {/* <IconButton
                                icon="skip-next"
                                size={60}
                                iconColor="#f2f2f2"
                            /> */}
                        </View>
                    )}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                            bottom: 0,
                        }}
                    >
                        {/* <MyText color="#dfdfdf">{formatTime(seek)}</MyText> */}
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={min}
                            maximumValue={max}
                            value={seek}
                            onValueChange={(value) => handleSeek(value)}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#333"
                        />
                    </View>
                </>
            )}
        </View>
    )
}

export default CustomVideoControls
