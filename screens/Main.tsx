import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AppState } from "../AppState";
import { Product } from "../models/Product";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  addProduct,
  deleteFlashMessage,
  getProductByID,
  getProducts,
  searchProduct,
} from "../actions/Main";
import { AnyProps } from "redux-wrapper-extended";
import CustomFlashMessage from "../components/CustomFlashMessage";
import { useEffect, useState } from "react";
import { toCurrencyFormat, toTitleCase } from "../tools/Util";
import { ADD, DETAIL } from "./ScreenNames";
import CustomLoadingDialog from "../components/CustomLoadingDialog";

interface Actions {
  getProducts: () => void;
  getProductByID: (id: string) => void;
  searchProduct: (products: Product[], keyword: string) => void;
  resetFlashMessage: () => void;
}

interface Props {
  products: Product[];
  defaultProducts: Product[];
  selectedProduct: Product;
  flashMsg: string;
  isLoading: Boolean;
  keyword: string;
}

function gotoDetailPage(action: any, id: string) {
  action.getProductByID(id);
  action.navigation.navigate(DETAIL);
}

function filterProduct(products: Product[], keyword: string): Product[] {
  return products.filter(
    (item: Product) =>
      item.name.toLowerCase().includes(keyword.toLowerCase()) == true
  );
}

function renderList(globalProps: AnyProps) {
  let products: Product[];
  if (globalProps.keyword != "") products = globalProps.products;
  else products = globalProps.defaultProducts;

  return (
    <View>
      {globalProps.defaultProducts && globalProps.defaultProducts.length > 0 && (
        <TextInput
          style={styles.input}
          placeholder={"Search Product"}
          placeholderTextColor={"#bbbbbb"}
          onChangeText={(vl) =>
            vl.length > 2 || vl.length == 0
              ? globalProps.searchProduct(
                  filterProduct(globalProps.defaultProducts, vl),
                  vl
                )
              : {}
          }
          autoCorrect={false}
          keyboardType={"url"}
        />
      )}
      {products && products.length > 0 ? (
        <View>
          <FlatList
            style={{ flex: 1 }}
            data={products}
            keyExtractor={(item) => item._id!!}
            renderItem={({ item, index }) => {
              const _item: Product = item as Product;
              return (
                <View style={{ marginBottom: 4 }}>
                  <TouchableOpacity
                    style={{
                      borderColor: "lightgrey",
                      borderWidth: 1,
                      borderRadius: 4,
                    }}
                    onPress={() => gotoDetailPage(globalProps, _item._id!!)}
                  >
                    <View
                      style={{
                        flex: 1,
                        width: "100%",
                        flexDirection: "row",
                        padding: 20,
                      }}
                    >
                      <Image
                        width={50}
                        height={50}
                        resizeMode={"contain"}
                        source={{
                          uri: _item.image,
                        }}
                      />
                      <View style={{ flexDirection: "column" }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "blue",
                            fontWeight: "800",
                          }}
                        >
                          {toTitleCase(_item.name)}
                        </Text>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 14,
                            marginTop: 2,
                          }}
                        >
                          {toCurrencyFormat("Rp", _item.price)}
                        </Text>
                        <Text style={{ fontSize: 10, marginTop: 4 }}>
                          {"LxWxH: " +
                            (_item.length ? _item.length : 0) +
                            "cm" +
                            " x " +
                            (_item.width ? _item.width : 0) +
                            "cm" +
                            " x " +
                            (_item.height ? _item.height : 0) +
                            "cm"}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <View>
          {globalProps.keyword != "" ? (
            <Text>Product not found</Text>
          ) : (
            <Text>Product is empty</Text>
          )}
        </View>
      )}
    </View>
  );
}

function Main(globalProps: AnyProps) {
  useEffect(() => {
    globalProps.getProducts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", flex: 1, padding: 10 }}>
        {renderList(globalProps)}
      </View>
      <View style={{ flexDirection: "row", width: "100%", padding: 20 }}>
        <View style={{ flex: 1 }}>
          <Button
            title="ADD"
            onPress={() => globalProps.navigation.navigate(ADD)}
          />
        </View>
      </View>
      <CustomLoadingDialog isVisible={globalProps.isLoading} />
      <CustomFlashMessage
        visible={globalProps.flashMsg ? true : false}
        message={globalProps.flashMsg}
        duration={3000}
        onClose={() => globalProps.resetFlashMessage()}
        type={"error"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 4,
    marginTop: 2,
    marginBottom: 8,
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 2,
  },
});

const stateToProps = (state: AppState) => {
  return {
    products: state.main.products,
    defaultProducts: state.main.defaultProducts,
    selectedProduct: state.main.selectedProduct,
    flashMsg: state.main.flashMessage,
    isLoading: state.main.isLoading,
    keyword: state.main.keyword,
  } as Props;
};

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
    getProductByID: (id: string) => dispatch(getProductByID(id)),
    searchProduct: (products: Product[], keyword: string) =>
      dispatch(searchProduct(products, keyword)),
    resetFlashMessage: () => dispatch(deleteFlashMessage()),
  } as Actions;
};

export default connect(stateToProps, dispatchToProps)(Main);
