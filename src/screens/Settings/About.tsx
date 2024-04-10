import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import MyText from '../../components/UI/MyText'

const About = () => {
    const [authors] = useState<any[]>([
        {
            username: 'NineSirius',
            description: 'Главный разработчик',
        },
    ])

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: '#fff',
                paddingHorizontal: 10,
            }}
        >
            <View
                style={{
                    flex: 1,
                    marginTop: 25,
                }}
            >
                <MyText fontWeight={600} size={24}>
                    AniBam Android
                </MyText>
                <MyText>v0.0.1</MyText>
            </View>

            <View
                style={{
                    flex: 1,
                    marginTop: 25,
                }}
            >
                <MyText fontWeight={500} size={18}>
                    Авторы
                </MyText>
                <View style={{ marginTop: 10 }}>
                    {authors.map((author) => (
                        <View>
                            <MyText fontWeight={500}>{author.username}</MyText>
                            <MyText>{author.description}</MyText>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}

export default About
