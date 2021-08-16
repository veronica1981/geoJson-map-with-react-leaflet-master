import React, { Component } from "react";
import { Map, GeoJSON } from "react-leaflet";
import mapData from "./../data/countries.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

class MyMap extends Component {
  state = { color: "#ffff00", postleizahl:0 };

  colors = ["green", "blue", "yellow", "orange", "grey"];

  componentDidMount() {
    console.log(mapData);
  }

  localityStyle = {
    fillColor: "white",
    fillOpacity: 1,
    color: "black",
    weight: 2,
  };

  printMesssageToConsole = (event) => {
    console.log("Clicked");
  };

  changelocalityColor = (event) => {
    event.target.setStyle({
      color: "green",
      fillColor: this.state.color,
      fillOpacity: 1,
    });
  };

  onEachlocality = (locality, layer) => {
    const localityName = locality.properties.locality + "  " + locality.properties.postcode;
    console.log(localityName);
    layer.bindPopup(localityName);

    //layer.options.fillOpacity = Math.random(); //0-1 (0.1, 0.2, 0.3)
    // const colorIndex = Math.floor(Math.random() * this.colors.length);
    // layer.options.fillColor = this.colors[colorIndex]; //0

    layer.on({
      click: this.changelocalityColor,
    });
  };

  colorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  render() {
    return (
      <div>
        
        <Map zoom={4} center={[50, -0.09]}>
          <GeoJSON
            style={this.localityStyle}
            data={mapData.features}
            onEachFeature={this.onEachlocality}
          />
        </Map>
        <input
          type="color"
          value={this.state.color}
          onChange={this.colorChange}
        />
        <input
          type="text"
          value={this.state.postleizahl}
          onChange={this.colorChange}
        />
      </div>
    );
  }
}

export default MyMap;
