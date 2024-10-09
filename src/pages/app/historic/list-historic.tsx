import { LoaderIcon } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { Historic } from '@/components/historic'
import { useWebSocket } from '@/hooks/useWebSocket'

export function ListHistoric() {
  const { messages, isConnected } = useWebSocket()
  const flattenedMessages = messages.flatMap((message) => message.data)

  return (
    <>
      <Helmet title="Painel" />

      <div className="px-8 xl:px-40">
        {isConnected ? (
          <Historic data={flattenedMessages} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoaderIcon className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
    </>
  )
}
