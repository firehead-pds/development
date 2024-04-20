import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import SignupFormFields from "../../interfaces/signup/SignupFormFields.ts";
import { useTranslation } from "react-i18next";

interface MeasurementsInfoProps {
  register: UseFormRegister<SignupFormFields>;
  errors: FieldErrors<SignupFormFields>;
  setError: UseFormSetError<SignupFormFields>;
  setValue: UseFormSetValue<SignupFormFields>;
}

const shirtSizes = ["PP", "P", "M", "G", "GG", "GGX", "GGXE"];
const pantsSizes = [34, 36, 38, 40, 42, 44, 46, 48, 50];

export default function MeasurementsInfo({
  register,
  errors,
}: MeasurementsInfoProps) {
  const { t } = useTranslation("signup", {
    keyPrefix: "fields.measurements",
  });
  const { t: tErrors } = useTranslation("signup", {
    keyPrefix: "validationErrors",
  });

  // Can't add onChange prop to numeric input for some reason
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onChange, ...shoeSize } = register("measurements.shoeSize", {
    min: Number(30),
    max: Number(48),
    required: tErrors("required"),
  });

  return (
    <>
      {/*Shirt Size Select*/}
      <FormControl isRequired isInvalid={!!errors.measurements?.shirtSize}>
        <FormLabel htmlFor="shirtSize">{t("shirtSize")}</FormLabel>{" "}
        <Select
          id="shirtSize"
          {...register("measurements.shirtSize", {
            required: tErrors("required"),
          })}
        >
          {shirtSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
      </FormControl>

      {/*Pants Size Select*/}
      <FormControl isRequired isInvalid={!!errors.measurements?.pantsSize}>
        <FormLabel htmlFor="pantsSize">{t("pantsSize")}</FormLabel>
        <Select
          id="pantsSize"
          {...register("measurements.pantsSize", {
            required: tErrors("required"),
          })}
        >
          {pantsSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
      </FormControl>

      {/*Shoe Size Select*/}
      <FormControl isRequired isInvalid={!!errors.measurements?.shoeSize}>
        <FormLabel htmlFor="shoeSize">{t("shoeSize")}</FormLabel>
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

      <FormControl isRequired isInvalid={!!errors.measurements?.height}>
        <FormLabel htmlFor={"height"}>{t("height.label")}</FormLabel>
        <Input
          id={"height"}
          type={"number"}
          inputMode={"numeric"}
          placeholder={t("height.placeholder")}
          {...register("measurements.height", {
            required: tErrors("required"),
            validate: (v) =>
              (v >= 100 && v <= 260) ||
              tErrors("invalid", { field: t("height.name") }),
          })}
        />
        <FormErrorMessage>
          {errors.measurements?.height && errors.measurements.height.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
}
