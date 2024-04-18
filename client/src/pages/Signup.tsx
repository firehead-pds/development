import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import AddressInfo from "../components/signup/AddressInfo.tsx";
import { cpf } from "cpf-cnpj-validator";
import { useTranslation } from "react-i18next";

interface Address {
  postalCode?: string;
  addressLine?: string;
  district?: string;
  city?: string;
  state?: string;
}

export interface SignUpPostData {
  name: string;
  birthday: string;
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

const pantsSizes = [34, 36, 38, 40, 42, 44, 46, 48, 50];

export default function Signup() {
  const { t } = useTranslation("signup");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    setValue,
  } = useForm<IFormInputs>({ mode: "onBlur" });

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prev) => !prev);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onChange, ...shoeSize } = register("shoeSize", {
    min: Number(30),
    max: Number(48),
    valueAsNumber: true,
  });

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
    console.log(data);
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
          {/*Name Input*/}
          <FormControl isRequired isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">{t("fields.name")}</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Type your name..."
              {...register("name", {
                pattern: {
                  value: /^[A-Za-z ]*$/,
                  message: "The name don't have numbers or special characters!",
                },
                maxLength: {
                  value: 70,
                  message: "The name need at most 70 characters!",
                },
              })}
            />

            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          {/*Birthday Input*/}
          <FormControl isRequired isInvalid={!!errors.birthday}>
            <FormLabel htmlFor="birthday">Your Birthday</FormLabel>
            <Input id="birthday" type="date" {...register("birthday")} />

            <FormErrorMessage>
              {/*errors.birthday && errors.birthday.message*/}
            </FormErrorMessage>
          </FormControl>

          {/*Email Input*/}
          <FormControl isRequired isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputGroup>
              <Input
                id="email"
                type="email"
                placeholder="Type your email..."
                {...register("email", {
                  pattern: {
                    value: /^\S+@{1}\S+[.]{1}\S+$/i,
                    message: "The email pattern is invalid!",
                  },
                  maxLength: {
                    value: 70,
                    message: "The email need at most 70 characters!",
                  },
                })}
              />
              <InputRightElement pointerEvents="none">
                <EmailIcon color="gray.400" />
              </InputRightElement>
            </InputGroup>

            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          {/*Password Input*/}
          <FormControl isRequired isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Type your password..."
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "The password need at least 8 characters!",
                  },
                  maxLength: {
                    value: 24,
                    message: "The password need at most 24 characters!",
                  },
                })}
              />
              <InputRightElement>
                <Button onClick={handleShowPassword}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          {/*Confirm password*/}
          <FormControl isRequired isInvalid={!!errors.confirmPassword}>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <InputGroup>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Type your password..."
                {...register("confirmPassword", {
                  validate: (v) =>
                    v === getValues("password") || "Passwords do not match",
                })}
              />
              <InputRightElement>
                <Button onClick={handleShowPassword}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>

          {/*CPF Input*/}
          <FormControl isRequired isInvalid={!!errors.cpf}>
            <FormLabel htmlFor="cpf">CPF</FormLabel>
            <Input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              {...register("cpf", {
                validate: (v) => cpf.isValid(v) || "CPF Inválido",
              })}
            />

            <FormErrorMessage>
              {errors.cpf && errors.cpf.message}
            </FormErrorMessage>
          </FormControl>

          {/*Phone Input*/}
          <FormControl isRequired isInvalid={!!errors.phone}>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <PhoneIcon color="gray.400" />
              </InputLeftElement>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                {...register("phone", {
                  pattern: {
                    value: /^[(]?\d{2}[)]?[ ]?\d{5}[-]?\d{4}$/,
                    message: "The pattern is invalid!",
                  },
                })}
              />
            </InputGroup>

            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>

          <Grid templateColumns="repeat(2, 1fr)">
            {/*Shirt Size Select*/}
            <FormControl isRequired isInvalid={!!errors.shirtSize}>
              <FormLabel htmlFor="shirtSize">Shirt Size: </FormLabel>{" "}
              {/*Não sei como colocar esses texto em inglês*/}
              <Select id="shirtSize" {...register("shirtSize")}>
                <option key={"Shirt_PP"} value="PP">
                  PP
                </option>
                <option key={"Shirt_P"} value="P">
                  P
                </option>
                <option key={"Shirt_M"} value="M">
                  M
                </option>
                <option key={"Shirt_G"} value="G">
                  G
                </option>
                <option key={"Shirt_GG"} value="GG">
                  GG
                </option>
                <option key={"Shirt_GGX"} value="GGX">
                  GGX
                </option>
                <option key={"Shirt_GGXE"} value="GGXE">
                  GGXE
                </option>
              </Select>
            </FormControl>

            {/*Pants Size Select*/}
            <FormControl isRequired isInvalid={!!errors.pantsSize}>
              <FormLabel htmlFor="pantsSize">Pants Size: </FormLabel>
              <Select
                id="pantsSize"
                {...register("pantsSize", { valueAsNumber: true })}
              >
                {pantsSizes.map((size) => (
                  <option key={"Pants_" + size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
            </FormControl>

            {/*Shoe Size Select*/}
            <FormControl isRequired isInvalid={!!errors.shoeSize}>
              <FormLabel htmlFor="shoeSize">Shoe Size: </FormLabel>
              <NumberInput
                id="shoeSize"
                defaultValue={36}
                clampValueOnBlur={true}
                {...shoeSize}
                min={30}
                max={48}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Grid>

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
