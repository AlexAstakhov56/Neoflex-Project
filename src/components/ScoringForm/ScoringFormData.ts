import z from "zod";
import { TInputData } from "../../types/TInputData.type";

type TSelectData = {
  label: string;
  required: boolean;
  optionsData: string[] | number[];
  selectName: string;
};

export const inputsData: TInputData[] = [
  {
    label: "Your number of dependents",
    placeholder: "0",
    required: true,
    inputName: "dependentAmount",
  },
  {
    type: "date",
    label: "Date of issue of the passport",
    placeholder: "Select Date and Time",
    required: true,
    inputName: "passportIssueDate",
  },
  {
    label: "Division code",
    placeholder: "000000",
    required: true,
    inputName: "passportIssueBranch",
    maxLength: 6,
  },
  {
    label: "Your employer INN",
    placeholder: "000000000000",
    required: true,
    inputName: "employerINN",
    maxLength: 12,
  },
  {
    label: "Your salary",
    placeholder: "For example 100 000",
    required: true,
    inputName: "salary",
  },
  {
    label: "Your work experience total",
    placeholder: "For example 10",
    required: true,
    inputName: "workExperienceTotal",
    maxLength: 2,
  },
  {
    label: "Your work experience current",
    placeholder: "For example 2",
    required: true,
    inputName: "workExperienceCurrent",
    maxLength: 2,
  },
];

export const selectData: TSelectData[] = [
  {
    label: "What's your gender",
    required: true,
    selectName: "gender",
    optionsData: ["Male", "Female"],
  },
  {
    label: "Your marital status",
    required: true,
    selectName: "maritalStatus",
    optionsData: ["Married", "Divorced", "Single", "Widow/widower"],
  },
  {
    label: "Your employment status",
    required: true,
    selectName: "employmentStatus",
    optionsData: ["Unemployed", "Self employed", "Employed", "Business owner"],
  },
  {
    label: "Your position",
    required: true,
    selectName: "position",
    optionsData: ["Worker", "Mid manager", "Top manager", "Owner"],
  },
];

export const formSchema = z.object({
  gender: z.string().min(1, "Select one of the options"),

  maritalStatus: z.string().min(1, "Select one of the options"),

  dependentAmount: z
    .string()
    .min(1, "Enter your number of dependents")
    .regex(/^\d+$/, "This field must contain only numbers"),

  passportIssueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Incorrect date of passport issue date")
    .refine((val) => {
      const birthDate = new Date(val);
      if (isNaN(birthDate.getTime())) {
        return false;
      }
      return true;
    }, "Incorrect date of passport issue date")
    .refine((val) => {
      const today = new Date();
      const birthDate = new Date(val);
      return birthDate <= today;
    }, "Incorrect date of passport issue date"),

  passportIssueBranch: z
    .string()
    .regex(/^\d{6}$/, "The series must be 6 digits"),

  employmentStatus: z.string().min(1, "Select one of the options"),

  employerINN: z
    .string()
    .regex(/^\d{12}$/, "Department code must be 12 digits"),

  salary: z
    .string()
    .min(1, "Enter your salary")
    .regex(/^\d+$/, "This field must contain only numbers"),

  position: z.string().min(1, "Select one of the options"),

  workExperienceTotal: z
    .string()
    .min(1, "Enter your work experience total")
    .regex(/^\d+$/, "This field must contain only numbers"),

  workExperienceCurrent: z
    .string()
    .min(1, "Enter your work experience current")
    .regex(/^\d+$/, "This field must contain only numbers"),
});

export type FormData = z.infer<typeof formSchema>;
