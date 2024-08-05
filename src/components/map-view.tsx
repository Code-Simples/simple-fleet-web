import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from '@react-google-maps/api'
import { MapIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { env } from '@/env'

interface MapViewProps {
  coords: {
    latitude: number
    longitude: number
    timestamp: number
  }[]
}

export function MapView({ coords }: MapViewProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null)

  const position = {
    lat: coords[0].latitude,
    lng: coords[0].longitude,
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places', 'directions' as 'geometry'],
  })

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  useEffect(() => {
    if (isLoaded && coords.length > 1) {
      const directionsService = new google.maps.DirectionsService()
      const origin = new google.maps.LatLng(
        coords[0].latitude,
        coords[0].longitude,
      )
      const destination = new google.maps.LatLng(
        coords[coords.length - 1].latitude,
        coords[coords.length - 1].longitude,
      )
      const waypoints = coords.slice(1, -1).map((coord) => ({
        location: new google.maps.LatLng(coord.latitude, coord.longitude),
        stopover: false,
      }))

      directionsService.route(
        {
          origin,
          destination,
          waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirectionsResponse(result)
          } else {
            console.error(`Error fetching directions: ${status}`, result)
          }
        },
      )
    }
  }, [isLoaded, coords])

  if (!isLoaded) {
    return <div>Carregando...</div>
  }

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
          <DialogDescription>
            {coords[0].timestamp && (
              <Label>
                {`Saída em ${new Date(coords[0].timestamp).toLocaleString()}`}
              </Label>
            )}

            {coords.length > 1 && (
              <>
                <br></br>
                <Label>
                  {`Chegada em ${new Date(
                    coords[coords.length - 1].timestamp,
                  ).toLocaleString()}`}
                </Label>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <GoogleMap
          onLoad={onLoad}
          onUnmount={onUnmount}
          mapContainerStyle={{
            width: '100%',
            height: '800px',
            borderRadius: '8px',
          }}
          center={position}
          zoom={15}
        >
          {directionsResponse && (
            <DirectionsRenderer
              options={{
                directions: directionsResponse,
                suppressMarkers: false,
                polylineOptions: {
                  strokeColor: '#D3500C',
                  strokeOpacity: 0.7,
                  strokeWeight: 7,
                },
              }}
              directions={directionsResponse}
            />
          )}
        </GoogleMap>
      </DialogContent>
    </Dialog>
  )
}
