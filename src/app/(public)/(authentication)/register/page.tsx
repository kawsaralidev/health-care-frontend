import RegisterForm from "@/components/form/registerForm";

const RegisterPage = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-1">
      {/* Registration form */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="mb-2 text-2xl font-semibold">Create an account</h1>

          <p className="mb-6 text-sm text-muted-foreground">
            Register to get started with PH Healthcare.
          </p>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
