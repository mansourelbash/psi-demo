import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type Point = {
  lat: number
  lon: number
}
export const haversine = ({
  point1,
  point2,
}: {
  point1: Point
  point2: Point
}) => {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180

  const R = 6371 // Earth's radius in kilometers
  const dLat = toRadians(point2.lat - point1.lat)
  const dLon = toRadians(point2.lon - point1.lon)

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(point1.lat)) *
      Math.cos(toRadians(point2.lat)) *
      Math.sin(dLon / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // Distance in kilometers
}


export const formatNumber = (number: number): string => {
  const formattedNumber = new Intl.NumberFormat('en-US').format(
    +number.toFixed()
  );
  return formattedNumber;
};