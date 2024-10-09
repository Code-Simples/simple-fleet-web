import { CarFront, CheckCircle2 } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="hidden flex-col justify-between bg-muted p-10 text-muted-foreground md:flex">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <CarFront className="h-8 w-8 text-muted-foreground" />
          <span className="flex flex-row font-leckerli-one text-2xl tracking-wider text-primary">
            Simple<p className="text-muted-foreground">Fleet</p>
          </span>
        </div>

        <div className="flex flex-col pr-8 text-white">
          <div className="flex items-center gap-4 font-medium">
            <CheckCircle2 size={18} className="text-primary" />
            <p>Gerencie sua frota de veículos</p>
          </div>
          <p className="pl-10 text-sm text-muted-foreground">
            Acompanhe o status dos seus veículos em tempo real e tome decisões
            rápidas e assertivas.
          </p>

          <div className="mt-12 flex items-center gap-4 font-medium">
            <CheckCircle2 size={18} className="text-primary" />
            <p>Reduza custos operacionais</p>
          </div>
          <p className="pl-10 text-sm text-muted-foreground">
            Otimize o uso dos veículos e minimize gastos desnecessários com
            combustível e manutenção.
          </p>

          <div className="mt-12 flex items-center gap-4 font-medium">
            <CheckCircle2 size={18} className="text-primary" />
            <p>Aumente a produtividade</p>
          </div>
          <p className="pl-10 text-sm text-muted-foreground">
            Melhore o planejamento de rotas e maximize o desempenho da sua
            equipe e da sua frota.
          </p>
        </div>

        <footer className="text-sm">
          Simple Fleet &copy; simplefleet - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center p-6 md:p-10">
        <div className="flex items-center gap-3 text-lg text-foreground md:hidden">
          <CarFront className="h-6 w-6 text-muted-foreground" />
          <span className="flex flex-row font-leckerli-one text-3xl tracking-wider text-primary">
            Simple<p className="text-muted-foreground">Fleet</p>
          </span>
        </div>
        <div className="flex w-full max-w-xs flex-col items-center">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
