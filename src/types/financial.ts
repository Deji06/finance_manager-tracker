import { z } from "zod";

export const categoryEnum = z.enum([
  "FOOD",
  "TRANSPORT",
  "ENTERTAINMENT",
  "RENT",
  "SAVINGS",
  "UTILITIES",
  "OTHERS",
])

export const expenseSchema = z.object({
  amount: z.number().positive("Amount must be greater than zero"),
  description: z.string().min(3, "Description is too short").max(100),
  category: categoryEnum,
  date: z.string().datetime().optional(), 
  recurring: z.boolean().optional().default(false),
});

// For unexpected money 
export const extraIncomeSchema = z.object({
  amount: z.number().positive("Amount must be greater than zero"),
  source: z.string().min(2, "Source name is required"),
  date: z.string().datetime().optional(),
});

// For recurring subscriptions (e.g., "Netflix")
// for form input
export const subscriptionSchema = z.object({
  name: z.string().min(2, "Subscription name is required"),
  amount: z.number().positive(),
  billingCycle: z.enum(["MONTHLY", "YEARLY"]),
  nextBillingDate: z
    .string()
    .datetime("Invalid date format")
    .refine(
      (date) => new Date(date) > new Date(),
      "Next billing date must be in the future",
    ),
    reminderDaysBefore: z
    .number()
    .int("Must be a whole number")
    .min(0, "Cannot be negative")
    .max(30, "Maximum 30 days before")
    .optional()                  
    .default(2),
  provider: z.string().optional(), 
}).strict();

// Response schema (for data gotten from server)
export const subscriptionResponseSchema = subscriptionSchema.extend({
  id: z.string().uuid(),      
  userId: z.string().uuid(),
  isActive: z.boolean().default(true),
  startDate: z.string().datetime().optional(),
  lastRemindedAt: z.string().datetime().nullable().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

 
// For updating the user profile (Onboarding)
export const profileUpdateSchema = z.object({
  monthlyIncome: z.number().nonnegative(),
  currency: z
    .string()
    .length(3, "Currency must be a 3-letter code")
    .regex(/^[A-Z]{3}$/, "Currency must be uppercase 3 letters (e.g. NGN, USD)")
    .default("NGN"),

  userName: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username is too long (max 50 characters)")
    .regex(
      /^[a-zA-Z0-9_ -]+$/,
      "Username can only contain letters, numbers, spaces, underscores and hyphens",
    )
    .optional(),

  phoneNumber: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Invalid phone number format (use international format, e.g. +2348012345678)",
    )
    .min(9, "Phone number is too short")
    .max(15, "Phone number is too long")
    .optional(),

  // budgetGoals as JSON — flexible record of category → amount
  budgetGoals: z
    .record(categoryEnum,
      z.number().positive("Budget amount must be greater than zero").optional(),
    )
    .optional()
    .refine(
      (goals) => {
        if (!goals) return true;
        return Object.keys(goals).length <= 20; // example limit
      },
      { message: "Too many budget categories defined" },
    ),
});


export type subscriptionFormType = z.infer<typeof subscriptionSchema>
export type subscriptionResponseType = z.infer<typeof subscriptionResponseSchema>
export type categoryType = z.infer<typeof categoryEnum>
export type profileType = z.infer<typeof profileUpdateSchema>
