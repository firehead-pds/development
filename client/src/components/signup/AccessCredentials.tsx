import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import { useState } from "react";
import SignupFormFields from "../../interfaces/signup/SignupFormFields.ts";
import { useTranslation } from "react-i18next";

interface AccessCredentialsProps {
  register: UseFormRegister<SignupFormFields>;
  errors: FieldErrors<SignupFormFields>;
  setError: UseFormSetError<SignupFormFields>;
  setValue: UseFormSetValue<SignupFormFields>;
  getValues: UseFormGetValues<SignupFormFields>;
}

export default function AccessCredentials({
  register,
  errors,
  getValues,
}: AccessCredentialsProps) {
  const { t } = useTranslation("signup", {
    keyPrefix: "fields.accessCredentials",
  });
  const { t: tErrors } = useTranslation("signup", {
    keyPrefix: "validationErrors",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <>
      <FormControl isRequired isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">{t("email.label")}</FormLabel>
        <InputGroup>
          <Input
            id="email"
            placeholder={t("email.placeholder")}
            {...register("email", {
              required: tErrors("required"),
              pattern: {
                value: /^\S+@{1}\S+[.]{1}\S+$/i,
                message: tErrors("invalid", { field: t("email.name") }),
              },
              maxLength: {
                value: 50,
                message: tErrors("maxLength", { limit: "50" }),
              },
            })}
          />
          <InputLeftElement pointerEvents="none">
            <EmailIcon color="gray.400" />
          </InputLeftElement>
        </InputGroup>

        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">{t("password.label")}</FormLabel>
        <InputGroup size="md">
          <Input
            id={"password"}
            pr="4.5rem"
            type={showPassword ? "text" : "password"}
            placeholder={t("password.placeholder")}
            {...register("password", {
              required: tErrors("required"),
              minLength: 8,
              maxLength: 24,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/,
            })}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
              {showPassword
                ? t("password.toggle.hide")
                : t("password.toggle.show")}
            </Button>
          </InputRightElement>
        </InputGroup>

        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.confirmPassword}>
        <FormLabel htmlFor="password">{t("confirmPassword.label")}</FormLabel>
        <InputGroup size="md">
          <Input
            id={"confirmPassword"}
            pr="4.5rem"
            type={showPassword ? "text" : "password"}
            placeholder={t("confirmPassword.placeholder")}
            {...register("confirmPassword", {
              required: tErrors("required"),
              validate: (v) =>
                v === getValues("password") ||
                t("confirmPassword.requirements.match"),
            })}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
              {showPassword
                ? t("password.toggle.hide")
                : t("password.toggle.show")}
            </Button>
          </InputRightElement>
        </InputGroup>

        <FormErrorMessage>
          {errors.confirmPassword && errors.confirmPassword.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
}
