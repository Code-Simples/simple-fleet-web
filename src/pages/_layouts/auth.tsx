import { Car } from "lucide-react";
import { Outlet } from "react-router-dom";

// import background from "@/assets/background.svg";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="hidden flex-col justify-between bg-muted p-10 text-muted-foreground md:flex">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Car className="h-6 w-6 text-muted-foreground" />
          <span className="font-leckerli-one flex flex-row text-3xl tracking-wider text-primary">
            Simple<p className="text-muted-foreground">Fleet</p>
          </span>
        </div>

        {/* <img src={background} className="ml-16 mt-16 w-2/3" /> */}

        <footer className="text-sm">
          Simple Fleet &copy; simplefleet - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center p-6 md:p-10">
        <div className="flex items-center gap-3 text-lg text-foreground md:hidden">
          <Car className="h-6 w-6 text-muted-foreground" />
          <span className="font-leckerli-one flex flex-row text-3xl tracking-wider text-primary">
            Barb<p className="text-muted-foreground">agenda</p>
          </span>
        </div>
        <div className="flex w-full max-w-xs flex-col items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
