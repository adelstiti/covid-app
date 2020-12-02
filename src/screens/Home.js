import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import Deck from "../components/Deck";
import Cards from "../components/Cards";
import Buttons from "../components/Buttons";
import Axios from "axios";

const Home = (props) => {
  const [data, setData] = useState([]);
  const [active, setActive] = useState("global");

  const changeCases = (country) => {
    let uri = `https://covid19.mathdro.id/api`;
    setActive("global");

    if (country) {
      uri = `https://covid19.mathdro.id/api/countries/${country}`;
      setActive(country);
    }

    Axios.get(uri).then((res) => {
      setData([
        {
          id: 1,
          title: "CORONAVIRUS CASES",
          number: res.data.confirmed.value
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),
        },
        {
          id: 2,
          title: "TOTAL DEATHS",
          number: res.data.deaths.value
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),
        },
        {
          id: 3,
          title: "RECOVERED",
          number: res.data.recovered.value
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),
        },
      ]);
    });
  };

  useEffect(() => {
    changeCases();
  }, []);

  const renderCard = (item) => {
    return (
      <View key={item.id} style={styles.cardContainer}>
        <View style={styles.card}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Ionicons
              name="ios-remove"
              size={40}
              color="red"
              style={{ marginTop: 14 }}
            />
            <Text style={styles.number}>{item.number}</Text>
          </View>
          <View style={{ marginLeft: 130 }}>
            <Ionicons name="md-options" size={24} color="white" />
            <Text style={styles.textCovid}>COVID-19</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <View title="All Domne!">
        <Text style={styles.noCard}>NO MORE CARDS HERE</Text>
        <Button backgroundColor="#03A9F4" title="Get more!" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/unnamed.jpg")}
        style={styles.map}
      >
        <View style={styles.col}>
          <View style={{ width: "50%" }}>
            <Ionicons name="md-options" color="#FFF" size={26} />
            <Ionicons
              name="md-options"
              color="#FFF"
              size={26}
              style={styles.minusIcon}
            />
          </View>
          <View style={styles.avatarContainer}>
            <Image source={require("../images/1.jpeg")} style={styles.avatar} />
          </View>
        </View>
        <Text style={styles.textDash}>CORONA DASH</Text>
        <View style={styles.colContainer}>
          <Text
            onPress={() => changeCases("")}
            style={[
              styles.textGlobal,
              { color: active === "global" ? "red" : "#6a706e" },
            ]}
          >
            GLOBAL
          </Text>
          <Text
            onPress={() => changeCases("tunisia")}
            style={[
              styles.textTunisia,
              { color: active === "tunisia" ? "red" : "#6a706e" },
            ]}
          >
            TUNISIA
          </Text>
          <TouchableOpacity
            style={styles.reloadContainer}
            onPress={() => changeCases(active !== "global" ? active : "")}
          >
            <Ionicons name="md-refresh" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <ScrollView showsVerticalScrollIndicator={false} vertical>
        <Deck
          data={data}
          renderCard={renderCard}
          renderNoMoreCards={renderNoMoreCards}
        />
        <ScrollView
          style={{ marginTop: 170 }}
          showHorizontalScrollIndicator={false}
          horizontal
        >
          <Cards
            icon="md-pulse"
            title="TOTAL CASES"
            bg="red"
            number={data[0] && data[0].number}
            onPress={() => props.navigation.navigate("Detail")}
          />
          <Cards
            icon="ios-git-network"
            title="RECOVERED"
            bg="#FFF"
            number={data[1] && data[1].number}
          />
          <Cards
            icon="ios-heart-dislike"
            title="DEATH CASES"
            bg="#FFF"
            number={data[2] && data[2].number}
          />
        </ScrollView>
        <View style={{ marginBottom: 34, marginTop: 30 }}>
          <Buttons name="ASYMPTOMATIC" number="1 778" />
          <Buttons name="ASYMPTOMATIC" number="1 561" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c2732",
  },
  cardContainer: {
    height: 150,
    width: 320,
    alignSelf: "center",
    backgroundColor: "#6A706E",
    borderRadius: 30,
  },
  card: {
    height: 150,
    width: 260,
    paddingTop: 20,
    paddingHorizontal: 30,
    backgroundColor: "#2b3240",
    borderRadius: 30,
    flexDirection: "row",
  },
  title: {
    color: "#6A706E",
    width: 100,
    fontSize: 12,
    fontWeight: "bold",
  },
  number: {
    color: "#FFF",
    width: 120,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: -10,
  },
  textCovid: {
    transform: [{ rotate: "-90deg" }],
    color: "#3a4b4f",
    fontSize: 14,
    marginTop: 18,
    width: 90,
    marginLeft: -35,
    fontWeight: "bold",
  },
  noCard: {
    marginBottom: 10,
    color: "#FFF",
    alignSelf: "center",
  },
  map: {
    height: 200,
    paddingTop: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  col: {
    flexDirection: "row",
  },
  minusIcon: {
    marginTop: -20,
    marginLeft: 5,
  },
  avatarContainer: {
    width: "50%",
    alignItems: "flex-end",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textDash: {
    color: "#FFF",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 15,
    fontWeight: "bold",
  },
  colContainer: {
    flexDirection: "row",
    paddingHorizontal: 30,
    marginTop: 40,
    alignItems: "center",
  },
  textGlobal: {
    fontWeight: "bold",
    fontSize: 16,
  },
  textTunisia: {
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 30,
  },
  reloadContainer: {
    backgroundColor: "#FFF",
    elevation: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 50,
  },
});
