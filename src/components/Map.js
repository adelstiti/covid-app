import Axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import MapView, { Callout } from "react-native-maps";

const Map = ({ country, status }) => {
  // width={Dimensions.get("window").width}

  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(status);
    let uri = `https://covid19.mathdro.id/api/countries/${status}`;
    // setActive("global");
    if (country) {
      uri = `https://covid19.mathdro.id/api/countries/${country}/${status}`;
      // setActive(country);
    }

    Axios.get(uri).then((res) => {
      setData(res.data);
    });
  }, [country]);

  return (
    <View style={styles.container}>
      {data[0] && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: data[0].lat,
            longitude: data[0].long,
            latitudeDelta: 10,
            longitudeDelta: 10,
          }}
        >
          {data.map((item) => (
            <MapView.Marker
              key={item.uid}
              coordinate={{
                latitude: item.lat,
                longitude: item.long,
              }}
            >
              <Callout>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    marginBottom: 5,
                  }}
                >
                  {item.provinceState ? item.provinceState : item.countryRegion}
                </Text>
                <Text style={styles.descCases}>
                  {status === "confirmed" && item.confirmed}
                </Text>
                <Text style={styles.descCases}>
                  {status === "deaths" && item.deaths}
                </Text>
                <Text style={styles.descCases}>
                  {status === "recovered" && item.recovered}
                </Text>
              </Callout>
            </MapView.Marker>
          ))}
        </MapView>
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  map: {
    height: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descCases: {
    color: "red",
    textAlign: "center",
  },
});
