import { forwardRef, useState } from "react";
import { Button, Input, Loader, Select, Slider, Title } from "../../components";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import "./CustomizeFormSection.scss";
import { useForm } from "react-hook-form";
import {
  inputsData,
  optionsData,
  FormData,
  formSchema,
} from "./CustomizeFormData";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setPrescoringPosted } from "../../store/formsSlice";
import { setOffers } from "../../store/offersSlice";
import { incrementStep, setApplicationId } from "../../store/applicationSlice";

export const CustomizeFormSection = forwardRef<HTMLDivElement>((props, ref) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });
  const [amountValue, setAmountValue] = useState<number>(150000);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      if (data.middleName === "") data.middleName = null;
      const requestData = {
        amount: amountValue,
        ...data,
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
          birthdate: "",
          passportSeries: "",
          passportNumber: "",
        });
        dispatch(setPrescoringPosted(true));
        dispatch(setOffers(resp.data));
        dispatch(incrementStep());
        dispatch(setApplicationId(resp.data[0].applicationId));
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={ref}>
      {isLoading ? (
        <Loader marginTop={50} marginBottom={50} />
      ) : (
        <form className="customizeForm" onSubmit={handleSubmit(onSubmit)}>
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
              const isValidField = !errors[fieldName] && (isDirty || hasValue);
              return (
                <Input<FormData, keyof FormData>
                  key={input.inputName}
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  required={input.required}
                  error={errors[fieldName]}
                  name={fieldName}
                  maxLength={input.maxLength}
                  isValid={isValidField}
                  register={register}
                />
              );
            })}
            <Select<FormData, "term">
              label="Select term"
              required={true}
              name="term"
              optionsData={optionsData}
              defaultValue={optionsData[0]}
              extraWord="month"
              register={register}
              error={errors.term}
            />
            {inputsData.slice(3, inputsData.length).map((input) => {
              const fieldName = input.inputName as keyof FormData;
              const fieldValue = watch(fieldName);
              const isDirty = dirtyFields[fieldName];
              const hasValue =
                fieldValue !== undefined &&
                fieldValue !== null &&
                String(fieldValue).trim().length > 0;
              const isValidField = !errors[fieldName] && (isDirty || hasValue);
              return (
                <Input<FormData, keyof FormData>
                  key={input.inputName}
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  required={input.required}
                  error={errors[fieldName]}
                  name={fieldName}
                  maxLength={input.maxLength}
                  isValid={isValidField}
                  register={register}
                />
              );
            })}
          </div>

          <div className="customizeForm__submit">
            <Button type="submit" borderRadius={8} paddingY={15} paddingX={39}>
              Continue
            </Button>
          </div>
        </form>
      )}
    </div>
  );
});
