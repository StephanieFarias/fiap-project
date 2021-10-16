import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IoIosArrowRoundBack, IoIosCamera } from 'react-icons/io';
import { Header } from '../../../components/Header';
import { SubTitle } from '../../../components/Subtitle';
import clsx from 'clsx';
import { FormItem } from '../../../components/FormItem';
import SelectBox from '../../../components/SelectBox';
import Image from 'next/image';
import { RadioButton } from '../../../components/RadioButton';
import { Patient } from '../../../services/patient';
import { useRouter } from 'next/router';
import { Auth, setToken } from '../../../services/auth';
import { validationRules } from '../../../utils/formValidators';
import { IPatient } from '../../../types/IPatient';
import { MenuMobile } from '../../../components/MenuMobile';
import { useToasts } from 'react-toast-notifications';

export default function Register() {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const { addToast } = useToasts();

  const formik = useFormik({
    initialValues: {
      nome: '',
      cpf: '',
      dataNascimento: '',
      gender: '',
      phone: '',
      username: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: false,
    },
    validationSchema: Yup.object().shape({
      nome: validationRules.requiredString,
      username: validationRules.email,
      cpf: validationRules.requiredCpf,
      phone: validationRules.RequiredPhone,
      dataNascimento: validationRules.requiredString,
      gender: validationRules.requiredString,
      password: validationRules.requiredString,
      confirmPassword: validationRules.confirmPassword,
      acceptedTerms: validationRules.requiredTerms,
    }),
    onSubmit: (values, { setFieldValue, setTouched }) => {
      setLoading(true);
      const payload: IPatient = {
        dataNascimento: new Date(values.dataNascimento).toISOString().substring(0, 16).replace('T', ' '),
        acceptedTerms: values.acceptedTerms,
        password: values.password,
        cpf: values.cpf,
        nome: values.nome,
        sexo: values.gender,
        username: values.username,
        telefone: values.phone
      }
      try {
        Patient.create({
          ...payload,
        })
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              console.log(res.data);
              setToken(res.data.token, res.data.codigo);
              setLoading(false);
              router.push(`/user/${res.data.codigo}`);
              addToast('Paciente cadastrado com sucesso.', { appearance: 'success' });
            }
          })
          .catch((error) => {
            setLoading(false);
            addToast('Erro ao criar paciente', { appearance: 'error' });
          })
          .finally(() => {
            setLoading(false);
          });
      } catch {
        setLoading(false);
        addToast('Falha ao cadastrar paciente', { appearance: 'error' });
      }
    },
  });

  const genders = ['Feminino', 'Masculino'];

  return (
    <>
      <Header />
      <div className="container px-10 overflow-hidden bg-white lg:px-48">
        <div
          className="flex flex-row items-center w-20 mt-4 text-sm font-semibold uppercase cursor-pointer text-primary-400"
          onClick={() => router.push('/')}
        >
          <IoIosArrowRoundBack className="text-2xl" />
          <p>voltar</p>
        </div>
        <div className="flex flex-col mt-3 mb-24 lg:mb-0">
          <SubTitle text="dados pessoais" color="secondary" />
          <div className="flex flex-col-reverse justify-between mt-5 lg:flex-row lg:mt-0">
            <div className="w-full">
              <div className="mt-6 space-y-3">
                <FormItem
                  title="Nome"
                  field="nome"
                  errors={formik.errors.nome}
                  setFieldValue={formik.setFieldValue}
                  value={formik.values.nome}
                  touched={formik.touched.nome}
                />
                <div className="flex flex-col justify-between space-y-3 lg:space-y-0 lg:space-x-12 lg:flex-row">
                  <FormItem
                    title="CPF"
                    field="cpf"
                    errors={formik.errors.cpf}
                    setFieldValue={formik.setFieldValue}
                    value={formik.values.cpf}
                    touched={formik.touched.cpf}
                  />
                  <FormItem
                    title="Data de nascimento"
                    field="dataNascimento"
                    type="date"
                    errors={formik.errors.dataNascimento}
                    setFieldValue={formik.setFieldValue}
                    value={formik.values.dataNascimento}
                    touched={formik.touched.dataNascimento}
                  />
                </div>
                <div className="flex flex-col justify-between space-y-3 lg:space-y-0 lg:space-x-12 lg:flex-row">
                  <div className="flex flex-col w-3/5 space-y-1">
                    <p className="text-sm uppercase text-primary-400">Sexo*</p>
                    <SelectBox
                      options={genders.map((gender) => ({
                        label: gender,
                        value: gender,
                      }))}
                      value={{
                        label: formik.values.gender,
                        value: formik.values.gender,
                      }}
                      isDisabled={false}
                      field="gender"
                      setFieldValue={formik.setFieldValue}
                    />
                  </div>
                  <FormItem
                    title="Telefone"
                    field="phone"
                    errors={formik.errors.phone}
                    setFieldValue={formik.setFieldValue}
                    value={formik.values.phone}
                    touched={formik.touched.phone}
                  />
                </div>
                <FormItem
                  title="E-mail"
                  field="username"
                  errors={formik.errors.username}
                  setFieldValue={formik.setFieldValue}
                  value={formik.values.username}
                  touched={formik.touched.username}
                />
                <div className="flex flex-col space-y-3 lg:w-2/5">
                  <FormItem
                    title="Senha"
                    field="password"
                    errors={formik.errors.password}
                    setFieldValue={formik.setFieldValue}
                    value={formik.values.password}
                    touched={formik.touched.password}
                    type="password"
                  />
                  <FormItem
                    title="Confirme a senha"
                    field="confirmPassword"
                    errors={formik.errors.confirmPassword}
                    setFieldValue={formik.setFieldValue}
                    value={formik.values.confirmPassword}
                    touched={formik.touched.confirmPassword}
                    type="password"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center space-x-3">
                    <RadioButton
                      field="acceptedTerms"
                      isChecked={formik.values.acceptedTerms}
                      setFieldValue={formik.setFieldValue}
                    />
                    <p className="text-sm">
                      Declaro que li e aceito os{' '}
                      <span className="uppercase cursor-pointer text-ligthGreen-300">
                        termos e condições
                      </span>
                    </p>
                  </div>
                  {formik.errors.acceptedTerms &&
                    formik.touched.acceptedTerms && (
                      <p className="text-sm font-light text-left text-red-500 ">
                        {formik.errors.acceptedTerms}
                      </p>
                    )}
                </div>
              </div>
            </div>
            <div className="flex items-start pl-24">
              <div className="flex">
                <Image
                  src="/images/empty-profile-picture.png"
                  alt="profile picture"
                  width={130}
                  height={130}
                  className="relative rounded-full"
                />
                <div className="absolute p-1 ml-20 rounded-full lg:ml-16 lg:self-end lg:fixed bg-primary-400">
                  <IoIosCamera className="text-lg text-white" />
                </div>
              </div>
            </div>
          </div>
          <button
            className={clsx(
              'flex items-center justify-center lg:w-1/5 self-center px-6 lg:px-3 py-1 mt-10 space-x-2 font-bold text-primary-400 border rounded-full text-md border-primary-400 bg-primary-100',
              {}
            )}
            onClick={() => {
              formik.handleSubmit();
            }}
            type="submit"
          >
            <p>{!isLoading ? 'Cadastrar' : 'Enviando...'}</p>
          </button>
        </div>
      </div>
      <MenuMobile />
    </>
  );
}
