// import { useState } from "react"
// import { categoryEnum, type categoryType } from "../types/financial"
import { useProfile } from "../services/profileService"
import ThemeToggle from "./ThemeToggle"
import {
  User,
  Phone,
  Wallet,
  CreditCard,
  // CircleUserRound,
  Mail
} from "lucide-react"
import { CgLogOut } from "react-icons/cg";
import { Link, useNavigate} from "react-router-dom"
import { useAuthStore } from "../store/authStore"

// type BudgetGoals = Partial<Record<categoryType, number>>


type Props = {
  onClose: () => void
}

// const CATEGORY_LIST = categoryEnum.options

const Profile = ({
    onClose 
}: Props) => {
  const navigate = useNavigate()
  const {signOut} = useAuthStore()
  const {data, isError, isFetching, error, isLoading} = useProfile()

  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in");
    
  };


//   const handleChange = (field: keyof User, value: any) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const handleBudgetChange = (category: categoryType, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       budgetGoals: {
//         ...prev.budgetGoals,
//         [category]: value ? Number(value) : undefined,
//       },
//     }))
//   }

//   const handleSubmit = async () => {
//     console.log("Updated Profile:", formData)
//     onClose()
//   }

if (isLoading || isFetching) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="text-white">Loading profile...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="text-red-500">
          Error loading profile: {error?.message || 'Unknown error'}
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="text-white">No profile data found</div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-black/5">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#ECECEC] dark:bg-gray-900 rounded-2xl shadow-2xl p-6">
        <div className="flex justify-between items-center mb-3">
          <button onClick={onClose} className="bg-white border px-3 py-2 rounded-[10px] border-none">✕</button>
          <h2 className="text-xl  dark:text-white w-fit m-auto font-bold">
            My Profile
          </h2>
        </div>

 {/* personal info */}
        <h2 className="capitalize text-md text-gray-500 dark:text-gray-400 ml-2">manage your personal information</h2>
        <div className="bg-white rounded-[15px] p-3 mt-1 space-y-3"> 
            <div className="flex justify-between">
              <div className="flex items-center gap-x-3">
                <User size={20} />
                <strong>username</strong>
              </div>
                <p className="font-semibold">{data.userName}</p>
            </div>

             <div className="flex justify-between">
              <div className="flex items-center gap-x-3">
                <Mail size={20} />
                <strong className="capitalize">email</strong>
              </div>
                <p className="font-semibold">{data.email}</p>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-x-3">
                <Phone size={20} />
                <strong className="block text-sm">Phone Number</strong>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">{data.phoneNumber || 'Not set'}</p>
           </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-x-3">
              <Wallet size={20}/>
             <strong className="block text-sm">Monthly Income</strong>

            </div>
            <p>₦{data.monthlyIncome.toLocaleString() || '0'}</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-x-3">
              <CreditCard  size={20}/>
              <strong className="block text-sm">Currency</strong>
            </div>
            <p>{data.currency || 'NGN'}</p>
          </div>

          <div className="flex justify-end mt-5">
            <ThemeToggle />
          </div>

          <div className="w-fit m-auto">
            <Link
                to={'/edit-profile'}
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition shadow"
              >
                Edit Profile
            </Link>
          </div>

        </div >
{/* security */}

        <h2 className="capitalize text-md mt-2 text-gray-500 dark:text-gray-400 ml-2">security</h2>
        <div className="bg-white rounded-[15px] p-3 mt-2 space-y-3">
            <h1>change password</h1>
            <Link to={"/sign-in"} className="flex items-center gap-x-2" 
             onClick={handleSignOut}
            >
              <CgLogOut  size={20}/>
              sign out
            </Link>
        </div>





        {/* Budget Goals */}
        {/* <div className="mb-6">
          <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide text-gray-500">
            Monthly Budget Goals
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {CATEGORY_LIST.map((category) => (
              <div key={category}>
                <label className="text-xs text-gray-500 uppercase">
                  {category}
                </label>

                <input
                  type="number"
                  value={formData.budgetGoals?.[category] ?? ""}
                  onChange={(e) =>
                    handleBudgetChange(category, e.target.value)
                  }
                  placeholder="0"
                  className="w-full mt-1 px-3 py-2 rounded-lg border
                             dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            ))}
          </div>
        </div> */}

        {/* <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-[#10B981] text-white"
          >
            Save Changes
          </button>
        </div> */}

      </div>
    </div>
  )
}

export default Profile