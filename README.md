# To-Klon-Tong App

### Prerequisites
You need to have react-native installed on your machine, if you don't please check it [here](https://facebook.github.io/react-native/docs/getting-started.html)

### Installing

clone the repo, go to root project folder

```
1. yarn install
2. yarn start
3. follow the expo step on your terminal (type `w`, or `i`, or `a`)
```

### App Run Checklist

this project using free open CRUD API like: `https://crudcrud.com` and pointing to `https://crudcrud.com/api/d319fe976e9142fdaa72e1b0bdc6ccb3`.
its a free limited account, and there is a limitation for only 100 requests that will worked. so,

```
1. please update the endpoint (example: `d319fe976e9142fdaa72e1b0bdc6ccb3`) if you reach the max limit
2. endpoint setting under `configs/index.ts/baseUrl`
3. this project running on expo, so there is a limitation for custom the native side
4. already tested and working properly
4. simple feature, including: list products, search, detail product, add product
```

if you have problem, please contact Martin