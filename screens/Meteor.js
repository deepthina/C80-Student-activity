import React from "react";
import { View, Text } from "react-native";
import axios from "axios";

export default class Meteor extends React.Component {
  constructor() {
    super();
    this.state = {
      meteors: {},
    };
  }
  componentDidMount() {
    this.getMeteors();
  }
  getMeteors = () => {
    axios
      .get(
        "https://api.nasa.gov/neo/rest/v1/feed?start_date=2022-03-17&end_date=2022-03-23&api_key=wi0DvkdQmY0BtAtmQb5Xh0Y59ZhZhSGeQdqbOMeg"
      )
      .then((response) => {
        this.setState({ meteors: response.data.near_earth_objects });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  render() {
    if (Object.keys(this.state.meteors).length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      );
    } else {
      var meteor_Arr = Object.keys(this.state.meteors).map((meteor_date) => {
        // console.log(this.state.meteors[meteor_date]);

        return this.state.meteors[meteor_date];
      });

      var meteors = [].concat.apply([], meteor_Arr);
      //console.log(meteors);

      meteors.forEach(function (element) {
        let diameter =
          (element.estimated_diameter.kilometers.estimated_diameter_min +
            element.estimated_diameter.kilometers.estimated_diameter_max) /
          2;

        //threat_score = diameter/distance by which the meteor misses Earth
        let threatScore =
          (diameter / element.close_approach_data[0].miss_distance.kilometers) *
          1000000000;
        element.threat_score = threatScore;
        //console.log(threatScore);
      });
      return (
        <View>
          <Text>Meteor Screen</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  andriodStyle: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  titleBar: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  meteorContainer: {
    flex: 0.85,
  },
  listContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 10,
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "white",
  },
  cardText: {
    color: "white",
  },
  threatDetector: {
    height: 10,
    marginBottom: 10,
  },
  gifContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  meteorDataContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
