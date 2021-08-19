import React, { useEffect, useState } from "react";
import { View, Text } from 'react-native'
import Storage from "portrans_app/src/libs/storage";

const DetailScreen = () => {
    const [listFav, setListFav] = useState([])
    useEffect(async () => {
        let allKeys = await Storage.instance.getAllKeys()
        const favs = await Storage.instance.getAll(allKeys);
        const favorites = favs.map((fav) => JSON.parse(fav[1]));
        setListFav(favorites)
    }, [])
    return (
        <View>
            <Text>Hola Mundo 2 Deatil</Text>
            {listFav && listFav.length > 0 && listFav.map((item, idx) => {
                return <Text key={idx}>{item.name}</Text>
            })}
        </View>
    )
}

export default DetailScreen