import { LoaderIcon } from "lucide-react";

interface AuthLoadingProps {
  label?: string;
}

const AuthLoading = ({ label = "Verifying account" }: AuthLoadingProps) => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex gap-3">
        <LoaderIcon className="size-6 animate-spin" />
        <span>{label}</span>
      </div>
    </div>
  );
};

export default AuthLoading;
