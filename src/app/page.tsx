import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react";



const Page = async () => {
  const session = await auth();

  // Redirect to sign-in page if not authenticated
  if (!session) {
    redirect("/sign-in")
  }

  return (
    <>
      <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
        <p className="text-gray-600">Signed in as: {session.user?.email}</p>
        <div className="flex justify-center mt-2">
          <Avatar>
            {session.user?.image ? (
              <AvatarImage src={session.user.image || undefined} alt="User Avatar" />
            ) : null}
            <AvatarFallback>
              {session.user?.image
                ? session.user?.name?.charAt(0)
                : <User className="w-5 h-5" />}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <SignOut />
    </>
  );
};

export default Page;
