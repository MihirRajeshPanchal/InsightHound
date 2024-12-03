import React from 'react'
import { Text, View } from 'react-native'
import Loading from './loading'

export default function Loader() {
    return (
        <View className='w-screen h-[80vh] px-6 pt-24 overflow-visible'>
            <Loading />
        </View>
    )
}
