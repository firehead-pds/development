import {
  FormControl,
  FormLabel,
  Grid,
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
import { IFormInputs } from "../../pages/Signup.tsx";

interface MeasurementsInfoProps {
  register: UseFormRegister<IFormInputs>;
  errors: FieldErrors<IFormInputs>;
  setError: UseFormSetError<IFormInputs>;
  setValue: UseFormSetValue<IFormInputs>;
}

const shirtSizes = ["PP", "P", "M", "G", "GG", "GGX", "GGXE"];
const pantsSizes = [34, 36, 38, 40, 42, 44, 46, 48, 50];

export default function MeasurementsInfo({
  register,
  errors,
}: MeasurementsInfoProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onChange, ...shoeSize } = register("shoeSize", {
    min: Number(30),
    max: Number(48),
    valueAsNumber: true,
  });

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)">
        {/*Shirt Size Select*/}
        <FormControl isRequired isInvalid={!!errors.shirtSize}>
          <FormLabel htmlFor="shirtSize">Shirt Size: </FormLabel>{" "}
          <Select id="shirtSize" {...register("shirtSize")}>
            {shirtSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
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
    </>
  );
}
