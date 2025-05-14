"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import SearchMap from "./SearchMap";
import { Home, X } from "lucide-react";
import { renderToString } from "react-dom/server";
import { Point } from "geojson"; 
import { MapSearchItems } from "@/types/mapSearch";
import { GeoJsonProperties } from "geojson";
import { UnitModelModel } from "@/types/Unit";
import {
  getUnitsForPropertyId,
} from "@/services/map-search";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import DrawIcon from "/public/map/draw.png";
import InReach from "/public/map/reach.png";
import NearMe from "/public/map/nearme.png";
import Image from "next/image";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import LoaderSpinner from "../Loader";
import { MapCard } from "./MapCard";
import { filtersAtom } from "@/atoms/MapFilterAtoms";
import { getFilterationSearchUnits } from "@/services/map-search-refactor";
export const mapItemsAtom = atom<MapSearchItems[]>([]);
export const unitsItemAtom = atom<UnitModelModel[]>([]);
export const activePointClickedAtom = atom<GeoJsonProperties | null>(null);

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface MapFeatureProperties {
  title: string;
  id: number;
  count: number;
}

const MapSearch = () => {
  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const [activePointClicked, setActivePointClicked] = useAtom(
    activePointClickedAtom
  );


  const setMapItems = useSetAtom(mapItemsAtom);
  const setUnitItems = useSetAtom(unitsItemAtom);
  const mapItems = useAtomValue(mapItemsAtom);
  const unitItems = useAtomValue(unitsItemAtom);
  const [isDrawing, setIsDrawing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters] = useAtom(filtersAtom);

  const { operationType } = filters;
  const handleNearMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (mapRef.current) {
            mapRef.current.flyTo({
              center: [longitude, latitude],
              zoom: 14,
              essential: true,
            });
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const updateMapLayers = () => {
    if (!mapRef.current) return;
  
    // Remove existing layers before adding new ones
    const removeLayerIfExists = (layerId: string) => {
      if (mapRef.current?.getLayer(layerId)) {
        mapRef.current?.removeLayer(layerId);
      }
    };
  
    const removeSourceIfExists = (sourceId: string) => {
      if (mapRef.current?.getSource(sourceId)) {
        mapRef.current?.removeSource(sourceId);
      }
    };
  
    // Remove layers
    removeLayerIfExists("clusters-shadow");
    removeLayerIfExists("clusters");
    removeLayerIfExists("cluster-count");
    removeLayerIfExists("property-points-bg");
    removeLayerIfExists("property-points");
  
    // Remove source
    removeSourceIfExists("properties");
  
    // Check if data is empty
    if (!mapItems || mapItems.length === 0) {
      return; // Stop execution if there's no data
    }
  
    // Construct GeoJSON
    const geojsonData: GeoJSON.FeatureCollection<GeoJSON.Geometry, MapFeatureProperties> = {
      type: "FeatureCollection",
      features: mapItems.map((property) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [property?.location?.lng ?? 0, property?.location?.lat ?? 0],
        },
        properties: {
          title: property.title ?? "Untitled",
          id: property?.id,
          count: property?.units_count ?? 0,
        },
      })),
    };
  
    // Add source
    mapRef.current?.addSource("properties", {
      type: "geojson",
      data: geojsonData,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });
  
    // Add layers
    mapRef.current?.addLayer({
      id: "clusters-shadow",
      type: "circle",
      source: "properties",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": "rgba(0, 0, 0, 0.3)",
        "circle-radius": ["step", ["get", "point_count"], 24, 10, 34, 50, 44],
        "circle-blur": 1.5,
      },
    });
  
    mapRef.current?.addLayer({
      id: "clusters",
      type: "circle",
      source: "properties",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": "#E0592A",
        "circle-radius": ["step", ["get", "point_count"], 20, 10, 30, 50, 40],
        "circle-stroke-width": 2,
        "circle-stroke-color": "#FFFFFF",
      },
    });
  
    mapRef.current?.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "properties",
      filter: ["has", "point_count"],
      layout: {
        "text-field": ["get", "point_count"],
        "text-size": 16,
      },
      paint: {
        "text-color": "#FFFFFF",
      },
    });
  
    mapRef.current?.addLayer({
      id: "property-points-bg",
      type: "circle",
      source: "properties",
      filter: ["!has", "point_count"],
      paint: {
        "circle-radius": 20,
        "circle-color": "#007cbf",
        "circle-opacity": 0.9,
        "circle-stroke-width": 3,
        "circle-stroke-color": "#ffffff",
      },
    });
  
    mapRef.current?.addLayer({
      id: "property-points",
      type: "symbol",
      source: "properties",
      filter: ["!has", "point_count"],
      layout: {
        "icon-image": "home-icon",
        "icon-size": 0.6,
        "icon-offset": [-7, 0],
        "text-field": ["get", "count"],
        "text-size": 12,
        "text-offset": [0.6, 0],
        "text-anchor": "left",
      },
      paint: {
        "text-color": "#ffffff",
        "text-halo-color": "#ffffff",
        "text-halo-width": 0.3,
      },
    });
  };


  useEffect(() => {
    const timer = setTimeout(async () => {
      const dataMapItems = await getFilterationSearchUnits<MapSearchItems[]>({
        pageSize: 1,
        pageNumber: 10,
      });
      
      setMapItems(dataMapItems);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    updateMapLayers();
  }, [mapItems]);

  useEffect(() => {
    if (!mapContainerRef.current || !MAPBOX_ACCESS_TOKEN) return;

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [54.3773, 24.4539],
        zoom: 7,
      });

      mapRef.current.scrollZoom.disable();


      mapRef.current.on("load", () => {
        const homeIcon = renderToString(<Home size={24} color="#FFFFFF" />);
        const img = new window.Image();
        img.onload = () => {
          mapRef.current?.addImage("home-icon", img);
          
          updateMapLayers();
        };

        img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
          homeIcon
        )}`;
      });

      mapRef.current?.on("click", "clusters", (e) => {
        const features = mapRef.current?.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
      
        if (!features || !features.length) return;
      
        const clusterId = features[0].properties?.cluster_id;
        const source = mapRef.current?.getSource("properties") as mapboxgl.GeoJSONSource;
      
        if (source && clusterId) {
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err || zoom == null) return;
      
            const point = features[0].geometry as Point;
      
            mapRef.current?.easeTo({
              center: point.coordinates as [number, number],
              zoom: zoom,
            });
          });
        }
      });

      mapRef.current?.on("click", "property-points-bg", (e) => {
        const features = mapRef.current?.queryRenderedFeatures(e.point, {
          layers: ["property-points-bg"],
        });
      
        if (!features || !features.length) return;
      
        const clickedProperty = features[0].properties;
        setActivePointClicked(clickedProperty);
      
        const geometry = features[0]?.geometry;
      
        if (
          geometry &&
          (geometry.type === "Point" ||
            geometry.type === "LineString" ||
            geometry.type === "Polygon")
        ) {
          const coordinates = geometry.coordinates;
      
          if (
            Array.isArray(coordinates) &&
            coordinates.length === 2 &&
            typeof coordinates[0] === "number" &&
            typeof coordinates[1] === "number"
          ) {
            mapRef.current?.easeTo({
              center: coordinates as [number, number],
              zoom: 14, // Adjust the zoom level as needed
            });
          } else {
            console.error("Invalid coordinates:", coordinates);
          }
        } else {
          console.error("Invalid geometry type or missing coordinates:", geometry);
        }
      });
      mapRef.current.on("click", () => {
        mapRef.current?.scrollZoom.enable();
  
        setTimeout(() => {
          mapRef.current?.scrollZoom.disable();
        }, 2000);
      });

      return () => {
        mapRef.current?.remove();
        mapRef.current = null;
      };
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current || !mapItems?.length) return;

    const source = mapRef.current.getSource(
      "properties"
    ) as mapboxgl.GeoJSONSource;

    if (source) {
      source.setData({
        type: "FeatureCollection",
        features: mapItems.map((property) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              property?.location?.lng ?? 0,
              property?.location?.lat ?? 0,
            ],
          },
          properties: {
            title: property.title ?? "Untitled",
            id: property?.id,
            count: property?.units_count ?? 0,
          },
        })),
      });
    }
  }, [mapItems]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const fetchData = async () => {
      if (activePointClicked && activePointClicked.id) {
        setLoading(true);

        const property_id = parseInt(activePointClicked.id);
        const units = await getUnitsForPropertyId({
          propertyId: property_id,
          operationType,
        });
   
        setUnitItems(units.items);

        timer = setTimeout(() => {
          setLoading(false);
        }, 0);
      }
    };

    fetchData();

    return () => clearTimeout(timer);
  }, [activePointClicked]);

  const handleDrawToggle = () => {
    if (mapRef.current) {
      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      });

      if (mapRef.current && draw) {
        mapRef.current.addControl(draw, "bottom-right");
      }

      setIsDrawing(!isDrawing);
    }
  };

  const handleCloseUnits = () => {
    setUnitItems([]);
    setActivePointClicked(null);
  };

  return (
    <div className="h-[calc(100vh-200px)] sm:h-[70vh] w-full relative overflow-hidden">
    <SearchMap className="overflow-visible" mapContainerRef={mapRef} />
    <div
      id="map-container"
      className="h-full w-full border"
      ref={mapContainerRef}
    />
  
    <div className="absolute bottom-4 left-4 flex flex-col gap-2 sm:bottom-8 sm:left-8 sm:gap-4">
      <button
        onClick={handleNearMe}
        className="bg-white text-black p-2 rounded-lg shadow-md text-[12px] flex items-center flex-col gap-1"
      >
        <Image src={NearMe} alt="Near Me" width={23} height={23} />
        <span className="max-sm:hidden">Near me</span>
      </button>
      <button
        onClick={handleDrawToggle}
        className="bg-white text-black p-2 rounded-lg shadow-md text-[12px] flex items-center flex-col gap-1"
      >
        <Image src={DrawIcon} alt="Draw" width={23} height={23} />
        <span className="max-sm:hidden">Draw</span>
      </button>
      <button
        onClick={handleNearMe}
        className="bg-white text-black p-2 rounded-lg shadow-md text-[12px] flex items-center flex-col gap-1"
      >
        <Image src={InReach} alt="In Reach" width={23} height={23} />
        <span className="max-sm:hidden">InReach</span>
      </button>
    </div>
  
    {unitItems && (
      <OverlayScrollbarsComponent
        element="span"
        options={{
          scrollbars: {
            autoHide: "leave",
            autoHideDelay: 500,
          },
        }}
        className="custom-scrollbar absolute right-2 top-2 w-full max-w-[calc(100%-16px)] sm:right-8 sm:top-[110px] sm:w-[450px] sm:max-w-none max-h-[calc(100vh-150px)] sm:max-h-[calc(100vh-300px)] overflow-auto space-y-4"
        defer
      >
        {activePointClicked && unitItems && (
          <div className="space-y-2 bg-white p-3 border-1 border-[#ECECEC] rounded-md">
            {loading ? (
              <div className="flex justify-center items-center h-[500px]">
                <LoaderSpinner />
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center px-2 pb-3">
                  <h3 className="text-[#414042] text-lg sm:text-[20px]">
                    {unitItems[0]?.property_name
                      ? unitItems[0]?.property_name
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")
                      : ""}
                  </h3>
                  <X
                    className="text-[#414042]"
                    size={23}
                    onClick={handleCloseUnits}
                  />
                </div>
                {unitItems.map((item) => (
                  <MapCard key={item.id} item={item} />
                ))}
              </>
            )}
          </div>
        )}
      </OverlayScrollbarsComponent>
    )}
  </div>
  );
};

export default MapSearch;
