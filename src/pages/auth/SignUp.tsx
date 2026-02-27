import { useState } from "react";
import {
  Eye,
  EyeClosed,
  Mail,
  MailCheck,
  MailMinus,
  Lock,
  LockOpen,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore";
import { signUpSchema, type signUpFormData } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "../../services/authService";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const { isLoading: authLoading } = useAuthStore();
  const [eye, setEye] = useState<boolean>(false);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<signUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", username: "" },
    mode: "onChange",
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  // Derived icon states — computed every render, no setters/loops
  const emailIconStatus = errors.email
    ? "error"
    : emailValue && !errors.email
      ? "success"
      : "neutral";

  const passwordIconStatus =
    errors.password || (passwordValue && passwordValue.length < 8)
      ? "warning"
      : passwordValue
        ? "secure"
        : "neutral";

  const handleEye = () => {
    setEye(!eye);
  };

  const onSubmit = async (data: signUpFormData) => {
    try {
      await signUp(data);
      console.log(data);
      toast.success("Account Created Successfully!");
      navigate('/sign-in');
    } catch (error: any) {
      let message = "Something went wrong. Please try again.";

      if (error?.message?.includes("User already registered")) {
        message = "This email is already in use. Please sign in instead.";
        setError("email", { type: "manual", message });
      } else if (error?.message?.includes("Password")) {
        message =
          "Password requirements not met. Please choose a stronger one.";
        setError("password", { type: "manual", message });
      } else if (error?.status >= 500 || error?.status === 0) {
        message = "Server is having issues right now. Try again later.";
        setError("root", { type: "server_error", message });
      } else {
        message = error?.message || "Failed to create account";
        setError("root", { type: "manual", message });
      }

      toast.error(message, { duration: 5000 });
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#10B981]" />
        <span className="ml-3 text-gray-700">Checking session...</span>
      </div>
    );
  }

  // Email icon logic (runs on change/blur)
  // const updateEmailIcon = () => {
  //   if (errors.email) {
  //     setEmailStatus("error");
  //   } else if (watchedEmail && !errors.email) {
  //     setEmailStatus("success");
  //   } else {
  //     setEmailStatus("neutral");
  //   }
  // };

  // Password icon logic
  // const updatePasswordIcon = () => {
  //   const pwd = getValues("password");
  //   if (errors.password || (pwd && pwd.length < 8)) {
  //     setPasswordStatus("warning");
  //   } else if (pwd) {
  //     setPasswordStatus("secure");
  //   } else {
  //     setPasswordStatus("neutral");
  //   }
  // };

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
          sign up to finance tracker
        </h1>
        <p className="mt-2 text-gray-600">
          Start tracking your money and chop life responsibly.
        </p>
      </div>

      {/* Form */}
      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* username */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            {...register("username", { required: true, maxLength: 10 })}
            placeholder="Enter your username..."
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.username ? "border-red-500" : "border-gray-200"
            } focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 outline-none transition-all bg-gray-50/50`}
            onBlur={() => {
              if (errors.username) {
                toast.error(errors.username.message);
              }
            }}
          />
          {errors.username && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.username.message}
            </p>
          )}
        </div>
        {/* {errors.password && <p className="text-sm text-red-600 mt-">{errors.userName?.message}</p>} */}

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <div
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border ${
              errors.email ? "border-red-500" : "border-gray-200"
            } focus-within:border-[#10B981] focus-within:ring-2 focus-within:ring-[#10B981]/20 bg-gray-50/50 transition-all`}
          >
            {emailIconStatus === "success" ? (
              <MailCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
            ) : emailIconStatus === "error" ? (
              <MailMinus className="h-5 w-5 text-red-500 flex-shrink-0" />
            ) : (
              <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
            )}

            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email address..."
              className="w-full border-none outline-none bg-transparent placeholder:text-gray-400"
              // onBlur={() => updateEmailIcon()}
              // onChange={() => updateEmailIcon()}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <div
            className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border ${
              errors.password ? "border-red-500" : "border-gray-200"
            } focus-within:border-[#10B981] focus-within:ring-2 focus-within:ring-[#10B981]/20 bg-gray-50/50 transition-all`}
          >
            <div className="flex items-center gap-3 flex-1">
              {passwordIconStatus === "warning" ? (
                <LockOpen className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              ) : (
                <Lock className="h-5 w-5 text-gray-500 flex-shrink-0" />
              )}

              <input
                type={eye ? "text" : "password"}
                {...register("password")}
                placeholder="Enter your password..."
                className="w-full border-none outline-none bg-transparent placeholder:text-gray-400"
                // onBlur={() => updatePasswordIcon()}
                // onChange={() => updatePasswordIcon()}
              />
            </div>
            <button
              type="button"
              onClick={handleEye}
              className="focus:outline-none"
            >
              {eye ? (
                <EyeClosed className="h-5 w-5 text-gray-500 cursor-pointer" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500 cursor-pointer" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {errors.root && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {errors.root.message}
          </div>
        )}

        {/* Terms */}
        {/* <p className="text-xs text-gray-500 leading-relaxed">
          By signing up, you agree to our <span className="text-[#10B981] font-medium cursor-pointer">Terms of Service</span> and <span className="text-[#10B981] font-medium cursor-pointer">Privacy Policy</span>.
        </p> */}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full capitalize bg-[#0A0D0C] text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-lg active:scale-[0.98] cursor-pointer"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing up...
            </span>
          ) : (
            "create account"
          )}
        </button>

        {/* Social Divider */}
        {/* <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-gray-400 font-medium">Or continue with</span></div>
        </div> */}

        {/* Google Button */}
        {/* <button 
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
          Google
        </button> */}
      </form>

      {/* Footer Link */}
      {/* <p className="text-center text-sm text-gray-600"> */}
      {/* I Already have an account?{' '} */}
      <div className="m-auto w-fit">
        <Link
          to="/sign-in"
          className="font-bold text-[#10B981] text-sm underline text-center capitaliz w-fit m-auto "
        >
          I already have an account
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
