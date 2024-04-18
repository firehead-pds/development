import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import { IFormInputs } from "../../pages/Signup.tsx";
import { useTranslation } from "react-i18next";
import { cpf } from "cpf-cnpj-validator";
import { PhoneIcon } from "@chakra-ui/icons";

interface PersonalInfoProps {
  register: UseFormRegister<IFormInputs>;
  errors: FieldErrors<IFormInputs>;
  setError: UseFormSetError<IFormInputs>;
  setValue: UseFormSetValue<IFormInputs>;
}

export default function PersonalInfo({ register, errors }: PersonalInfoProps) {
  const { t } = useTranslation("signup");

  return (
    <>
      <FormControl isRequired isInvalid={!!errors.name?.firstName}>
        <FormLabel htmlFor="fistName">First Name:</FormLabel>
        <Input
          id="fistName"
          type="text"
          placeholder="Type your first name..."
          {...register("name.firstName", {
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
          {errors.name?.firstName && errors.name.firstName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.name?.lastName}>
        <FormLabel htmlFor="lastName">Last Name:</FormLabel>
        <Input
          id="lastName"
          type="text"
          placeholder="Type your last name..."
          {...register("name.lastName", {
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
          {errors.name?.lastName && errors.name.lastName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.birthdate}>
        <FormLabel htmlFor="birthday">Your Birthday</FormLabel>
        <Input id="birthday" type="date" {...register("birthdate")} />

        <FormErrorMessage>
          errors.birthdate && errors.birthdate.message
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

        <FormErrorMessage>{errors.cpf && errors.cpf.message}</FormErrorMessage>
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
    </>
  );
}
