import React from "react";
import { StyleSheet, Text, View } from "react-native";
import COMMON_STYLES from "../../../assets/styles";
import moment from "moment";

const TextMessage = ({ fromMe, message }) => {
  const { message: msg, body, time } = message;
  return (
    <View
      style={[
        COMMON_STYLES.message,
        fromMe ? COMMON_STYLES.sentMessage : COMMON_STYLES.recievedMessage,
      ]}
    >
      <Text
        style={[
          COMMON_STYLES.messageText,
          fromMe
            ? COMMON_STYLES.sentMessageText
            : COMMON_STYLES.recievedMessageText,
        ]}
      >
        {body || msg}
      </Text>
      <Text
        style={
          fromMe
            ? COMMON_STYLES.sentMessageTimestamp
            : COMMON_STYLES.recievedMessageTimestamp
        }
      >
        {moment(time).format("lll").toString()}
      </Text>
    </View>
  );
};

export default TextMessage;

const styles = StyleSheet.create({});
