// ============================================================================
// ArcGIS Maps & Scenes Tutorial
// ============================================================================

/*
Skipped the display a custom basemap sytle
*/

require(["esri/config", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/Graphic", "esri/layers/GraphicsLayer", "esri/views/SceneView", "esri/widgets/BasemapToggle", "esri/widgets/BasemapGallery"], 
    
    function(esriConfig, Map, MapView, FeatureLayer) { //Add here from above

        // Your API KEY
        esriConfig.apiKey = "AAPK9186db7ac712462f993ee74dbab2ea5alOWylmpxBi7cBhK6aozgfEB32gpqW0j48pmktA-Re0TWMR1mtLC0evuyqI_hAiSh";

        const map = new Map({
            basemap: "arcgis-topographic" // Basemap layer service
            //ground: "world-elevation" //Elevation service
        });

        const view = new MapView({ //2D View
            map: map, 
            center: [-118.805, 34.027], // Longitude, Latitude
            zoom: 13, // Zoom level
            container: "viewDiv", // Div Element Container !!!
        });

//POPUP FOR TRAILHEADS - ATTRIBUTES
        const popupTrailheads = {
            "title": "Trailhead",
            "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft" // Extract from layer fields
        }

        const trailheads = new FeatureLayer({
            url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
            outFields: ["TRL_NAME","CITY_JUR","X_STREET","PARKING","ELEV_FT"],
            popupTemplate: popupTrailheads
          });
    
          map.add(trailheads);

          /*
//TRAILHEAD POINT FEATURE LAYER
        const trailheadsRenderer = {
            "type": "simple",
            "symbol": {
                "type": "picture-marker",
                "url": "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
                "width": "18px",
                "height": "18px"
            }
        }

        const trailheadsLabels = {
            symbol: {
              type: "text",
              color: "#FFFFFF",
              haloColor: "#5E8D74",
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
              expression: "$feature.TRL_NAME" //Access a feature in the data: TRL_NAME
            }
          };

        const trailheadsLayer = new FeatureLayer({
            url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
            render: trailheadsRenderer,
            labelingInfo: [trailheadsLabels]
        });

        map.add(trailheadsLayer);
        */

//TRAIL LINE FEATURE - DISPLAY POPUP CHARTS

        const popupTrails = {
            title: "Trail Information",
            content: [{
            type: "media",
            mediaInfos: [{
                type: "column-chart",
                caption: "",
                value: {
                fields: [ "ELEV_MIN","ELEV_MAX" ],
                normalizeField: null,
                tooltipField: "Min and max elevation values"
                }
                }]
            }]
        }

        const trails = new FeatureLayer({
            url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
            outFields: ["TRL_NAME","ELEV_GAIN"],
            popupTemplate: popupTrails
          });
    
          map.add(trails,0);

/*
//TRAIL LINE FEATURE LAYER
        const trailsRenderer = {
            type: "simple",
            symbol: {
                color: "#BA55D3",
                type: "simple-line",
                style: "solid"
            },

            visualVariables: [
                {
                type: "size",
                field: "ELEV_GAIN", //ELEV_GAIN field to determine line width
                minDataValue: 0,
                maxDataValue: 2300,
                minSize: "3px",
                maxSize: "7px"
                }
            ]
            };

        const trails = new FeatureLayer({
            url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0", 
            renderer: trailsRenderer,
            opacity: 0.75
        });

        map.add(trails,0);

        //Bike only trails
        const bikeTrailsRenderer = {
            type: "simple",
            symbol: {
                type: "simple-line",
                style: "short-dot",
                color: "#000000",
                width: "2px"
            }
        };

        const bikeTrails = new FeatureLayer({
            url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
            renderer: bikeTrailsRenderer,
            definitionExpression: "USE_BIKE = 'YES'" //Mask to poly only trails with USE_BIKE='YES'
          });
    
          map.add(bikeTrails, 1);

*/

//PLOYGON FEATURE - DISPLAY A TABLE
    const popupOpenspaces = {
        "title": "{PARK_NAME}",
        "content": [{
        "type": "fields",
        "fieldInfos": [
            {
            "fieldName": "AGNCY_NAME",
            "label": "Agency",
            "isEditable": true,
            "tooltip": "",
            "visible": true,
            "format": null,
            "stringFieldOption": "text-box"
            },
            {
            "fieldName": "TYPE",
            "label": "Type",
            "isEditable": true,
            "tooltip": "",
            "visible": true,
            "format": null,
            "stringFieldOption": "text-box"
            },
            {
            "fieldName": "ACCESS_TYP",
            "label": "Access",
            "isEditable": true,
            "tooltip": "",
            "visible": true,
            "format": null,
            "stringFieldOption": "text-box"
            },

            {
            "fieldName": "GIS_ACRES",
            "label": "Acres",
            "isEditable": true,
            "tooltip": "",
            "visible": true,
            "format": {
                "places": 2,
                "digitSeparator": true
            },

            "stringFieldOption": "text-box"
            }
        ]
        }]
    }
    const openspaces = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
        outFields: ["TYPE","PARK_NAME", "AGNCY_NAME","ACCESS_TYP","GIS_ACRES","TRLS_MI","TOTAL_GOOD","TOTAL_FAIR", "TOTAL_POOR"],
        popupTemplate: popupOpenspaces
      });

      map.add(openspaces,0);

/*
//PARKS POLYGON FEATURE LAYER
      // Add parks with a class breaks renderer and unique symbols
      function createFillSymbol(value, color) {
        return {
            "value": value,
            "symbol": {
                "color": color,
                "type": "simple-fill",
                "style": "solid",
                "outline": {
                    "style": "none"
                }
            },
          "label": value
        };
      }

      const openSpacesRenderer = {
        type: "unique-value",
        field: "TYPE",
        uniqueValueInfos: [
            createFillSymbol("Natural Areas", "#9E559C"),
            createFillSymbol("Regional Open Space", "#A7C636"),
            createFillSymbol("Local Park", "#149ECE"),
            createFillSymbol("Regional Recreation Park", "#ED5151")
        ]
      };

        const openSpaces = new FeatureLayer({
            url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
            renderer: openSpacesRenderer,
            opacity: 0.2
        });

        map.add(openSpaces, 0);
*/
        /*
//TOGGLE BASEMAP
        const basemapToggle = new BasemapToggle({ //Toggle basmap
            view: view,
            nextBasemap: "arcgis-imagery"
        });

        view.ui.add(basemapToggle, "bottom-right"); //Add basemap toggle to bottom right

//BASEMAP GALLERY
        const basemapGallery = new BasemapGallery({//Basemap gallery
            view: view,
            source: {
            query: {
                title: '"World Basemaps for Developers" AND owner:esri'
            }
            }
        });

        view.ui.add(basemapGallery, "top-right"); //Add basemap gallery to top right

//3D VIEWER
        const view = new SceneView({ //3D View
            container: "viewDiv",
            map: map,
            camera: {
            position: {
                x: -118.808, //Longitude
                y: 33.961, //Latitude
                z: 2000 //Meters
            },
            tilt: 75
            }
        });
        
//ADD Point, line, or polygon graphics layers
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    const point = { //Create a point
        type: "point",
        longitude: -118.80657463861,
        latitude: 34.0005930608889
     };
     const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],  // Orange
        outline: {
            color: [255, 255, 255], // White
            width: 1
        }
     };

     const pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol
     });
     graphicsLayer.add(pointGraphic);
    
    // Create a line geometry
    const polyline = {
        type: "polyline",
        paths: [
            [-118.821527826096, 34.0139576938577], //Longitude, latitude
            [-118.814893761649, 34.0080602407843], //Longitude, latitude
            [-118.808878330345, 34.0016642996246]  //Longitude, latitude
        ]
    };
    const simpleLineSymbol = {
        type: "simple-line",
        color: [226, 119, 40], // Orange
        width: 2
    };

    const polylineGraphic = new Graphic({
        geometry: polyline,
        symbol: simpleLineSymbol
    });
    graphicsLayer.add(polylineGraphic);

    // Create a polygon geometry
    const polygon = {
        type: "polygon",
        rings: [
            [-118.818984489994, 34.0137559967283], //Longitude, latitude
            [-118.806796597377, 34.0215816298725], //Longitude, latitude
            [-118.791432890735, 34.0163883241613], //Longitude, latitude
            [-118.79596686535, 34.008564864635],   //Longitude, latitude
            [-118.808558110679, 34.0035027131376]  //Longitude, latitude
        ]
    };

    const simpleFillSymbol = {
        type: "simple-fill",
        color: [227, 139, 79, 0.8],  // Orange, opacity 80%
        outline: {
            color: [255, 255, 255],
            width: 1
        }
    };

    const popupTemplate = {
        title: "{Name}",
        content: "{Description}"
    }
    const attributes = {
        Name: "Graphic",
        Description: "I am a polygon"
    }

    const polygonGraphic = new Graphic({
        geometry: polygon,
        symbol: simpleFillSymbol,

        attributes: attributes,
        popupTemplate: popupTemplate

    });
    graphicsLayer.add(polygonGraphic);
*/

 });