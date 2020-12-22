import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const Chart = ({ country }) => {
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    let uri = `https://disease.sh/v3/covid-19/historical/tunisia?lastdays=7 `;
    // setActive("global");
    if (country) {
      uri = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=7`;
      // setActive(country);
    }

    axios.get(uri).then((res) => {
      setValues(Object.values(res.data.timeline.cases));
      setKeys(
        Object.keys(res.data.timeline.cases).map(
          (key) =>
            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
              new Date(key).getDay()
            ]
        )
      );
    });
  }, [country]);

  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 40,
      }}
    >
      {values.length > 0 && keys.length > 0 && (
        <LineChart
          data={{
            labels: keys,
            datasets: [
              {
                data: values,
              },
            ],
          }}
          width={Dimensions.get("window").width}
          height={320}
          yAxisSuffix="k"
          yAxisInterval={1}
          yAxisSuffix="k"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#FFF",
            backgroundGradientFrom: "#FFF",
            backgroundGradientTo: "#FFF",
            decimalPlaces: 2,
            color: (opacity = 0) => `rgba(255,0,0, ${opacity})`,
            labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "red",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
};

export default Chart;
