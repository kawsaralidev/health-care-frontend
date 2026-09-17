import VerifyAccountForm from "@/components/form/verifyAccountForm";
import Link from "next/link";
import { Suspense } from "react";

const VerifyDoctorAccountPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-1">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex items-center gap-2">
              <span>Healthcare</span>
            </div>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Suspense fallback={<p>Loading...</p>}>
              <VerifyAccountForm mode="doctor" />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyDoctorAccountPage;
