import { NativeModules } from 'react-native';

const baseUrl: string = 'https://crudcrud.com/api/015fb03d739f4963b39b82f5b6051324';
const exportedConstants = NativeModules.ExportedConstants;

class CustomConfig {
    public getServerEnviroment(): string {
        return baseUrl;
    }

    public getAppName(): string {
        return exportedConstants.appName || 'To-Klon-Tong';
    }

    public getVersionName(): string {
        return exportedConstants.versionName || '0.0.1';
    }

    public getVersionCode(): string {
        return exportedConstants.versionCode || '1';
    }
}

export default new CustomConfig();
