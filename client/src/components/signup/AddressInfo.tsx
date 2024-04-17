import {
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IFormInputs } from "../../pages/Signup.tsx";
import { useQuery } from "@tanstack/react-query";

interface AddressInfoProps {
  register: UseFormRegister<IFormInputs>;
  errors: FieldErrors<IFormInputs>;
  setError: UseFormSetError<IFormInputs>;
  setValue: UseFormSetValue<IFormInputs>;
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
  setError,
  setValue,
}: AddressInfoProps) {
  const [postalCode, setPostalCode] = useState("");

  const { refetch } = useQuery({
    queryKey: ["postalCode", postalCode],
    queryFn: async ({ queryKey }) => {
      const currentPostalCode = queryKey[1];

      const req = await fetch(
        "https://viacep.com.br/ws/" + currentPostalCode + "/json",
      );

      if (!req.ok) {
        throw new Error(
          `Fetch request failed: ${req.status} ${req.statusText}`,
        );
      }

      const res = (await req.json()) as ViacepApiResponse;

      if (res.erro) {
        setError("address.postalCode", {
          type: "custom",
          message: "CEP Inválido",
        });
        return null;
      }

      setValue("address", {
        postalCode: res.cep.replace("-", ""),
        addressLine: res.logradouro,
        district: res.bairro,
        city: res.localidade,
        state: res.uf,
      });

      return res;
    },
    enabled: false,
  });

  useEffect(() => {
    if (postalCode.length === 8) {
      refetch().then();
      console.log(postalCode);
    }
  }, [refetch, postalCode]);

  const postalCodeBlurHandler: React.FocusEventHandler<
    HTMLInputElement
  > = async (e) => {
    setValue("address", {
      addressLine: "",
      district: "",
      city: "",
      state: "",
    });

    const postalCode = e.target.value.replace("-", "");

    if (postalCode.length !== 8 || !/^\d+$/.test(postalCode)) {
      setError("address.postalCode", { message: "CEP Inválido" });
      return;
    }

    setPostalCode(postalCode);
  };

  return (
    <Grid>
      <FormControl isRequired isInvalid={!!errors.address?.postalCode}>
        <FormLabel htmlFor="cep">CEP:</FormLabel>
        <Input
          id="cep"
          type="text"
          placeholder="00000-000"
          {...register("address.postalCode", {
            pattern: {
              value: /^\d{5}[-]?\d{3}$/,
              message: "CEP não existe",
            },
            onBlur: postalCodeBlurHandler,
          })}
        />
        <FormErrorMessage>
          {errors.address?.postalCode && errors.address.postalCode.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="state">Estado:</FormLabel>
        <Input
          id="state"
          type="text"
          placeholder="SP"
          {...register("address.state", {
            required: true,
          })}
        />
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="city">Cidade:</FormLabel>
        <Input
          id="city"
          type="text"
          placeholder="São Paulo"
          {...register("address.city")}
        />
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="district">Bairro:</FormLabel>
        <Input
          id="district"
          type="text"
          placeholder="Canindé"
          {...register("address.district")}
        />
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="address">Logradouro:</FormLabel>
        <Input
          id="address"
          type="text"
          placeholder="Rua Pedro Vicente"
          {...register("address.addressLine")}
        />
      </FormControl>
    </Grid>
  );
}
