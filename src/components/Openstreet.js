import React, { Component } from "react";
import {
 MapContainer,
 TileLayer,
 ZoomControl,
 WMSTileLayer,
} from "react-leaflet";

class EarList extends Component {
constructor(props) {
   super(props);
   this.mapRef = React.createRef();
 }

onViewClick = (id) => {
   this.setState({
     id: id,
     layer_name: ear.name,
   });

  // first check mapRef.current is not not then proceed with the timeout
   setTimeout(
     () => this.mapRef.current.leafletElement.
     1000
   );
 };

 render() {
     <button onClick={this.onViewClick.bind(this, id)} />
     {/* onViewClick bootstrap model */}
     <div className="modal fade map " tabIndex="-1" id="map">
         <div className="modal-dialog modal-lg">
           <div className="modal-content">
             <div className="modal-header">
               <h5 className="modal-title text-center"> layer</h5>
               <button
                 type="button"
                 className="close"
                 data-dismiss="modal"
                 aria-label="Close"
               >
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <MapContainer
              // You could also set this to state
               whenCreated={ mapInstance => { this.mapRef.current = mapInstance } }
               center={[38.861, 71.2761]}
               zoom={5}
               zoomControl={false}
               style={{ width: "100%", height: "70vh" }}
             >
               <ZoomControl position="topright" />

               <TileLayer
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
               />
             </MapContainer>
           </div>
         </div>
       </div>
};
};