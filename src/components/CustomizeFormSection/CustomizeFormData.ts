import z from "zod";

type TInputData = {
  type?: "text" | "number" | "email" | "date";
  label: string;
  placeholder: string;
  required: boolean;
  inputName: string;
  maxLength?: number;
};

export const inputsData: TInputData[] = [
  {
    label: "Your last name",
    placeholder: "For Example Doe",
    required: true,
    inputName: "lastName",
  },
  {
    label: "Your first name",
    placeholder: "For Example Jhon",
    required: true,
    inputName: "firstName",
  },
  {
    label: "Your patronymic",
    placeholder: "For Example Victorovich",
    required: false,
    inputName: "middleName",
  },
  {
    type: "email",
    label: "Your email",
    placeholder: "test@gmail.com",
    required: true,
    inputName: "email",
  },
  {
    type: "date",
    label: "Your date of birth",
    placeholder: "Select Date and Time",
    required: true,
    inputName: "birthDate",
  },
  {
    label: "Your passport series",
    placeholder: "0000",
    required: true,
    inputName: "passportSeries",
    maxLength: 4,
  },
  {
    label: "Your passport number",
    placeholder: "000000",
    required: true,
    inputName: "passportNumber",
    maxLength: 6,
  },
];

export const optionsData: number[] = [6, 12, 18, 24];

const latinRegex = /^[A-Za-z]+$/;

export const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "Enter your first name")
    .regex(latinRegex, "Only Latin letters allowed"),

  lastName: z
    .string()
    .min(1, "Enter your last name")
    .regex(latinRegex, "Only Latin letters allowed"),

  middleName: z.string().max(40, "Max length: 40").optional(),

  email: z.email("Incorrect email address"),

  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Incorrect date of birth")
    .refine((val) => {
      const birthDate = new Date(val);
      if (isNaN(birthDate.getTime())) {
        return false; // Invalid date
      }
      return true;
    }, "Invalid date")
    .refine((val) => {
      const today = new Date();
      const birthDate = new Date(val);
      return birthDate <= today;
    }, "Invalid date")
    .refine((val) => {
      const today = new Date();
      const birthDate = new Date(val);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age >= 18;
    }, "You need to be 18 years or more")
    .refine((val) => {
      const minDate = new Date("1950-01-01");
      const birthDate = new Date(val);
      return birthDate >= minDate;
    }, "Date of birth cannot be earlier than 01.01.1950"),

  passportSeries: z.string().regex(/^\d{4}$/, "The series must be 4 digits"),

  passportNumber: z.string().regex(/^\d{6}$/, "The series must be 6 digits"),
});

export type FormData = z.infer<typeof formSchema>;
