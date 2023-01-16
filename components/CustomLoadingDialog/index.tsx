import React, { Component } from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import PopUpDialog, { ScaleAnimation } from "react-native-popup-dialog";

const isAndroid: boolean = Platform.OS === "android";

interface Props {
  isVisible: boolean;
}

interface State {
  //
}

export default class CustomLoadingDialog extends Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const animation = new ScaleAnimation(0);
    return (
      <PopUpDialog
        width={80}
        height={80}
        containerStyle={[isAndroid && { elevation: 1000 }]}
        visible={this.props.isVisible}
        dialogAnimation={animation}
        animationDuration={200}
        onTouchOutside={() => false}
        onHardwareBackPress={() => false}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="lightblue" />
        </View>
      </PopUpDialog>
    );
  }
}
