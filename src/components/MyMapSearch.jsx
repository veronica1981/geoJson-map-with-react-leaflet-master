import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import mapData from "./../data/countries.json";
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));
export default function MapSearch() {
  const classes = useStyles();
  const localityStyle = {
    fillColor: "white",
    fillOpacity: 1,
    color: "black",
    weight: 2,
  };
  const position = [51.505, -0.09];

  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);


  const geoJsonRef = useRef();
  const geoJSON = mapData.features;
  const [selectValue, setSelectValue] = useState("");

  const changelocalityColor = (event) => {
    event.target.setStyle({
      color: "green",
      fillColor: 'red',
      fillOpacity: 1,
    });
  };

  const handleEachFeature = (locality, layer) => {
    layer._polygonId = locality.properties.postcode;
    const districtName = locality.properties.locality + "  " + locality.properties.postcode;
    layer.bindPopup(districtName);
    layer.on({
      click: changelocalityColor,
    });
  };

  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    setSelectValue(newDistrict);

    if (!newDistrict) return;

    const layer = geoJsonRef.current
      .getLayers()
      .find((layer) => layer._popup._content === newDistrict);
    layer.openPopup();
 
   

  };

  return (
    <>
        <MapContainer zoom={6} center={[51.505, -0.09]}>
   
        {geoJSON && (
          <GeoJSON
          style={localityStyle}
            data={geoJSON}
            onEachFeature={handleEachFeature}
            ref={geoJsonRef}
          />
        )}
      </MapContainer>
      {
      console.log(".............."+geoJsonRef.current)
    }
      <select value={selectValue} onChange={handleDistrictChange}>
        <option value="">Select a district</option>
        {geoJsonRef.current
          ?.getLayers()
          .map((layer) => layer._popup._content)
          .map((district, index) => (
            <option key={`district-${index}`} value={district}>
              {district}
            </option>
          ))}
      </select>
      <Paper component="ul" className={classes.root}>
      {chipData.map((data) => {
        let icon;

      

        return (
          <li key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete= {undefined}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Paper>
     
    </>
  );
}
