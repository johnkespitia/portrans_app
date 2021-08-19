import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
    static instance = new Storage();
    store = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (error) {
            console.log(`Storage Error: `, error)
        }
    }

    get = async (key) => {
        try {
            return await AsyncStorage.getItem(key)
        } catch (error) {
            console.log(`Storage Error: `, error)
        }
    }

    remove = async (key) => {
        try {
            await AsyncStorage.removeItem(key)
        } catch (error) {
            console.log(`Storage Error: `, error)
        }
    }

    getAll = async (keys) => {
        try {
            return await AsyncStorage.multiGet(keys);
        } catch (error) {
            console.log(`Storage Error: `, error)
        }
    }

    getAllKeys = async () => {
        try {
            return await AsyncStorage.getAllKeys()
        } catch (error) {
            console.log(`Storage Error: `, error)
        }
    }
}

export default Storage