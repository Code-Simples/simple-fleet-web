import { useCallback, useEffect, useRef, useState } from 'react'

import { env } from '@/env'

interface Coord {
  latitude: number
  longitude: number
  timestamp: number
}

interface WebSocketMessage {
  _id: string
  coords: Coord[]
  created_at: string
  description: string
  license_plate: string
  status: string
  updated_at: string
  user_id: string
  user_name: string
}

export function useWebSocket() {
  const [messages, setMessages] = useState<WebSocketMessage[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef<WebSocket | null>(null)

  const handleOpen = useCallback(() => {
    console.log('WebSocket connection established')
    setIsConnected(true)
  }, [])

  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const data: WebSocketMessage = JSON.parse(event.data)
      setMessages(() => [data])
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error)
    }
  }, [])

  const handleClose = useCallback(() => {
    console.log('WebSocket connection closed')
    setIsConnected(false)
  }, [])

  const handleError = useCallback((error: Event) => {
    console.error('WebSocket error:', error)
  }, [])

  useEffect(() => {
    const socket = new WebSocket('ws://' + env.VITE_API_URL)
    socketRef.current = socket

    socket.addEventListener('open', handleOpen)
    socket.addEventListener('message', handleMessage)
    socket.addEventListener('close', handleClose)
    socket.addEventListener('error', handleError)

    return () => {
      socket.removeEventListener('open', handleOpen)
      socket.removeEventListener('message', handleMessage)
      socket.removeEventListener('close', handleClose)
      socket.removeEventListener('error', handleError)
      socket.close()
    }
  }, [handleOpen, handleMessage, handleClose, handleError])

  return { messages, isConnected }
}
