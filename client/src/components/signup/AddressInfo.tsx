import { FieldErrors, UseFormRegister, UseFormSetError } from "react-hook-form";
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
}

interface Address {
  postalCode?: string;
  address?: string;
  district?: string;
  city?: string;
  state?: string;
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
}: AddressInfoProps) {
  const addressInitialState: Address = {
    postalCode: "",
    address: "",
    district: "",
    city: "",
    state: "",
  };

  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState(addressInitialState);

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
        setError("postalCode", { type: "custom", message: "CEP Inválido" });
        return null;
      }
      setAddress({
        postalCode: res.cep,
        address: res.logradouro,
        district: res.bairro,
        city: res.localidade,
        state: res.uf,
      });

      return res;
    },
    enabled: false,
  });

  useEffect(() => {
    if (postalCode.length >= 8 && postalCode.length <= 9) {
      refetch().then();
    }
  }, [postalCode, refetch]);

  const postalCodeBlurHandler: React.FocusEventHandler<
    HTMLInputElement
  > = async (e) => {
    setAddress(addressInitialState);
    const postalCode = e.target.value;

    if (postalCode.length < 8 || postalCode.length > 9) return;

    console.log(postalCode);
    setPostalCode(postalCode);
  };

  return (
    <Grid>
      <FormControl isRequired isInvalid={!!errors.postalCode}>
        <FormLabel htmlFor="cep">CEP:</FormLabel>
        <Input
          id="cep"
          type="text"
          placeholder="00000-000"
          {...register("postalCode", {
            pattern: {
              value: /^\d{5}[-]?\d{3}$/,
              message: "CEP não existe",
            },
            onBlur: postalCodeBlurHandler,
          })}
        />
        <FormErrorMessage>
          {errors.postalCode && errors.postalCode.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="state">Estado:</FormLabel>
        <Input id="state" type="text" placeholder="SP" value={address.state} />
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="city">Cidade:</FormLabel>
        <Input
          id="city"
          type="text"
          placeholder="São Paulo"
          value={address.city}
        />
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="district">Bairro:</FormLabel>
        <Input
          id="district"
          type="text"
          placeholder="Canindé"
          value={address.district}
        />
      </FormControl>

      <FormControl isRequired isDisabled>
        <FormLabel htmlFor="address">Logradouro:</FormLabel>
        <Input
          id="address"
          type="text"
          placeholder="Rua Pedro Vicente"
          value={address.address}
        />
      </FormControl>
    </Grid>
  );
}
