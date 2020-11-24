import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Cards = (props) => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: props.bg,
      }}
    >
      <View style={styles.col}>
        <Ionicons
          name={props.icon}
          size={30}
          color={props.bg == "red" ? "#FFF" : "red"}
        />
        <TouchableOpacity onPress={props.onPress}>
          <MaterialCommunityIcons
            style={{ marginLeft: 50 }}
            name="dots-vertical"
            size={30}
            color="#b8b8aa"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{props.title}</Text>
      <Text
        style={{
          ...styles.number,
          color: props.bg == "red" ? "#FFF" : "#000",
        }}
      >
        {props.number}
      </Text>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 130,
    borderRadius: 30,
    padding: 15,
    marginLeft: 20,
  },
  col: {
    flexDirection: "row",
  },
  title: {
    marginTop: 90,
    color: "#b8b8aa",
    fontWeight: "bold",
    fontSize: 12,
  },
  number: {
    fontWeight: "bold",
    fontSize: 22,
  },
});
