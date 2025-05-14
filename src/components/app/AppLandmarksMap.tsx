"use client";

import mapboxgl, { Map, Marker } from "mapbox-gl";
import {
  ComponentProps,
  ComponentType,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { LandmarkModel } from "@/types/Shared";
import { cn, haversine } from "@/lib/utils";
import { Separator } from "../ui/separator";
import dynamic from "next/dynamic";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

type Props = {
  landmarks: LandmarkModel[];
  itemLocation: {
    lat?: number;
    lng?: number;
  };
};

export const AppLandmarksMap = ({ landmarks, itemLocation }: Props) => {
  const [activeMarkerIndex, setActiveMarkerIndex] = useState<number | null>(null);
  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<Marker[]>([]);

  const handelActiveMarkerChange = (index: number, coordinates: [number, number]) => {
    mapRef.current?.flyTo({
      center: coordinates,
      zoom: 15,
      offset: [90, 0],
    });
    setActiveMarkerIndex(index);
    markersRef.current.forEach((marker) => {
      marker.removeClassName("[&>svg>path]:fill-primary");
      marker.removeClassName("z-10");
    });
    markersRef.current[index].addClassName("[&>svg>path]:fill-primary");
    markersRef.current[index].addClassName("z-10");
  };

  const handelSetLandmarks = (landmarks: LandmarkModel[]) => {
    if (!mapRef.current) return;

    markersRef.current = [];

    let markersCoordinates: [number, number][] = [];

    landmarks.forEach((landmark) => {
      if (landmark.location.lng && landmark.location.lat) {
        const marker = new mapboxgl.Marker({
          className: `marker-${landmark.id}`,
        })
          .setLngLat([landmark.location.lng, landmark.location.lat])
          .addTo(mapRef.current!);

        markersCoordinates = [
          ...markersCoordinates,
          [landmark.location.lng, landmark.location.lat],
        ];
        markersRef.current = [...markersRef.current, marker];
      }
    });

    const boundingBox = calculateBoundingBox(markersCoordinates);
    mapRef.current.fitBounds(boundingBox, {
      padding: { top: 40, bottom: 20, left: 20, right: 20 },
      maxZoom: 15,
    });
  };

  useEffect(() => {
    const initMap = async () => {
      if (!mapContainerRef.current || !MAPBOX_ACCESS_TOKEN) return;

      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

      if (mapboxgl.getRTLTextPluginStatus() === "unavailable") {
        mapboxgl.setRTLTextPlugin("/js/mapbox-gl-rtl-text.js", null, true);
      }

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        zoom: 4,
      });

      if (itemLocation.lat && itemLocation.lng) {
        new mapboxgl.Marker({
          className: `marker-main z-10`,
          color: "#dc2626",
        })
          .setLngLat([itemLocation.lng, itemLocation.lat])
          .addTo(mapRef.current!);
      }

      handelSetLandmarks(landmarks);

      return () => {
        mapRef.current?.remove();
      };
    };

    initMap();
  }, []); 

  useEffect(() => {
    if (mapRef.current) {
      handelSetLandmarks(landmarks);
    }
  }, [landmarks]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="w-full">
        <div className="w-full h-[500px] md:h-[550px] sm:h-[600px] lg:h-[650px] xl:h-[700px]">
          <div
            id="map-container"
            className="w-full h-full rounded-lg border"
            ref={mapContainerRef}
          />
        </div>
      </div>

      <div className="relative h-[500px] md:h-[600px] sm:h-[650px] xl:h-full">
        <div className="h-[500px] md:h-[600px] sm:h-[650px] xl:h-full rounded-lg border flex flex-col overflow-hidden p-7 pb-9 absolute top-0 start-0 size-full">
          <h3 className="text-2xl font-medium">Places Nearby</h3>
          <Separator className="my-5" />
          <div className="space-y-3 [&>div]:rounded-lg [&>div]:bg-secondary-white [&>div]:p-3 text-sm font-medium overflow-auto grow primary-scrollbar">
            {landmarks.map((landmark, index) => (
              <Landmark
                key={index}
                landmark={landmark}
                index={index}
                activeMarkerIndex={activeMarkerIndex}
                onActiveMarkerChange={handelActiveMarkerChange}
                itemLocation={itemLocation}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

type LandmarkProps = {
  landmark: LandmarkModel;
  index: number;
  activeMarkerIndex: number | null;
  onActiveMarkerChange: (index: number, coordinates: [number, number]) => void;
  itemLocation: {
    lat?: number;
    lng?: number;
  };
};

const Landmark = ({
  landmark,
  index,
  activeMarkerIndex,
  onActiveMarkerChange,
  itemLocation,
}: LandmarkProps) => {
  const Icon: ComponentType<ComponentProps<"svg">> = useMemo(
    () =>
      dynamic(
        () =>
          import(`@/assets/icons/landmarks/${landmark.category.id}.svg`).catch(
            () => import(`@/assets/icons/logo.svg`)
          ),
        {
          ssr: false,
        }
      ),
    []
  );

  const distance = useMemo(() => {
    if (
      landmark.location.lat &&
      landmark.location.lng &&
      itemLocation.lat &&
      itemLocation.lng
    ) {
      return (
        haversine({
          point1: { lat: landmark.location.lat, lon: landmark.location.lng },
          point2: { lat: itemLocation.lat, lon: itemLocation.lng },
        }) * 1000
      ).toFixed(0);
    }
    return null;
  }, [landmark, itemLocation]);

  return (
    <div
      className={cn(
        "px-3 py-2 cursor-pointer flex gap-2 justify-between items-center",
        {
          "!bg-primary text-primary-foreground": activeMarkerIndex == index,
        }
      )}
      onClick={() => {
        if (landmark.location.lng && landmark.location.lat)
          onActiveMarkerChange(index, [
            landmark.location.lng,
            landmark.location.lat,
          ]);
      }}
    >
      <div className="flex gap-2.5 items-center truncate">
        <span className="size-10 flex items-center justify-center bg-primary-dark-blue/10 rounded-full shrink-0">
          <Icon className="size-5" />
        </span>
        <span className="truncate capitalize">{landmark.name}</span>
      </div>
      <span className="shrink-0">Distance: {distance}M</span>
    </div>
  );
};

function calculateBoundingBox(
  coordinates: [number, number][]
): [[number, number], [number, number]] {
  let minLat = Infinity,
    minLng = Infinity,
    maxLat = -Infinity,
    maxLng = -Infinity;

  coordinates.forEach((coord) => {
    const [lng, lat] = coord;

    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;

    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  });

  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
}
