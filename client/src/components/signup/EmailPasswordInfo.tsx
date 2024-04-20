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

interface EmailPasswordInfoProps {
  register: UseFormRegister<SignupFormFields>;
  errors: FieldErrors<SignupFormFields>;
  setError: UseFormSetError<SignupFormFields>;
  setValue: UseFormSetValue<SignupFormFields>;
  getValues: UseFormGetValues<SignupFormFields>;
}

export default function EmailPasswordInfo({
  register,
  errors,
  getValues,
}: EmailPasswordInfoProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <>
      <FormControl isRequired isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <InputGroup>
          <Input
            id="email"
            type="email"
            placeholder="Type your email..."
            {...register("email", {
              required: "required",

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
          <InputLeftElement pointerEvents="none">
            <EmailIcon color="gray.400" />
          </InputLeftElement>
        </InputGroup>

        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup size="md">
          <Input
            id={"password"}
            pr="4.5rem"
            type={showPassword ? "text" : "password"}
            placeholder="Type your password..."
            {...register("password", {
              required: "required",
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
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.confirmPassword}>
        <FormLabel htmlFor="password">Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            id={"confirmPassword"}
            pr="4.5rem"
            type={showPassword ? "text" : "password"}
            placeholder="Re-enter your password..."
            {...register("confirmPassword", {
              required: "required",

              validate: (v) =>
                v === getValues("password") || "Passwords do not match",
            })}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
              {showPassword ? "Hide" : "Show"}
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
