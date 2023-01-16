import axios, { AxiosError, AxiosResponse } from 'axios';
import { Error } from '../models/Error';

const errorResponse = (result: AxiosError) => {
    if (result.response !== undefined) {
        if (result.response.data) {
            const errorData: Error = {
                code: result.response.status.toString(),
                message: result.response.data,
            };
            return errorData;
        } else {
            const errorData: Error = {
                code: result.response.status.toString(),
                message: 'Internal Server Error',
            };
            return errorData;
        }
    } else {
        const errorData: Error = {
            code: '408',
            message: 'Connection timeout',
        };
        return errorData;
    }
};

const successResponse = (result: AxiosResponse<any>) => {
    if (result !== undefined) {
        return result.data;
    } else {
        const errorData: Error = {
            code: '408',
            message: 'Connection timeout',
        };
        return errorData;
    }
};

const getConfigWithHeader = (config: any) => {
    config = { ...config };
    if (!config.headers) {
        config.headers = {};
    }
    if (!config.headers['content-type']) {
        config.headers['content-type'] = 'application/json;charset=UTF-8';
    }
    return config;
};

const JsonServerConnection = (baseUrl: string, endPoint: string) => {
    const prefixPath = baseUrl + endPoint;

    const generateConfig = (path: string, method: string, body: any, baseConfig: any) => {
        return {
            ...baseConfig,
            url: prefixPath + path,
            method,
            data: body,
        };
    };

    const get = async (path: string, config: any) => {
        try {
            const result = await axios(generateConfig(path, 'get', null, config));
            return successResponse(result);
        } catch (e) {
            return errorResponse(e);
        }
    };

    const post = async (path: string, body: any, config: any) => {
        try {
            const result = await axios(generateConfig(path, 'post', body, config));
            return successResponse(result);
        } catch (e) {
            return errorResponse(e);
        }
    };

    const patch = async (path: string, body: any, config: any) => {
        try {
            const result = await axios(generateConfig(path, 'patch', body, config));
            return successResponse(result);
        } catch (e) {
            return errorResponse(e);
        }
    };

    const deleteMethod = async (path: string, body: any, config: any) => {
        try {
            const result = await axios(generateConfig(path, 'delete', body, config));
            return successResponse(result);
        } catch (e) {
            return errorResponse(e);
        }
    };

    const put = async (path: string, body: any, config: any) => {
        try {
            const result = await axios(generateConfig(path, 'put', body, config));
            return successResponse(result);
        } catch (e) {
            return errorResponse(e);
        }
    };

    return {
        get: (path: string, config?: any) => {
            const configTemp = getConfigWithHeader(config);
            return get(path, configTemp);
        },
        post: (path: string, body?: any, config?: any) => {
            const configTemp = getConfigWithHeader(config);
            return post(path, body, configTemp);
        },
        patch: (path: string, body?: any, config?: any) => {
            const configTemp = getConfigWithHeader(config);
            return patch(path, body, configTemp);
        },
        delete: (path: string, body?: any, config?: any) => {
            const configTemp = getConfigWithHeader(config);
            return deleteMethod(path, body, configTemp);
        },
        put: (path: string, body?: any, config?: any) => {
            const configTemp = getConfigWithHeader(config);
            return put(path, body, configTemp);
        },
    };
};

export {
    JsonServerConnection,
};
