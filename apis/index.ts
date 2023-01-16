import main, { MainApi } from './main';

interface TKApi {
    main: MainApi;
}

const getApi = () => {
    return {
        main,
    } as TKApi;
};

export default getApi;
