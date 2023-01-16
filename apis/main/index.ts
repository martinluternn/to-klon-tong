import CustomConfig from '../../configs';
import { Product } from '../../models/Product';
import { JsonServerConnection } from '../../tools/ApiHelper';

const serverEnv: string = CustomConfig.getServerEnviroment();
const apiConnection = JsonServerConnection(serverEnv, '/klontong');

const products = async (perPage?: string) => {
    const strArray: string[] = [];
    if (perPage) {
        strArray.push('per_page=' + perPage);
    }
    let str = '/';
    if (strArray.length > 0) {
        str += '?' + strArray.join('&');
    } else {
        str = ''
    }
    const result = await apiConnection.get(str) as Product[];
    return result;
};

const productByID = async (id: string) => {
    const result = await apiConnection.get(`/${id}`) as Product;
    return result;
};

const addProduct = async (product: Product) => {
    const result = await apiConnection.post('', product) as void;
    return result;
};

export interface MainApi {
    products: () => Promise<Product[]>;
    productByID: () => Promise<Product>;
    addProduct: (product: Product) => Promise<void>;
}

export default {
    products,
    productByID,
    addProduct,
} as MainApi;
