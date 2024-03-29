import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Chart from "../components/Chart";
import Map from "../components/Map";
import axios from "axios";

const Detail = ({ navigation, route}) => {
  const { title, status,countr } = route.params;
  const [map, setMap] = useState(false);
  const [country, setCountry] = useState("");

  useEffect(() => {
    setCountry(countr);
  }, [])

  return (
    <View style={styles.page}>
      <View style={styles.headContainer}>
        <View style={styles.humContainer}>
          <Ionicons
            name="md-remove"
            size={26}
            onPress={() => navigation.navigate("Home")}
          />
          <Ionicons name="md-remove" size={26} style={styles.hum} />
        </View>
        <View style={styles.profileContainer}>
          <Image source={require("../images/1.jpeg")} style={styles.profile} />
        </View>
      </View>

      <View>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.locationContainer}>
        <Text
          style={[
            styles.textCountry,
            country === "" ? styles.textGlobal : styles.textRed,
          ]}
          onPress={() => setCountry("")}
        >
          GLOBAL
        </Text>
        <Text
          style={[
            styles.textCountry,
            country === "tunisia" ? styles.textGlobal : styles.textRed,
          ]}
          onPress={() => setCountry("tunisia")}
        >
          TUNISIA
        </Text>
        <View style={styles.reloadContainer}>
          <Ionicons name="md-refresh" size={24} color="red" />
        </View>
      </View>
      <View style={styles.optionCard}>
        <View style={map ? styles.optionMap : styles.optionCol}>
          <Text
            onPress={() => setMap(false)}
            style={map ? styles.textLogarthimic : styles.textLinear}
          >
            CURVE 
          </Text>
        </View>
        <View style={map ? styles.optionCol : styles.optionMap}>
          <Text
            onPress={() => setMap(true)}
            style={!map ? styles.textLogarthimic : styles.textLinear}
          >
            MAP
          </Text>
        </View>
      </View>

      {map ? (
        <Map country={country} status={status} />
      ) : (
        <Chart country={country} status={status} />
      )}

      <View style={styles.bottomCard}>
        <View style={styles.bottomCol}>
          <Text style={styles.textSymptoms}>SYMPTOMS</Text>
          <View style={styles.infoContainer}>
            <Text style={{ color: "#FFF" }}>i</Text>
          </View>
        </View>

        <View style={styles.button}>
          <Text style={styles.btnText}>See more graphs</Text>
        </View>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 15,
    marginBottom: 20,
  },
  headContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    marginTop: 40,
  },
  humContainer: {
    width: "50%",
  },
  hum: {
    marginTop: -20,
    marginLeft: 5,
  },
  profileContainer: {
    width: "50%",
    alignItems: "flex-end",
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 110,
  },
  optionCol: {
    backgroundColor: "#000",
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    borderRadius: 2,
  },
  optionMap: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
  },
  textLinear: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  textLogarthimic: {
    color: "#b8b8aa",
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 15,
  },
  locationContainer: {
    alignSelf: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
    alignItems: "center",
    marginBottom: 30,
  },
  textCountry: {
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  textGlobal: {
    color: "red",
  },
  textRed: {
    color: "#6a706e",
  },
  reloadContainer: {
    backgroundColor: "#FFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 50,
    elevation: 3,
  },
  bottomCard: {
    backgroundColor: "#1c2732",
    height: 220,
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bottomCol: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  textSymptoms: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  infoContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  button: {
    borderRadius: 15,
    borderColor: "red",
    borderWidth: 1,
    marginHorizontal: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 50,
    marginBottom: 5,
  },
  btnText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});
