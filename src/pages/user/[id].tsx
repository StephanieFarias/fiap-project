import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Patient } from '../../services/patient';
import { Header } from '../../components/Header';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { SubTitle } from '../../components/Subtitle';
import { FormItem } from '../../components/FormItem';
import { Modal } from '../../components/Modal';
import { useFormik } from 'formik';
import clsx from 'clsx';
import SelectBox from '../../components/SelectBox';
import { RadioButton } from '../../components/RadioButton';
import Image from 'next/image';
import Error from 'next/error';
import { validationRules } from '../../utils/formValidators';
import * as Yup from 'yup';
import { IPatient } from '../../types/IPatient';
import { MenuMobile } from '../../components/MenuMobile';

interface patient {
  nome: string;
  cpf: string;
  dataNascimento: string;
  sexo: string;
  telefone: string;
  username: string;
}

export default function User() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<patient>();
  const [error, setError] = useState(null);
  const [isDisableValue, setIsDisable] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const onConfirmModal = () => {
    try {
      Patient.deactivate(id)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            setLoading(false);
            router.push('/');
            console.log('Paciente excluído com sucesso.'); // fazer um componente de toast para os feedbacks
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log('Erro ao excluir paciente');
        })
        .finally(() => {
          setLoading(false);
        });
    } catch {
      setLoading(false);
      console.log('Falha ao excluir paciente');
    }
  }

  const fetchUser = (v: any) => {
    Patient.getById(v)
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => setError(e));
  };

  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
      nome: user?.nome,
      cpf: user?.cpf,
      dataNascimento:
        user?.dataNascimento &&
        new Date(user?.dataNascimento).toISOString().substring(0, 10),
      gender: user?.sexo,
      phone: user?.telefone,
      username: user?.username,
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
    enableReinitialize: true,
    onSubmit: (values, { setFieldValue, setTouched }) => {
      setLoading(true);
      const payload = {
        ...values,
      };
      payload.dataNascimento =
        values.dataNascimento &&
        new Date(values.dataNascimento)
          .toISOString()
          .substring(0, 16)
          .replace('T', ' ');

      try {
        Patient.edit(id, {
          ...payload,
        })
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              setLoading(false);
              router.reload();
              console.log('Paciente editado com sucesso.'); // fazer um componente de toast para os feedbacks
            }
          })
          .catch((error) => {
            setLoading(false);
            console.log('Erro ao editar paciente');
          })
          .finally(() => {
            setLoading(false);
          });
      } catch {
        setLoading(false);
        console.log('Falha ao editar paciente');
      }
    },
  });

  const genders = ['Feminino', 'Masculino'];

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!user) {
    return null;
  }

  if (id && user) {
    return (
      <>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} onConfirm={onConfirmModal}>
            <p className="pt-5 text-xl text-center text-white">
              Você tem certeza que deseja excluir sua conta?
            </p>
          </Modal>
        )}
        <Header />
        <div className="container px-10 overflow-hidden bg-white lg:px-48">
          <div
            className="flex flex-row items-center w-20 mt-6 text-sm font-semibold uppercase cursor-pointer text-primary-400"
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
                    isDisabled={isDisableValue}
                  />
                  <div className="flex flex-col justify-between space-y-3 lg:space-y-0 lg:space-x-12 lg:flex-row">
                    <FormItem
                      title="CPF"
                      field="cpf"
                      errors={formik.errors.cpf}
                      setFieldValue={formik.setFieldValue}
                      value={formik.values.cpf}
                      touched={formik.touched.cpf}
                      isDisabled={isDisableValue}
                    />
                    <FormItem
                      title="Data de nascimento"
                      field="dataNascimento"
                      type="date"
                      errors={formik.errors.dataNascimento}
                      setFieldValue={formik.setFieldValue}
                      value={formik.values.dataNascimento}
                      touched={formik.touched.dataNascimento}
                      isDisabled={isDisableValue}
                    />
                  </div>
                  <div className="flex flex-col justify-between space-y-3 lg:space-y-0 lg:space-x-12 lg:flex-row">
                    <div className="flex flex-col w-3/5 space-y-1">
                      <p className="text-sm uppercase text-primary-400">
                        Sexo*
                      </p>
                      <SelectBox
                        options={genders.map((gender) => ({
                          label: gender,
                          value: gender,
                        }))}
                        value={{
                          label: formik.values.gender || genders[0],
                          value: formik.values.gender || genders[0],
                        }}
                        isDisabled={isDisableValue}
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
                      isDisabled={isDisableValue}
                    />
                  </div>
                  <FormItem
                    title="E-mail"
                    field="username"
                    errors={formik.errors.username}
                    setFieldValue={formik.setFieldValue}
                    value={formik.values.username}
                    touched={formik.touched.username}
                    isDisabled={isDisableValue}
                  />
                  {!isDisableValue && (
                    <>
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
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-start pl-24">
                <Image
                  src="/images/mock-avatar.jpg"
                  alt="profile picture"
                  width={130}
                  height={130}
                  className="relative rounded-full"
                />
              </div>
            </div>
            {isDisableValue ? (
              <>
                <div className="flex items-center self-center justify-between space-x-5 text-base underline uppercase lg:space-x-0 lg:text-lg lg:w-1/4 text-ligthGreen-300">
                  <a
                    className="cursor-pointer"
                    onClick={() => setIsDisable(false)}
                  >
                    editar
                  </a>
                  <a className="cursor-pointer" onClick={() => setShowModal(true)}>
                    excluir conta
                  </a>
                </div>
              </>
            ) : (
              <div className="flex items-center self-center justify-between mt-10 space-x-8">
                <a
                  className="text-xs underline uppercase cursor-pointer text-ligthGreen-300"
                  onClick={() => {
                    setIsDisable(true);
                    formik.setErrors(formik.initialErrors);
                    formik.setTouched(formik.initialTouched);
                    formik.setValues(formik.initialValues);
                  }}
                >
                  cancelar
                </a>
                <button
                  className={clsx(
                    ' px-20 py-1 space-x-2 font-bold text-primary-400 border rounded-full text-md border-primary-400 bg-primary-100',
                    {}
                  )}
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                  type="submit"
                >
                  <p>{!isLoading ? 'Salvar' : 'Enviando...'}</p>
                </button>
              </div>
            )}
          </div>
        </div>
        <MenuMobile />
      </>
    );
  }
}
