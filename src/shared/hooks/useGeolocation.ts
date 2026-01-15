import { useState, useEffect } from "react";

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

const DEFAULT_LOCATION = {
  latitude: 37.5665,
  longitude: 126.978,
};

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationState>(() => {
    if (!navigator.geolocation) {
      return {
        ...DEFAULT_LOCATION,
        error: "브라우저가 위치 서비스를 지원하지 않습니다.",
        loading: false,
      };
    }

    return {
      latitude: null,
      longitude: null,
      error: null,
      loading: true,
    };
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (error) => {
        setLocation({
          ...DEFAULT_LOCATION,
          error: `위치 정보를 가져올 수 없습니다: ${error.message}`,
          loading: false,
        });
      }
    );
  }, []);

  return location;
};
