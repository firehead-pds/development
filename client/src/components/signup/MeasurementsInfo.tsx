import {
  FormControl,
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
  // Can't add onChange prop to numeric input for some reason
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onChange, ...shoeSize } = register("measurements.shoeSize", {
    min: Number(30),
    max: Number(48),
    required: "required",
  });

  return (
    <>
      {/*Shirt Size Select*/}
      <FormControl isRequired isInvalid={!!errors.measurements?.shirtSize}>
        <FormLabel htmlFor="shirtSize">Shirt Size: </FormLabel>{" "}
        <Select
          id="shirtSize"
          {...register("measurements.shirtSize", {
            required: "required",
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
        <FormLabel htmlFor="pantsSize">Pants Size: </FormLabel>
        <Select
          id="pantsSize"
          {...register("measurements.pantsSize", { required: "required" })}
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

      <FormControl isRequired isInvalid={!!errors.measurements?.height}>
        <FormLabel htmlFor={"height"}>Height (cm):</FormLabel>
        <Input
          id={"height"}
          type={"number"}
          inputMode={"numeric"}
          {...register("measurements.height", { required: true })}
        />
      </FormControl>
    </>
  );
}
