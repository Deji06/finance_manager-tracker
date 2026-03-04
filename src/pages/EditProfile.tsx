import React, { useEffect } from "react";
import {
  Mail,
  MailCheck,
  MailMinus,
  Loader2,
  User,
  Phone,
  DollarSign,
  Globe,
} from "lucide-react";
import { useEditProfile, useProfile } from "../services/profileService";
import { useForm } from "react-hook-form";
import { profileUpdateSchema, type profileFormData } from "../types/financial";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<profileFormData>({
    resolver: zodResolver(profileUpdateSchema),
    mode: "onChange",
  });

  const { data: profileData } = useProfile();
  const { mutateAsync: editProfile } = useEditProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (profileData) {
      reset({
        userName: profileData.userName ?? "",
        email: profileData.email ?? "",
        phoneNumber: profileData.phoneNumber ?? "",
        currency: profileData.currency ?? "NGN",
        monthlyIncome: profileData.monthlyIncome ?? 0,
      });
    }
  }, [profileData, reset]);

  const onSubmit = async (data: profileFormData) => {
    try {
      await editProfile(data);
      console.log("email:", data.email);
      toast.success("Profile updated successfully");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.message || "Failed to update profile");
    }
  };

  const emailValue = watch("email");
  const emailIconStatus = errors.email
    ? "error"
    : emailValue && !errors.email
      ? "success"
      : "neutral";

  return (
    <>
      <h1 className=" font-bold text-gray-900 dark:text-white">
        Edit Profile
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        Update your personal information
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Username
          </label>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#1A1F1E] dark:border-gray-700 focus-within:ring-2 focus-within:ring-[#10B981]/30">
            <User className="h-5 w-5 text-gray-400" />
            <input
              {...register("userName")}
              type="text"
              className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
              placeholder="Enter your username"
            />
          </div>
          {errors.userName && (
            <p className="mt-2 text-sm text-red-500">
              {errors.userName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#1A1F1E] dark:border-gray-700 focus-within:ring-2 focus-within:ring-[#10B981]/30">
            {emailIconStatus === "success" ? (
              <MailCheck className="h-5 w-5 text-green-500" />
            ) : emailIconStatus === "error" ? (
              <MailMinus className="h-5 w-5 text-red-500" />
            ) : (
              <Mail className="h-5 w-5 text-gray-400" />
            )}
            <input
              {...register("email")}
              type="email"
              className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#1A1F1E] dark:border-gray-700 focus-within:ring-2 focus-within:ring-[#10B981]/30">
            <Phone className="h-5 w-5 text-gray-400" />
            <input
              {...register("phoneNumber")}
              type="text"
              className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
              placeholder="Enter phone number"
            />
          </div>
          {errors.phoneNumber && (
            <p className="mt-2 text-sm text-red-500">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Monthly Income
          </label>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#1A1F1E] dark:border-gray-700 focus-within:ring-2 focus-within:ring-[#10B981]/30">
            <DollarSign className="h-5 w-5 text-gray-400" />
            <input
              {...register("monthlyIncome", { valueAsNumber: true })}
              type="number"
              className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
              placeholder="Enter monthly income"
            />
          </div>
          {errors.monthlyIncome && (
            <p className="mt-2 text-sm text-red-500">
              {errors.monthlyIncome.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Currency
          </label>
          <div className=" md:w-[50%] flex items-center gap-3 px-4 py-3 rounded-xl border bg-gray-50 dark:bg-[#1A1F1E] dark:border-gray-700 focus-within:ring-2 focus-within:ring-[#10B981]/30">
            <Globe className="h-5 w-5 text-gray-400" />
            <input
              {...register("currency")}
              type="text"
              className="w-fit bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
              placeholder="NGN, USD, EUR"
            />
          </div>
          {errors.currency && (
            <p className="mt-2 text-sm text-red-500">
              {errors.currency.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2 pt-4 w-fit m-auto">
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer bg-[#10B981] hover:bg-[#0ea371] text-white font-semibold px-10 py-4 rounded-[15px] transition-all shadow-lg active:scale-[0.98] disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Updating profile....
              </span>
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
