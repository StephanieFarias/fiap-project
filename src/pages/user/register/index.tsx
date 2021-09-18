import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoIosArrowRoundBack, IoIosCamera } from "react-icons/io";
import { Header } from "../../../components/Header";
import { SubTitle } from "../../../components/SubTitle";
import clsx from "clsx";
import { FormItem } from "../../../components/FormItem";
import SelectBox from "../../../components/SelectBox";
import Image from 'next/image';

export default function Register() {
  const [isLoading, setloading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      cpf: "",
      birthdate: "",
      gender: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Insira seu nome"),
      email: Yup.string().email("Email inválido").required("Insira seu email"),
      cpf: Yup.string().required("Insira seu cpf"),
      phone: Yup.string().required("Insira seu telefone"),
      birthdate: Yup.string().required("Informe a data de nascimento"),
      gender: Yup.string().required("Selecione o sexo"),
    }),
    onSubmit: (values, { setFieldValue, setTouched }) => {},
  });

  const genders = [
    "Feminino",
    "Masculino"
  ]

  return (
    <>
      <Header />
      <div className="container px-48 overflow-hidden bg-white">
        <div className="flex flex-row items-center mt-12 text-sm font-semibold uppercase text-primary-400">
          <IoIosArrowRoundBack className="text-2xl" />
          <p>voltar</p>
        </div>
        <div className="flex flex-col mt-6">
          <SubTitle text="dados pessoais" color="secondary" />
          <div className="flex flex-row justify-between">
            <div className="w-full">
              <div className="mt-6 space-y-5">
                <FormItem title="Name" field="name" errors={formik.errors.name} setFieldValue={formik.setFieldValue} values={formik.values.name} touched={formik.touched.name} />
                <div className="flex flex-row justify-between space-x-12">
                  <FormItem title="CPF" field="cpf" errors={formik.errors.cpf} setFieldValue={formik.setFieldValue} values={formik.values.cpf} touched={formik.touched.cpf} />
                  <FormItem title="Data de nascimento" field="birthdate" errors={formik.errors.birthdate} setFieldValue={formik.setFieldValue} values={formik.values.birthdate} touched={formik.touched.birthdate} />
                </div>
                <div className="flex flex-row justify-between space-x-12">
                  <div className="flex flex-col w-3/5 space-y-1">
                    <p className="text-sm uppercase text-primary-400">Sexo*</p> 
                    <SelectBox
                      options={genders.map((gender) => ({
                        label: gender,
                        value: gender,
                      }))}
                      value={{label: formik.values.gender, value: formik.values.gender}}
                      isDisabled={false}
                      field="gender"
                      setFieldValue={formik.setFieldValue}
                    />
                  </div>
                  <FormItem title="Telefone" field="phone" errors={formik.errors.phone} setFieldValue={formik.setFieldValue} values={formik.values.phone} touched={formik.touched.phone} />
                </div>
                <FormItem title="E-mail" field="email" errors={formik.errors.email} setFieldValue={formik.setFieldValue} values={formik.values.email} touched={formik.touched.email} />
              </div>
            </div>
            <div className="flex items-start pl-24">
              <div className="flex">
                <Image src="/images/empty-profile-picture.png" alt="profile picture" width={130} height={130} className="relative rounded-full" />
                <div className="fixed self-end p-1 ml-16 rounded-full bg-primary-400">
                  <IoIosCamera className="text-lg text-white"/>
                </div>
              </div>
            </div>
          </div>
          <button
            className={clsx(
              "flex items-center justify-center w-1/5 self-center px-3 py-1 mt-10 space-x-2 font-bold text-primary-400 border rounded-full text-md border-primary-400 bg-primary-100",
              {}
            )}
            onClick={() => {
              formik.handleSubmit();
            }}
            type="submit"
          >
            <p>{!isLoading ? "Enviar" : "Enviando..."}</p>
          </button>
        </div>
      </div>
    </>
  );
}