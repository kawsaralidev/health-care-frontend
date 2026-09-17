import DoctorApplyForm from "@/components/form/doctor-apply-form";
import Link from "next/link";

const ApplyPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-1">
      <div className="col-span-1 flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex items-center gap-2">
              <span>Healthcare</span>
            </div>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl">
            <DoctorApplyForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
