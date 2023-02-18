// ============================================================================
// ArcGIS Setup Map: Configure NL Mineral Claims/Historic Claims Here
// ============================================================================

require(["esri/config", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"], 
    
    function(esriConfig, Map, MapView, FeatureLayer) {

        // Enter API Key
        esriConfig.apiKey = "AAPK9186db7ac712462f993ee74dbab2ea5alOWylmpxBi7cBhK6aozgfEB32gpqW0j48pmktA-Re0TWMR1mtLC0evuyqI_hAiSh";

        //Setup map
        const map = new Map({
        basemap: "arcgis-imagery" // Basemap layer service
        });

        //Initial Map View
        const view = new MapView({
            map: map, 
            center: [-57.6604, 53.1355], // Longitude, Latitude
            zoom: 5, // Zoom level
            container: "viewDiv", // Div Element Container
        });

// ============================================================================
// MODS Mineral Occurrences: Point Data
// ============================================================================

        //Symbology
        const modsRender = {
            "type": "simple",
            symbol: {
                type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                size: 4,
                color: "white",
                outline: {  // autocasts as new SimpleLineSymbol()
                  width: 0.4,
                  color: "black"
                }
              }
        };

        //Label mineral occurrences
        const modsLabels = {
            symbol: {
              type: "text",
              color: "black",
              haloColor: "white",
              haloSize: "2px",
              font: {
                size: "12px",
                family: "Noto Sans",
                style: "italic",
                weight: "normal"
              }
            },
    
            labelPlacement: "above-center",
            labelExpressionInfo: {
              expression: "$feature.MODSLABEL" //Access a feature in the data to label
            }
        };

        //Popup labels when clicked
        const popupMODS = {
            "title": "Mineral Showing",
            "content": "<b>Deposit Name:</b> {DEPNAME}<br><b>Commodity:</b> {COMNAME}<br><b>Minerals:</b> {OREMIN}" // Extract from layer fields
        }

        const mods = new FeatureLayer({
            url: "https://services1.arcgis.com/wQiXe755Yh4DaqZa/arcgis/rest/services/mods/FeatureServer/0",
            renderer: modsRender,
            labelingInfo: [modsLabels],
            outFields: ["DEPNAME","COMNAME","OREMIN"],
            popupTemplate: popupMODS
        });

        mods.featureReduction = {
            type: "cluster",
            clusterMinSize: 16.5,
            // defines the label within each cluster
            labelingInfo: [
              {
                deconflictionStrategy: "none",
                labelExpressionInfo: {
                  expression: "Text($feature.cluster_count, '#,###')"
                },
                symbol: {
                  type: "text",
                  color: "black",
                  font: {
                    family: "Noto Sans",
                    size: "12px"
                  }
                },
                labelPlacement: "center-center"
              }
            ],
            // information to display when the user clicks a cluster
            popupTemplate: {
              title: "Cluster Summary",
              content: "This cluster represents <b>{cluster_count}</b> features.",
              fieldInfos: [{
                fieldName: "cluster_count",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              }]
            }
          };

        // See https://developers.arcgis.com/javascript/latest/visualization/high-density-data/clustering/ for feature reduction with MODS, could be cool to make a pie chart with different commodity showings

        map.add(mods, 1)

// ============================================================================
// MODS Mineral Occurrences: Point Data
// ============================================================================

        //Symbology
        const claimsRender = {
            type: "simple",
            symbol: {
                type: "simple-fill",
                color: "grey",
                outline: {
                    width: 1,
                    color: "black"
                }
            }
        };
    

        //Popup labels when clicked
        const popupClaims = {
            "title": "Mineral Showing",
            "content": "<b>Company: </b>{CLIENT_NAM}<br> <b>License Number: </b>{LICENSE_NB}<br> <b>Date Staked: </b>{STAKEDATE}<br> <b>Expiry Date: </b>{EXPIRYDATE}<br> <b>Expenditures: </b>{TOTAL_EXP}<br> " // Extract from layer fields
        }

        const currentClaims = new FeatureLayer({ // JS TO CHANGED THE BELOW URL FROM CURRENT TO HISTORIC CLAIMS, LAND USAGE, ect?
            url: "https://services1.arcgis.com/wQiXe755Yh4DaqZa/arcgis/rest/services/currentclaims/FeatureServer/0",
            renderer: claimsRender,
            outFields: ["CLIENT_NAM","LICENSE_NB","STAKEDATE", "EXPIRYDATE", "TOTAL_EXP"],
            popupTemplate: popupClaims,
            opacity: 0.5
        });

        map.add(currentClaims, 0)

});