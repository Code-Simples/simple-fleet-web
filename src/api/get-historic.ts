import { api } from '@/lib/axios'

interface Coord {
  latitude: number
  longitude: number
  timestamp: number
}

export interface GetHistoricResponse {
  _id: string
  coords: Coord[]
  user_id: string
  user_name: string
  license_plate: string
  description: string
  status: string
  created_at: string
  updated_at: string
}

export async function getHistoric() {
  const response = await api.get<GetHistoricResponse>(`/historics`)

  return response.data
}
