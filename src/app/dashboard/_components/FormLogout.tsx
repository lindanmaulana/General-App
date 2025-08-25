import { AuthLogout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

export const FormLogout = () => {
  return (
    <form action={AuthLogout}>
      <Button type="submit" variant={"ghost"} className="text-red-500 cursor-pointer font-semibold hover:text-gnrRed/80 flex items-center gap-2">
        <LogOutIcon />
        <span>Logout</span>
      </Button>
    </form>
  );
};
