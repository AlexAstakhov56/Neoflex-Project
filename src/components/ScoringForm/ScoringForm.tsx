import { FC, useState } from "react";
import "./ScoringForm.scss";
import { Button, Input, Loader, Select, Title } from "../UI";
import {
  FormData,
  formSchema,
  inputsData,
  selectData,
} from "./ScoringFormData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { incrementStep } from "../../store/applicationSlice";
import { setScoringPosted } from "../../store/formsSlice";

export const ScoringForm: FC = () => {
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { applicationId } = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const requestData = {
        gender: data.gender,
        maritalStatus: data.maritalStatus,
        dependentAmount: +data.dependentAmount,
        passportIssueDate: data.passportIssueDate,
        passportIssueBranch:
          data.passportIssueBranch.slice(0, 3) +
          "-" +
          data.passportIssueBranch.slice(3, 6),
        employment: {
          employmentStatus: data.employmentStatus,
          employerINN: data.employerINN,
          salary: +data.salary,
          position: data.position,
          workExperienceTotal: +data.workExperienceTotal,
          workExperienceCurrent: +data.workExperienceCurrent,
        },
        account: "11223344556677890000",
      };
      const resp = await axios.put(
        `http://localhost:8080/application/registration/${applicationId}`,
        requestData
      );
      if (resp.status === 200) {
        reset({
          gender: "",
          maritalStatus: "",
          dependentAmount: "",
          passportIssueDate: "",
          passportIssueBranch: "",
          employmentStatus: "",
          employerINN: "",
          salary: "",
          position: "",
          workExperienceTotal: "",
          workExperienceCurrent: "",
        });
        dispatch(incrementStep());
        dispatch(setScoringPosted(true));
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
        <Loader marginTop={150} marginBottom={100} />
      ) : (
        <form className="scoringForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="scoringForm__info">
            <Title title="Continuation of the application" />
            <p>Step 2 of 5</p>
          </div>
          <div className="scoringForm__topFields">
            {selectData.slice(0, 2).map((select) => {
              const fieldName = select.selectName as keyof FormData;
              return (
                <Select<FormData, keyof FormData>
                  key={select.selectName}
                  label={select.label}
                  minWidth={400}
                  required={true}
                  name={fieldName}
                  optionsData={select.optionsData}
                  register={register}
                  error={errors[fieldName]}
                />
              );
            })}

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
                  minWidth={400}
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
          <Title title="Employment" fontSize="small" />
          <div className="scoringForm__bottomFields">
            {selectData.slice(2, 3).map((select) => {
              const fieldName = select.selectName as keyof FormData;
              return (
                <Select<FormData, keyof FormData>
                  key={select.selectName}
                  label={select.label}
                  minWidth={400}
                  required={true}
                  name={fieldName}
                  optionsData={select.optionsData}
                  register={register}
                  error={errors[fieldName]}
                />
              );
            })}

            {inputsData.slice(3, 5).map((input) => {
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
                  minWidth={400}
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

            {selectData.slice(3, 4).map((select) => {
              const fieldName = select.selectName as keyof FormData;
              return (
                <Select<FormData, keyof FormData>
                  key={select.selectName}
                  label={select.label}
                  required={true}
                  minWidth={400}
                  name={fieldName}
                  optionsData={select.optionsData}
                  register={register}
                  error={errors[fieldName]}
                />
              );
            })}

            {inputsData.slice(5, 7).map((input) => {
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
                  minWidth={400}
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
          <div className="scoringForm__submit">
            <Button type="submit" borderRadius={8} paddingY={15} paddingX={39}>
              Continue
            </Button>
          </div>
        </form>
      )}
    </>
  );
};
