import { forwardRef, useState } from "react";
import { Button, Input, Loader, Select, Slider, Title } from "../../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import "./CustomizeFormSection.scss";
import { useForm } from "react-hook-form";

type TInputData = {
  type?: "text" | "number" | "email";
  label: string;
  placeholder: string;
  required: boolean;
  inputName: string;
};

const inputsData: TInputData[] = [
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
  },
  {
    label: "Your passport number",
    placeholder: "000000",
    required: true,
    inputName: "passportNumber",
  },
];

const optionsData: number[] = [6, 12, 18, 24];

const latinRegex = /^[A-Za-z]+$/;

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "Enter your first name")
    .regex(latinRegex, "Only Latin letters allowed"),

  lastName: z
    .string()
    .min(1, "Enter your last name")
    .regex(latinRegex, "Only Latin letters allowed"),

  middleName: z
    .string()
    .max(40, "Max length: 40")
    .regex(latinRegex, "Only Latin letters allowed")
    .optional(),

  email: z.string().email("Incorrect email address"),

  birthDate: z
    .string()
    .regex(/^\d{2}-\d{2}-\d{4}$/, "Incorrect date of birth")
    .refine((val) => {
      const [day, month, year] = val.split("-").map(Number);
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      return age > 18 || (age === 18 && monthDiff >= 0);
    }, "You need to be 18 years or more"),

  passportSeries: z.string().regex(/^\d{4}$/, "The series must be 4 digits"),

  passportNumber: z.string().regex(/^\d{6}$/, "The series must be 6 digits"),
});

type FormData = z.infer<typeof formSchema>;

export const CustomizeFormSection = forwardRef<HTMLFormElement>(
  (props, ref) => {
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors, dirtyFields },
    } = useForm<FormData>({
      resolver: zodResolver(formSchema),
      mode: "onChange",
      defaultValues: {
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        birthDate: "",
        passportSeries: "",
        passportNumber: "",
      },
    });
    const [amountValue, setAmountValue] = useState<number>(150000);
    const [termValue, setTermValue] = useState<number>(6);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSelect = (value: number) => {
      setTermValue(value);
    };

    const formatBackendDate = (dateString: string) => {
      const [day, month, year] = dateString.split("-");
      return `${year}-${month}-${day}`;
    };

    const onSubmit = async (data: FormData) => {
      setIsLoading(true);
      try {
        const requestData = {
          amount: amountValue,
          term: termValue,
          firstName: data.firstName,
          lastName: data.lastName,
          middleName: data.middleName,
          email: data.email,
          birthdate: formatBackendDate(data.birthDate),
          passportSeries: data.passportSeries,
          passportNumber: data.passportNumber,
        };
        const resp = await axios.post(
          "http://localhost:8080/application",
          requestData
        );
        if (resp.status === 200) {
          reset({
            firstName: "",
            lastName: "",
            middleName: "",
            email: "",
            birthDate: "",
            passportSeries: "",
            passportNumber: "",
          });
          //navigate("/");
          return;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <>
        {isLoading ? (
          <Loader marginTop={50} marginBottom={50} />
        ) : (
          <form
            ref={ref}
            className="customizeForm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="customizeForm__amountChoose">
              <div className="customizeForm__sliderSection">
                <div className="customizeForm__sliderSection_titles">
                  <Title title="Customize your card" />
                  <p>Step 1 of 5</p>
                </div>
                <div className="customizeForm__slider">
                  <p>Select amount</p>
                  <p className="customizeForm__slider_value">{amountValue}</p>
                  <Slider
                    min={15000}
                    max={600000}
                    value={amountValue}
                    onChange={setAmountValue}
                  />
                </div>
              </div>

              <div className="customizeForm__inputSection">
                <Title
                  title="You have chosen the amount"
                  fontSize="small"
                  marginBottom={16}
                />
                <input
                  type="number"
                  min={15000}
                  max={600000}
                  className="customizeForm__input"
                  value={amountValue}
                  onChange={(e) => setAmountValue(+e.target.value)}
                />
              </div>
            </div>

            <Title
              title="Contact Information"
              fontSize="small"
              marginBottom={26}
            />
            <div className="customizeForm__fields">
              {inputsData.slice(0, 3).map((input) => {
                const fieldName = input.inputName as keyof FormData;
                const fieldValue = watch(fieldName);
                const isDirty = dirtyFields[fieldName];
                const hasValue =
                  fieldValue !== undefined &&
                  fieldValue !== null &&
                  String(fieldValue).trim().length > 0;
                const isValidField =
                  !errors[fieldName] && (isDirty || hasValue);
                return (
                  <Input
                    key={input.inputName}
                    type={input.type}
                    label={input.label}
                    placeholder={input.placeholder}
                    required={input.required}
                    error={errors[fieldName]}
                    name={input.inputName}
                    isValid={isValidField}
                    register={register}
                  />
                );
              })}
              <Select
                onSelect={handleSelect}
                label="Select term"
                required={true}
                optionsData={optionsData}
                extraWord="month"
              />
              {inputsData.slice(3, inputsData.length).map((input) => {
                const fieldName = input.inputName as keyof FormData;
                const fieldValue = watch(fieldName);
                const isDirty = dirtyFields[fieldName];
                const hasValue =
                  fieldValue !== undefined &&
                  fieldValue !== null &&
                  String(fieldValue).trim().length > 0;
                const isValidField =
                  !errors[fieldName] && (isDirty || hasValue);
                return (
                  <Input
                    key={input.inputName}
                    type={input.type}
                    label={input.label}
                    placeholder={input.placeholder}
                    required={input.required}
                    error={errors[fieldName]}
                    name={input.inputName}
                    isValid={isValidField}
                    register={register}
                  />
                );
              })}
            </div>

            <div className="customizeForm__submit">
              <Button
                type="submit"
                borderRadius={8}
                paddingY={15}
                paddingX={39}
              >
                Continue
              </Button>
            </div>
          </form>
        )}
      </>
    );
  }
);
