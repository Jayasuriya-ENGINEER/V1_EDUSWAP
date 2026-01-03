import { useUser, SignInButton, SignOutButton } from "@clerk/clerk-react";

export default function TestAuth() {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="h-screen flex items-center justify-center">
        <SignInButton mode="modal">
          <button className="px-6 py-3 bg-indigo-500 text-white rounded-lg">
            Login
          </button>
        </SignInButton>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-xl">Hello, {user.fullName}</p>
      <SignOutButton>
        <button className="px-4 py-2 bg-red-500 text-white rounded">
          Logout
        </button>
      </SignOutButton>
    </div>
  );
}
