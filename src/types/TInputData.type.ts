export type TInputData = {
  type?: "text" | "number" | "email" | "date";
  label: string;
  placeholder: string;
  required: boolean;
  inputName: string;
  maxLength?: number;
};
