import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
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
function MapF() {
  const classes = useStyles();
  const position = [51.505, -0.09];

  const [chipData, setChipData] = React.useState([]);

  const [map, setMap] = useState(null);
  const [selected, setSelected] = useState([]);
  const geoJsonRef = useRef();
  const [geoJSON, setGeoJSON] = useState(null);
  const [selectValue, setSelectValue] = useState("");
  const changeCountryColor = (event) => {
    event.target.setStyle({
    
      fillColor: 'red',
      fillOpacity: 1,
    });
  };
  useEffect(() => {

        setGeoJSON(mapData);
        if (geoJsonRef.current && map)
          map.fitBounds(geoJsonRef.current.getBounds());
     
  }, [map]);

  const handleEachFeature = (feature, layer) => {
    const districtName = feature.properties.locality + "  " + feature.properties.postcode;
    layer.bindPopup(districtName);
    layer.on({
      click: changeCountryColor,
    });
  };

  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    setSelectValue(newDistrict);

    if (!newDistrict) return;
    setChipData([...chipData, newDistrict]);
    const layer = geoJsonRef.current
      .getLayers()
      .find((layer) => layer._popup._content === newDistrict);
    layer.openPopup();
    layer.fire('click');
    map.fitBounds(layer.getBounds());


    console.log("------------" + chipData);
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));

  };

  return (
    <div>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "80vh" }}
        whenCreated={setMap}
      >
     
        {geoJSON && (
          <GeoJSON
            data={geoJSON}
            onEachFeature={handleEachFeature}
            ref={geoJsonRef}
          />
        )}
      </MapContainer>
      <select value={selectValue} onChange={handleDistrictChange}>
        <option value="">Postleizahl Selektion</option>
        {geoJsonRef.current
          ?.getLayers()
          .map((layer) => layer._popup._content)
          .sort()
          .map((district, index) => (
            <option key={`district-${index}`} value={district}>
              {district}
            </option>
          ))}
      </select>
      <Paper component="ul" className={classes.root}>
      { chipData &&  chipData.map((data) => {
        let icon;

        return (
          <li key={data}>
            <Chip
              icon={icon}
              label={data}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Paper>
    </div>
  );
}
export default MapF;
