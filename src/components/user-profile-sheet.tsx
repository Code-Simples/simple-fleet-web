import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { PasswordInput } from '@/components/ui/password-input'
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function UserProfileSheet() {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Editar perfil</SheetTitle>
        <SheetDescription>
          Faça alterações em seu perfil aqui. Clique em salvar quando terminar.
        </SheetDescription>
      </SheetHeader>

      <form>
        <div className="items-center space-y-2 pt-8">
          <div className="grid grid-cols-2 items-center gap-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input className="col-span-3" id="name" />
          </div>

          <div className="items-center space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input disabled={true} className="col-span-3" id="username" />
          </div>

          {/* <div className="items-center space-y-2">
            <Label htmlFor="oldPassword">Senha antiga</Label>
            <PasswordInput className="col-span-3" id="oldPassword" />
          </div>

          <div className="items-center space-y-2 pb-8">
            <Label htmlFor="newPassword">Nova senha</Label>
            <PasswordInput className="col-span-3" id="newPassword" />
          </div> */}
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="ghost" type="button" onClick={() => null}>
              Cancelar
            </Button>
          </SheetClose>
          <Button type="submit">Salvar</Button>
        </SheetFooter>
      </form>
    </SheetContent>
  );
}
