import { FC, FormEvent, forwardRef, useState } from "react";
import { Button, Input, Loader, Select, Slider, Title } from "../../components";
import "./CustomizeFormSection.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type TInputData = {
  type?: "text" | "number" | "email";
  label: string;
  placeholder: string;
  required: boolean;
  name: string;
  error: string;
};

const inputsData: TInputData[] = [
  {
    label: "Your last name",
    placeholder: "For Example Doe",
    required: true,
    name: "firstName",
    error: "Enter your last name",
  },
  {
    label: "Your first name",
    placeholder: "For Example Jhon",
    required: true,
    name: "lastName",
    error: "Enter your first name",
  },
  {
    label: "Your patronymic",
    placeholder: "For Example Victorovich",
    required: false,
    name: "middleName",
    error: "",
  },
  {
    type: "email",
    label: "Your email",
    placeholder: "test@gmail.com",
    required: true,
    name: "email",
    error: "Incorrect email address",
  },
  {
    label: "Your date of birth",
    placeholder: "Select Date and Time",
    required: true,
    name: "birthDate",
    error: "Incorrect date of birth",
  },
  {
    label: "Your passport series",
    placeholder: "0000",
    required: true,
    name: "passportSeries",
    error: "The series must be 4 digits",
  },
  {
    label: "Your passport number",
    placeholder: "000000",
    required: true,
    name: "passportNumber",
    error: "The series must be 6 digits",
  },
];

const optionsData: number[] = [6, 12, 18, 24];

type FormField = {
  value: string;
  isValid: boolean;
};

type FormData = {
  firstName: FormField;
  lastName: FormField;
  middleName: FormField;
  email: FormField;
  birthDate: FormField;
  passportSeries: FormField;
  passportNumber: FormField;
};

type FormDataKeys = keyof FormData;

export const CustomizeFormSection: FC = forwardRef<HTMLFormElement>(
  (props, ref) => {
    const navigate = useNavigate();
    const [amountValue, setAmountValue] = useState<number>(150000);
    const [termValue, setTermValue] = useState<number>(6);
    const [errors, setErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
      firstName: { value: "", isValid: false },
      lastName: { value: "", isValid: false },
      middleName: { value: "", isValid: false },
      email: { value: "", isValid: false },
      birthDate: { value: "", isValid: false },
      passportSeries: { value: "", isValid: false },
      passportNumber: { value: "", isValid: false },
    });

    const isValidEmail = (email: string) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    const isValidDate = (dateString: string) => {
      // dd-mm-yyyy
      const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;
      if (!regex.test(dateString)) return false;

      const [day, month, year] = dateString.split("-").map(Number);

      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        return false;
      }

      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDifference = today.getMonth() - date.getMonth();

      return age > 18 || (age === 18 && monthDifference >= 0);
    };

    const isLatin = (str: string) => {
      const regex = /^[a-zA-Z\s]*$/;
      return regex.test(str);
    };

    const handleSelect = (value: number) => {
      setTermValue(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name as FormDataKeys]: { value, isValid: false },
      }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setErrors([]);

      const newErrors: string[] = [];
      let isValid = true;

      if (!formData.firstName.value || !isLatin(formData.firstName.value)) {
        newErrors[0] = inputsData[0].error;
      } else formData.firstName.isValid = true;

      if (!formData.lastName.value || !isLatin(formData.lastName.value)) {
        newErrors[1] = inputsData[1].error;
      } else formData.lastName.isValid = true;

      if (
        !isValidEmail(formData.email.value) ||
        !isLatin(formData.email.value)
      ) {
        newErrors[2] = inputsData[3].error;
      } else formData.email.isValid = true;

      if (!isValidDate(formData.birthDate.value)) {
        newErrors[3] = inputsData[4].error;
      } else formData.birthDate.isValid = true;

      if (!/^\d{4}$/.test(formData.passportSeries.value)) {
        newErrors[4] = inputsData[5].error;
      } else formData.passportSeries.isValid = true;

      if (!/^\d{6}$/.test(formData.passportNumber.value)) {
        newErrors[5] = inputsData[6].error;
      } else formData.passportNumber.isValid = true;

      setErrors(newErrors);
      setFormData({ ...formData });

      if (newErrors.length > 0) {
        isValid = false;
      }
      if (!isValid) {
        return;
      }

      setIsLoading(true);
      try {
        const resp = await axios.post("http://localhost:3000/application", {
          amount: amountValue,
          term: termValue,
          firstName: formData.firstName.value,
          lastName: formData.lastName.value,
          middleName: formData.middleName.value,
          email: formData.email.value,
          birthDate: formData.birthDate.value,
          passportSeries: formData.passportSeries.value,
          passportNumber: formData.passportNumber.value,
        });
        if (resp.status === 201) {
          setFormData({
            firstName: { value: "", isValid: false },
            lastName: { value: "", isValid: false },
            middleName: { value: "", isValid: false },
            email: { value: "", isValid: false },
            birthDate: { value: "", isValid: false },
            passportSeries: { value: "", isValid: false },
            passportNumber: { value: "", isValid: false },
          });
          navigate("/");
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
          <Loader />
        ) : (
          <form ref={ref} className="customizeForm" onSubmit={handleSubmit}>
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
              {inputsData.slice(0, 3).map((input, index) => (
                <Input
                  key={input.name}
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  required={input.required}
                  error={input.required ? errors[index] : ""}
                  name={input.name}
                  value={formData[input.name as FormDataKeys].value}
                  isValid={formData[input.name as FormDataKeys].isValid}
                  onChange={handleChange}
                />
              ))}
              <Select
                onSelect={handleSelect}
                label="Select term"
                required={true}
                optionsData={optionsData}
                extraWord="month"
              />
              {inputsData.slice(3, inputsData.length).map((input, index) => (
                <Input
                  key={input.name}
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  required={input.required}
                  error={errors[index + 2]}
                  name={input.name}
                  value={formData[input.name as FormDataKeys].value}
                  isValid={formData[input.name as FormDataKeys].isValid}
                  onChange={handleChange}
                />
              ))}
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
