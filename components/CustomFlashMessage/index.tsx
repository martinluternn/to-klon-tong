import React, { Component } from "react";

import {
  Animated,
  Button,
  ImageSourcePropType,
  StyleSheet,
  View,
  Text,
} from "react-native";

export type CustomFlashMessageType = "info" | "warning" | "error" | "delete";

interface Props {
  visible: boolean;
  message?: string;
  type?: CustomFlashMessageType;
  duration?: number;
  marginTop?: number;
  icon?: ImageSourcePropType;
  onClose?: () => void;
}

interface State {
  duration: number;
  opacity: Animated.Value;
  visible: boolean;
}

export default class CustomFlashMessage extends Component<Props, State> {
  private _mounted = false;

  constructor(props: any) {
    super(props);
    this.state = {
      duration: this.props.duration || 3000,
      opacity: new Animated.Value(0),
      visible: false,
    };
  }

  UNSAFE_componentWillUpdate(incomingProps: any, currentState: any) {
    if (incomingProps.visible !== currentState.visible) {
      this.animate(incomingProps.visible);
    }
  }

  animate = (isVisible: boolean) => {
    Animated.timing(this.state.opacity, {
      toValue: isVisible ? 1 : 0,
      duration: isVisible ? 300 : 800,
      useNativeDriver: true,
    }).start((result: any) =>
      this.animationCallback(isVisible, result.finished)
    );
  };

  animationCallback = (isVisible: boolean, finished: boolean) => {
    if (isVisible && finished) {
      this.autoDismiss();
    } else if (!isVisible && finished) {
      if (this.props.onClose) this.props.onClose();
      this.setState({ visible: false });
    }
  };

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  autoDismiss = () => {
    setTimeout(() => {
      if (this._mounted && this.props.visible) this.animate(false);
    }, this.props.duration);
  };

  onDismiss = () => {
    this.animate(false);
    if (this.props.onClose) this.props.onClose();
    this.setState({ visible: false });
  };

  render() {
    if (!this.props.visible) {
      return null;
    }
    const barType = s[this.props.type || "info"];
    const isMarginTopPresent: boolean = !!this.props.marginTop;
    return (
      <View style={s.container}>
        <Animated.View
          style={[
            s.messageBar,
            barType,
            { opacity: this.state.opacity },
            isMarginTopPresent && { marginTop: this.props.marginTop },
          ]}
        >
          <View style={s.textContainer}>
            <Text style={s.text}>{this.props.message}</Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    width: "100%",
    height: "95%",
    position: "absolute",
    alignSelf: "flex-end",
    top: 0,
    elevation: 1002,
    justifyContent: "flex-end",
  },
  messageBar: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 32,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2dde98",
    opacity: 1,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
    marginLeft: 16,
    flexWrap: "wrap",
    marginTop: 16,
    marginBottom: 16,
  },
  text: {
    color: "white",
    fontSize: 14,
  },
  info: {
    backgroundColor: "#2dde98",
  },
  warning: {
    backgroundColor: "#fdcb24",
  },
  error: {
    backgroundColor: "#ea4161",
  },
  delete: {
    backgroundColor: "#333333",
  },
});
