import { StyleSheet, Text, View, Image, TextInput, Button } from "react-native";
import { AppState } from "../../AppState";
import { Product } from "../../models/Product";
import { connect } from "react-redux";
import { AnyProps } from "redux-wrapper-extended";
import CustomFlashMessage from "../../components/CustomFlashMessage";
import { DEFAULT } from "../ScreenNames";
import { Dispatch } from "redux";
import { addProduct, deleteFlashMessage } from "../../actions/Main";
import { useState } from "react";
import CustomLoadingDialog from "../../components/CustomLoadingDialog";

interface Actions {
  addProduct: (product: Product) => void;
  resetFlashMessage: () => void;
}

interface Props {
  addedProduct: Product;
  flashMsg: string;
  isLoading: Boolean;
}

let addedProduct: Product = {
  sku: "",
  name: "",
  description: "",
  width: 0,
  length: 0,
  height: 0,
  image: "",
  price: 0,
};

function backToMainPage(action: any, product: Product) {
  action.addProduct(product);
  action.navigation.navigate(DEFAULT);
}

function Add(globalProps: AnyProps) {
  const [product, setProduct] = useState(addedProduct);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column" }}>
        <View>
          <Text style={{ fontSize: 12 }}>{"Image URL: "}</Text>
          <TextInput
            style={styles.input}
            placeholder={"put the url here"}
            placeholderTextColor={"#e6e6e6"}
            onChangeText={(vl) => setProduct({ ...product, image: vl })}
            autoCorrect={false}
            keyboardType={"url"}
          />
          <Text style={{ fontSize: 12, marginTop: 2 }}>{"Name: "}</Text>
          <TextInput
            style={styles.input}
            placeholder={"put the name here"}
            placeholderTextColor={"#e6e6e6"}
            onChangeText={(vl) => setProduct({ ...product, name: vl })}
            autoCorrect={false}
            keyboardType={"default"}
          />
          <Text style={{ fontSize: 12, marginTop: 2 }}>{"Description: "}</Text>
          <TextInput
            style={styles.input}
            placeholder={"put the description here"}
            placeholderTextColor={"#e6e6e6"}
            onChangeText={(vl) => setProduct({ ...product, description: vl })}
            autoCorrect={false}
            keyboardType={"default"}
          />
          <Text style={{ fontSize: 12, marginTop: 2 }}>{"Price: "}</Text>
          <TextInput
            style={styles.input}
            placeholder={"put the price here"}
            placeholderTextColor={"#e6e6e6"}
            onChangeText={(vl) =>
              setProduct({ ...product, price: parseInt(vl) })
            }
            autoCorrect={false}
            keyboardType={"numeric"}
          />
          <Text style={{ fontSize: 12, marginTop: 2 }}>{"SKU: "}</Text>
          <TextInput
            style={styles.input}
            placeholder={"put the sku here"}
            placeholderTextColor={"#e6e6e6"}
            onChangeText={(vl) => setProduct({ ...product, sku: vl })}
            autoCorrect={false}
            keyboardType={"numeric"}
          />
          <View style={{ flexDirection: "row", marginTop: 2 }}>
            <View style={{ width: "25%", marginRight: 4 }}>
              <Text style={{ fontSize: 12 }}>{"L: "}</Text>
              <TextInput
                style={styles.input}
                placeholder={"length"}
                placeholderTextColor={"#e6e6e6"}
                onChangeText={(vl) =>
                  setProduct({ ...product, length: parseInt(vl) })
                }
                autoCorrect={false}
                keyboardType={"numeric"}
              />
            </View>
            <View style={{ width: "25%", marginRight: 4 }}>
              <Text style={{ fontSize: 12 }}>{"W: "}</Text>
              <TextInput
                style={styles.input}
                placeholder={"width"}
                placeholderTextColor={"#e6e6e6"}
                onChangeText={(vl) =>
                  setProduct({ ...product, width: parseInt(vl) })
                }
                autoCorrect={false}
                keyboardType={"numeric"}
              />
            </View>
            <View style={{ width: "25%" }}>
              <Text style={{ fontSize: 12 }}>{"H: "}</Text>
              <TextInput
                style={styles.input}
                placeholder={"height"}
                placeholderTextColor={"#e6e6e6"}
                onChangeText={(vl) =>
                  setProduct({ ...product, height: parseInt(vl) })
                }
                autoCorrect={false}
                keyboardType={"numeric"}
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 1, paddingTop: 20 }}>
          <Button
            title="SAVE"
            onPress={() => backToMainPage(globalProps, product)}
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
    padding: 20,
  },
  input: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 4,
    marginTop: 2,
    marginBottom: 4,
    borderColor: "lightgrey",
    borderWidth: 0.5,
    borderRadius: 2,
  }
});

const stateToProps = (state: AppState) => {
  return {
    addedProduct: state.main.addedProduct,
    flashMsg: state.main.flashMessage,
    isLoading: state.main.isLoading
  } as Props;
};

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    addProduct: (product: Product) => dispatch(addProduct(product)),
    resetFlashMessage: () => dispatch(deleteFlashMessage()),
  } as Actions;
};

export default connect(stateToProps, dispatchToProps)(Add);
