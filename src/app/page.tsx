import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  // Redirect to sign-in page if not authenticated
  if (!session) {
    redirect("/sign-in")
  }

  return (
    <>
      <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
        <p className="text-gray-600">Signed in as:</p>
        <p className="font-medium"></p>
      </div>

      <SignOut />
    </>
  );
};

export default Page;
