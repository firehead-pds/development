import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  HStack,
  Input,
} from "@chakra-ui/react";
import { ChangeEventHandler } from "react";
import SignupFormFields from "../../interfaces/signup/SignupFormFields.ts";
import { useTranslation } from "react-i18next";

interface AddressInfoProps {
  register: UseFormRegister<SignupFormFields>;
  errors: FieldErrors<SignupFormFields>;
  setIsFetchingPostalCode: (value: boolean) => void;
  setError: UseFormSetError<SignupFormFields>;
  setValue: UseFormSetValue<SignupFormFields>;
  getValues: UseFormGetValues<SignupFormFields>;
  trigger: UseFormTrigger<SignupFormFields>;
  watch: UseFormWatch<SignupFormFields>;
}

interface ViacepApiResponse {
  erro?: boolean;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export default function AddressInfo({
  register,
  errors,
  setIsFetchingPostalCode,
  setError,
  setValue,
  getValues,
  trigger,
  watch,
}: AddressInfoProps) {
  const { t } = useTranslation("signup", {
    keyPrefix: "fields.addressInfo",
  });
  const { t: tErrors } = useTranslation("signup", {
    keyPrefix: "validationErrors",
  });

  const watchCheckBox = watch("address.noHouseNumber");

  let controller: AbortController | null = null;

  const postalCodeChangeHandler: ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    if (controller) {
      controller.abort();
    }
    const currentValues = getValues("address");
    console.log(currentValues);

    controller = new AbortController();

    setValue("address", {
      addressNumber: currentValues.addressNumber,
      addressLine: "",
      district: "",
      city: "",
      state: "",
    });

    const currentPostalCode = e.target.value;

    if (currentPostalCode.length < 8 || currentPostalCode.length > 9 || !/^\d{5}-?\d{3}$/.test(currentPostalCode)) {
      return;
    }

    setIsFetchingPostalCode(true);

    const req = await fetch(
      "https://viacep.com.br/ws/" + currentPostalCode + "/json",
      { signal: controller.signal },
    );

    if (!req.ok) {
      throw new Error(`Fetch request failed: ${req.status} ${req.statusText}`);
    }

    const res = (await req.json()) as ViacepApiResponse;

    if (res.erro) {
      setError("address.postalCode", {
        type: "custom",
        message: tErrors("nonExistent", { field: t("postalCode.name") }),
      });
      return null;
    }

    setValue("address", {
      addressNumber: currentValues.addressNumber,
      postalCode: res.cep,
      addressLine: res.logradouro,
      district: res.bairro,
      city: res.localidade,
      state: res.uf,
    });

    setIsFetchingPostalCode(false);
    await trigger("address.postalCode");
  };

  return (
    <Grid>
      <FormControl isRequired isInvalid={!!errors.address?.postalCode}>
        <FormLabel htmlFor="cep">{t("postalCode.label")}</FormLabel>
        <Input
          id="cep"
          type="text"
          placeholder="00000-000"
          {...register("address.postalCode", {
            required: tErrors("required"),
            pattern: {
              value: /^\d{5}-?\d{3}$/,
              message: tErrors("invalid", { field: t("postalCode.name") }),
            },
          })}
          onChange={postalCodeChangeHandler}
          inputMode={"numeric"}
        />
        <FormErrorMessage>
          {errors.address?.postalCode && errors.address.postalCode.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="state">{t("state.label")}</FormLabel>
        <Input
          id="state"
          type="text"
          placeholder={t("state.placeholder")}
          {...register("address.state", {
            required: tErrors("required"),
          })}
        />
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="city">{t("city.label")}</FormLabel>
        <Input
          id="city"
          type="text"
          placeholder={t("city.placeholder")}
          {...register("address.city")}
        />
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="district">{t("district.label")}</FormLabel>
        <Input
          id="district"
          type="text"
          placeholder={t("district.placeholder")}
          {...register("address.district")}
        />
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="address">{t("addressLine.label")}</FormLabel>
        <Input
          id="address"
          type="text"
          placeholder={t("addressLine.placeholder")}
          {...register("address.addressLine")}
        />
      </FormControl>

      <HStack>
        <FormControl isRequired={!watchCheckBox} isDisabled={watchCheckBox} isInvalid={!!errors.address?.addressNumber}>
          <FormLabel htmlFor="houseNumber">Número:</FormLabel>

        <Input
          id="houseNumber"
          type="text"
          placeholder="Ex: 182"
          {...register("address.addressNumber", {
            required: {
              value: !watchCheckBox,
              message: tErrors("required")
            },
            pattern: {
              value: /^[0-9]+$/,
              message: tErrors("onlyNumbers"),
            }
          })}
          inputMode={"numeric"}
        />

        <FormErrorMessage>
          {errors.address?.addressNumber && errors.address.addressNumber.message}
        </FormErrorMessage>
      </FormControl>

        <Checkbox {...register("address.noHouseNumber")}>Checkbox</Checkbox>
      </HStack>

      <FormControl isInvalid={!!errors.address?.complement}>
        <FormLabel htmlFor="complement">{t("additionalInfo.label")}</FormLabel>
        <Input
          id="complement"
          type="text"
          placeholder={t("additionalInfo.placeholder")}
          {...register("address.complement", {
            maxLength: {
              value: 50,
              message: tErrors("maxLength", { limit: "50" }),
            },
          })}
        />
        <FormErrorMessage>
          {errors.address?.complement && errors.address.complement.message}
        </FormErrorMessage>
      </FormControl>
    </Grid>
  );
}
