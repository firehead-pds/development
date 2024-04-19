import { SubmitHandler, useForm } from "react-hook-form";
import { AbsoluteCenter, Box, Button, Divider, Flex } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import AddressInfo from "../components/signup/AddressInfo.tsx";
import MeasurementsInfo from "../components/signup/MeasurementsInfo.tsx";
import PersonalInfo from "../components/signup/PersonalInfo.tsx";
import EmailPasswordInfo from "../components/signup/EmailPasswordInfo.tsx";

interface Address {
  postalCode?: string;
  addressLine?: string;
  district?: string;
  city?: string;
  state?: string;
  addressNumber?: string;
  complement?: string;
}

export interface SignUpPostData {
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  shoeSize: string;
  shirtSize: string;
  pantsSize: number;
  height: number;
  address: Address;
}

export interface IFormInputs extends SignUpPostData {
  confirmPassword?: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    getValues,
  } = useForm<IFormInputs>({ mode: "onBlur" });

  const { mutate } = useMutation({
    mutationKey: ["sendSignupData"],
    mutationFn: async (formData: SignUpPostData) => {
      const res = await fetch(`${import.meta.env.VITE_BASE_API_URL!}/users`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(
          `Fetch request failed: ${res.status} ${res.statusText}`,
        );
      }

      return res.json();
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    console.log(data);
    delete data.confirmPassword;
    mutate(data);
  };

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        className={"w-screen my-6"}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={"p-4 border rounded-lg mx-2"}
        >
          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4" className={"text-center"}>
              Credenciais de Acesso
            </AbsoluteCenter>
          </Box>
          <PersonalInfo
            register={register}
            errors={errors}
            setError={setError}
            setValue={setValue}
          />

          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4" className={"text-center"}>
              Credenciais de Acesso
            </AbsoluteCenter>
          </Box>

          <EmailPasswordInfo
            register={register}
            errors={errors}
            setError={setError}
            setValue={setValue}
            getValues={getValues}
          />

          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4" className={"text-center"}>
              Credenciais de Acesso
            </AbsoluteCenter>
          </Box>

          <MeasurementsInfo
            register={register}
            errors={errors}
            setError={setError}
            setValue={setValue}
          />

          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4" className={"text-center"}>
              Credenciais de Acesso
            </AbsoluteCenter>
          </Box>

          <AddressInfo
            register={register}
            errors={errors}
            setError={setError}
            setValue={setValue}
          />
          <Button isLoading={isSubmitting} type="submit">
            Submit
          </Button>
        </form>
      </Flex>
    </>
  );
}
