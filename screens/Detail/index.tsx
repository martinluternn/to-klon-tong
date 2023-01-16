import { StyleSheet, Text, View, Image } from "react-native";
import { AppState } from "../../AppState";
import { Product } from "../../models/Product";
import { connect } from "react-redux";
import { AnyProps } from "redux-wrapper-extended";
import CustomFlashMessage from "../../components/CustomFlashMessage";
import { toCurrencyFormat, toTitleCase } from "../../tools/Util";
import CustomLoadingDialog from "../../components/CustomLoadingDialog";

interface Actions {
  //
}

interface Props {
  selectedProduct: Product;
  isLoading: Boolean;
}

function Detail(globalProps: AnyProps) {
  return (
    <View style={styles.container}>
      {globalProps.selectedProduct ? (
        <View>
          <Image
            height={50}
            resizeMode={"contain"}
            source={{
              uri: globalProps.selectedProduct.image,
            }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 16, color: "blue", fontWeight: "800" }}>
              {toTitleCase(globalProps.selectedProduct.name)}
            </Text>
            <Text style={{ fontSize: 15, fontStyle: "italic" }}>
              {globalProps.selectedProduct.description}
            </Text>
            <Text style={{ fontSize: 15, marginTop: 8 }}>
              {"SKU: " + globalProps.selectedProduct.sku}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 19,
                marginTop: 2,
              }}
            >
              {toCurrencyFormat("Rp", globalProps.selectedProduct.price)}
            </Text>
            <Text style={{ fontSize: 15, marginTop: 8 }}>
              {"LxWxH: " +
                (globalProps.selectedProduct.length
                  ? globalProps.selectedProduct.length
                  : 0) +
                "cm" +
                " x " +
                (globalProps.selectedProduct.width
                  ? globalProps.selectedProduct.width
                  : 0) +
                "cm" +
                " x " +
                (globalProps.selectedProduct.height
                  ? globalProps.selectedProduct.height
                  : 0) +
                "cm"}
            </Text>
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
      ) : (
        <Text>Data is empty</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
});

const stateToProps = (state: AppState) => {
  return {
    selectedProduct: state.main.selectedProduct,
    flashMsg: state.main.flashMessage,
    isLoading: state.main.isLoading
  } as Props;
};

export default connect(stateToProps)(Detail);
