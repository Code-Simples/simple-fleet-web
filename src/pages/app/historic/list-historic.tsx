import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { getHistoric } from '@/api/get-historic'
import { Historic } from '@/components/historic'

export function ListHistoric() {
  const { data: historic, isLoading: isLoadingHistoric } = useQuery({
    queryKey: ['historic'],
    queryFn: getHistoric,
    staleTime: Infinity,
  })

  return (
    <div>
      <Helmet title="Painel" />

      <div className="ml-8 flex flex-col p-6 md:p-10">
        {!isLoadingHistoric && historic ? (
          <Historic data={historic} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}
