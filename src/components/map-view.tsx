import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from '@react-google-maps/api'
import { MapIcon } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { env } from '@/env'

interface MapViewProps {
  coords: {
    latitude: google.maps.LatLngLiteral
    longitude: google.maps.LatLngLiteral
    timestamp: number
  }[]
}

export function MapView({ coords }: MapViewProps) {
  console.log(coords)
  const [map, setMap] = useState<google.maps.Map>()
  const [searchBoxA, setSearchBoxA] = useState<google.maps.places.SearchBox>()
  const [searchBoxB, setSearchBoxB] = useState<google.maps.places.SearchBox>()
  const [pointA, setPointA] = useState<google.maps.LatLngLiteral>()
  const [pointB, setPointB] = useState<google.maps.LatLngLiteral>()

  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null)
  const [destination, setDestination] =
    useState<google.maps.LatLngLiteral | null>(null)

  const [response, setResponse] =
    useState<google.maps.DistanceMatrixResponse | null>(null)

  const position = {
    // lat: coords[0].latitude,
    // lng: coords[0].longitude,
    lat: -25.45143,
    lng: -52.901748,
  }

  const onMapLoad = (map: google.maps.Map) => {
    setMap(map)
  }

  const onLoadA = (ref: google.maps.places.SearchBox) => {
    setSearchBoxA(ref)
  }

  const onLoadB = (ref: google.maps.places.SearchBox) => {
    setSearchBoxB(ref)
  }

  const onPlacesChangedA = () => {
    const places = searchBoxA!.getPlaces()
    const place = places![0]
    const location = {
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    }
    setPointA(location)
    setOrigin(null)
    setDestination(null)
    setResponse(null)
    map?.panTo(location)
  }

  const onPlacesChangedB = () => {
    const places = searchBoxB!.getPlaces()

    const place = places![0]
    const location = {
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    }
    setPointB(location)
    setOrigin(null)
    setDestination(null)
    setResponse(null)
    map?.panTo(location)
  }

  const traceRoute = () => {
    if (pointA && pointB) {
      setOrigin(pointA)
      setDestination(pointB)
    }
  }

  const directionsServiceOptions =
    // @ts-ignore
    useMemo<google.maps.DirectionsRequest>(() => {
      return {
        origin,
        destination,
        travelMode: 'DRIVING',
      }
    }, [origin, destination])

  const directionsCallback = useCallback((res) => {
    if (res !== null && res.status === 'OK') {
      setResponse(res)
    } else {
      console.log(res)
    }
  }, [])

  const directionsRendererOptions = useMemo<any>(() => {
    return {
      directions: response,
    }
  }, [response])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-2 p-2">
          <MapIcon /> Ver no mapa
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Localização</DialogTitle>
        </DialogHeader>
        <LoadScript
          googleMapsApiKey={env.GOOGLE_MAPS_API_KEY}
          libraries={['places']}
        >
          <GoogleMap
            onLoad={onMapLoad}
            mapContainerStyle={{
              width: '100%',
              height: '800px',
              borderRadius: '8px',
            }}
            center={position}
            zoom={15}
          >
            <div className="address">
              <StandaloneSearchBox
                onLoad={onLoadA}
                onPlacesChanged={onPlacesChangedA}
              >
                <input
                  className="addressField"
                  placeholder="Digite o endereço inicial"
                />
              </StandaloneSearchBox>
              <StandaloneSearchBox
                onLoad={onLoadB}
                onPlacesChanged={onPlacesChangedB}
              >
                <input
                  className="addressField"
                  placeholder="Digite o endereço final"
                />
              </StandaloneSearchBox>
              <button onClick={traceRoute}>Traçar rota</button>
            </div>

            {!response && pointA && <Marker position={pointA} />}
            {!response && pointB && <Marker position={pointB} />}

            {origin && destination && (
              <DirectionsService
                options={directionsServiceOptions}
                callback={directionsCallback}
              />
            )}

            {response && directionsRendererOptions && (
              <DirectionsRenderer options={directionsRendererOptions} />
            )}
          </GoogleMap>
        </LoadScript>
      </DialogContent>
    </Dialog>
  )
}
