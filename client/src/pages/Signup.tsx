import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";
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
}

export interface SignUpPostData {
  name: string;
  birthdate: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  shoeSize: string;
  shirtSize: string;
  pantsSize: number;
  address: Address;
}

export interface IFormInputs extends SignUpPostData {
  confirmPassword?: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    delete data.confirmPassword;
    mutate(data);
  };

  return (
    <>
      <Box
        maxW={"xl"}
        borderWidth={"1px"}
        borderRadius={"lg"}
        m={"5rem auto 5rem auto"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={"p-10"}>
          <PersonalInfo
            register={register}
            errors={errors}
            setError={setError}
            setValue={setValue}
          />

          <EmailPasswordInfo
            register={register}
            errors={errors}
            setError={setError}
            setValue={setValue}
            getValues={getValues}
          />

          <MeasurementsInfo
            register={register}
            errors={errors}
            setError={setError}
            setValue={setValue}
          />

          <AddressInfo
            register={register}
            errors={errors}
            setError={setError}
            setValue={setValue}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </>
  );
}
