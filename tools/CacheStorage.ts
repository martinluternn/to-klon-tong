import AsyncStorage from '@react-native-community/async-storage';

const DATA_OFFLINE: string = 'data_offline';

class CacheStorage {

    async saveData(value: string): Promise<void> {
        return await AsyncStorage.setItem(DATA_OFFLINE, value);
    }

    async getData(): Promise<string | null> {
        return await AsyncStorage.getItem(DATA_OFFLINE);
    }

    public clearAllData(): Promise<void> {
        return AsyncStorage.multiRemove([DATA_OFFLINE]);
    }

}

const cacheStorage: CacheStorage = new CacheStorage();
export default cacheStorage;
