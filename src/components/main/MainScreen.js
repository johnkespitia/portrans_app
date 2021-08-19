import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import Http from 'portrans_app/src/libs/http'
import Storage from 'portrans_app/src/libs/storage'

const MainScreen = (props) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    useEffect(async () => {
        setLoading(true)
        const list = await Http.instance.get('https://api.coinlore.net/api/tickers/')
        setData(list.data)
        setLoading(false)
    }, [])
    const handlePress = () => {
        props.navigation.navigate('Detail')
    }
    const addFav = (item) => {
        const content = JSON.stringify(item)
        const key = `fav-${item.id}`
        Storage.instance.store(key, content)
    }

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator
                color="#FFF"
                size="large"
            />}
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return <View>
                        <Text>{item.symbol}</Text>
                        <Text>{item.name}</Text>
                        <Pressable onPress={()=>addFav(item)} style={styles.btn}>
                            <Text style={styles.btnText}>Favoritos</Text>
                        </Pressable>
                    </View>
                }}
            />
            <Pressable onPress={handlePress} style={styles.btn}>
                <Text style={styles.btnText}>Ir a Detail</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: "white"
        },
        btn: {
            padding: 0,
            backgroundColor: "red",
            borderRadius: 8,
            margin: 16
        },
        btnText: {
            color: "#FFFFFF",
            textAlign: "center",
            padding: 3
        }
    }
)

export default MainScreen