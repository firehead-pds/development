import { SubmitHandler, useForm } from "react-hook-form";
import { AbsoluteCenter, Box, Button, Divider, Flex } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import AddressInfo from "../components/signup/AddressInfo.tsx";
import MeasurementsInfo from "../components/signup/MeasurementsInfo.tsx";
import PersonalInfo from "../components/signup/PersonalInfo.tsx";
import EmailPasswordInfo from "../components/signup/EmailPasswordInfo.tsx";
import SignupFormFields from "../interfaces/signup/SignupFormFields.ts";
import PostUsers from "../interfaces/backend-fetches/requests/users/PostUsers.ts";
import ErrorResponse from "../interfaces/backend-fetches/responses/ErrorResponse.ts";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const { t } = useTranslation("signup");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    getValues,
  } = useForm<SignupFormFields>({ mode: "onBlur" });
  console.log(errors);

  const { mutate } = useMutation({
    mutationKey: ["sendSignupData"],
    mutationFn: async (formData: PostUsers) => {
      const res = await fetch(`${import.meta.env.VITE_BASE_API_URL!}/users`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(
          `Fetch request failed: ${res.status} ${res.statusText}`,
        );
      }

      if (res.status === 409) {
        const data = (await res.json()) as ErrorResponse;

        if (data.message === "CPF is already registered.") {
          setError("cpf", {
            type: "custom",
            message: "This CPF is already associated to an existing account",
          });
        }

        if (data.message === "Email is already registered.") {
          setError("email", {
            type: "custom",
            message: "This email is already associated to an existing account",
          });
        }
      }
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword: _, ...postData } = data;
    mutate(postData);
  };

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        className={"w-screen my-6"}
      >
        <form
          id={"signupForm"}
          onSubmit={handleSubmit(onSubmit, () => console.log("aa", errors))}
          className={"p-4 border rounded-lg mx-2 w-[500px]"}
        >
          <Box position="relative" paddingY="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4" className={"text-center"}>
              {t("dividers.personalInfo")}
            </AbsoluteCenter>
          </Box>
          <PersonalInfo
            register={register}
            errors={errors}
            setError={setError}
            setValue={setValue}
          />

          <Box position="relative" paddingY="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4" className={"text-center"}>
              {t("dividers.accessCredentials")}
            </AbsoluteCenter>
          </Box>

          <EmailPasswordInfo
            register={register}
            errors={errors}
            setError={setError}
            setValue={setValue}
            getValues={getValues}
          />

          <Box position="relative" paddingY="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4" className={"text-center"}>
              {t("dividers.measurements")}
            </AbsoluteCenter>
          </Box>

          <MeasurementsInfo
            register={register}
            errors={errors}
            setError={setError}
            setValue={setValue}
          />

          <Box position="relative" paddingY="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4" className={"text-center"}>
              {t("dividers.address")}
            </AbsoluteCenter>
          </Box>

          <AddressInfo
            register={register}
            errors={errors}
            setError={setError}
            setValue={setValue}
          />
          <Button isLoading={isSubmitting} type="submit" form={"signupForm"}>
            Submit
          </Button>
        </form>
      </Flex>
    </>
  );
}
