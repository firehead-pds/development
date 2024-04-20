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
import { cpf } from "cpf-cnpj-validator";
import { PhoneIcon } from "@chakra-ui/icons";
import SignupFormFields from "../../interfaces/signup/SignupFormFields.ts";
import { useTranslation } from "react-i18next";

interface PersonalInfoProps {
  register: UseFormRegister<SignupFormFields>;
  errors: FieldErrors<SignupFormFields>;
  setError: UseFormSetError<SignupFormFields>;
  setValue: UseFormSetValue<SignupFormFields>;
}

export default function PersonalInfo({ register, errors }: PersonalInfoProps) {
  const { t } = useTranslation("signup", { keyPrefix: "fields.personalInfo" });
  const { t: tErrors } = useTranslation("signup", {
    keyPrefix: "validationErrors",
  });

  return (
    <>
      <FormControl isRequired isInvalid={!!errors.firstName}>
        <FormLabel htmlFor="firstName">{t("firstName.label")}</FormLabel>
        <Input
          id="firstName"
          type="text"
          placeholder={t("firstName.placeholder")}
          {...register("firstName", {
            required: tErrors("required"),
            pattern: {
              value: /^[A-Za-z]*$/,
              message: tErrors("onlyLetters"),
            },
            maxLength: {
              value: 50,
              message: tErrors("maxLength", { limit: "50" }),
            },
          })}
        />
        <FormErrorMessage>
          {errors.firstName && errors.firstName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.lastName}>
        <FormLabel htmlFor="lastName">{t("lastName.label")}</FormLabel>
        <Input
          id="lastName"
          type="text"
          placeholder={t("lastName.placeholder")}
          {...register("lastName", {
            required: tErrors("required"),
            pattern: {
              value: /^[A-Za-z ]*$/,
              message: tErrors("onlyLetters"),
            },
            maxLength: {
              value: 50,
              message: tErrors("maxLength", { limit: "50" }),
            },
          })}
        />
        <FormErrorMessage>
          {errors.lastName && errors.lastName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.birthdate}>
        <FormLabel htmlFor="birthday">{t("birthdate.label")}</FormLabel>
        <Input
          id="birthday"
          type="date"
          {...register("birthdate", { required: tErrors("required") })}
        />

        <FormErrorMessage>
          {errors.birthdate && errors.birthdate.message}
        </FormErrorMessage>
      </FormControl>

      {/*CPF Input*/}
      <FormControl isRequired isInvalid={!!errors.cpf}>
        <FormLabel htmlFor="cpf">{t("cpf.label")}</FormLabel>
        <Input
          id="cpf"
          type="text"
          placeholder="000.000.000-00"
          {...register("cpf", {
            required: tErrors("required"),
            validate: (v) =>
              cpf.isValid(v) || tErrors("invalid", { field: t("cpf.name") }),
          })}
          inputMode={"numeric"}
        />

        <FormErrorMessage>{errors.cpf && errors.cpf.message}</FormErrorMessage>
      </FormControl>

      {/*Phone Input*/}
      <FormControl isRequired isInvalid={!!errors.phone}>
        <FormLabel htmlFor="phone">{t("phoneNumber.label")}</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <PhoneIcon color="gray.400" />
          </InputLeftElement>
          <Input
            id="phone"
            type="tel"
            placeholder="(11) 99999-9999"
            {...register("phone", {
              required: tErrors("required"),
              pattern: {
                value: /^[(]?\d{2}[)]? ?\d{5}-?\d{4}$/,
                message: tErrors("invalid", { field: t("phoneNumber.name") }),
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
