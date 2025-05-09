import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { signIn } from "@/lib/auth"

const GoogleSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button className="w-full" variant="outline">
        <>
            <Icons.google className="mr-2 size-4" />
            Google
        </>
      </Button>
    </form>
  );
};

export { GoogleSignIn };