import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "./reduxHooks";
import { RoutePath, AppRoutes } from "../router";

type TApplicationOptions<T> = {
  minStep: number;
  fetchFn?: (applicationId: number) => Promise<T> | void;
};

export const useApplication = <T>(options: TApplicationOptions<T>) => {
  const { minStep, fetchFn } = options;
  const navigate = useNavigate();
  const { applicationId: reduxApplicationId, currentStep } = useAppSelector(
    (state) => state.application
  );
  const { applicationId: urlApplicationId } = useParams<{
    applicationId: string;
  }>();

  useEffect(() => {
    let isValid = true;

    if (urlApplicationId && reduxApplicationId) {
      const parsedUrlApplicationId = parseInt(urlApplicationId, 10);
      if (parsedUrlApplicationId !== reduxApplicationId) {
        isValid = false;
      }
    } else if (!reduxApplicationId && urlApplicationId) {
      isValid = false;
    }
    if (currentStep < minStep) {
      isValid = false;
    }

    if (!isValid) {
      navigate(RoutePath[AppRoutes.NOTFOUND], { replace: true });
      return;
    }

    if (isValid && reduxApplicationId && fetchFn) {
      const fetchData = async () => {
        try {
          await fetchFn(reduxApplicationId);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [navigate, reduxApplicationId, urlApplicationId, currentStep, minStep]);

  return {
    isValid: !(
      (urlApplicationId && !reduxApplicationId) ||
      (urlApplicationId &&
        reduxApplicationId &&
        parseInt(urlApplicationId, 10) !== reduxApplicationId) ||
      currentStep < minStep
    ),
  };
};
