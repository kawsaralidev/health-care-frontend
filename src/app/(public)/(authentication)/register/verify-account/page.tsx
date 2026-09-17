import VerifyAccountForm from "@/components/form/verifyAccountForm";

const VerifyAccountPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <VerifyAccountForm mode="patient" />
    </main>
  );
};

export default VerifyAccountPage;
