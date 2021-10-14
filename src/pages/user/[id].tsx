import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Patient } from '../../services/patient';
import { Header } from '../../components/Header';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { SubTitle } from '../../components/SubTitle';
import { FormItem } from '../../components/FormItem';
import { useFormik, Field } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import SelectBox from '../../components/SelectBox';
import { RadioButton } from '../../components/RadioButton';
import { validateCPF } from '../../utils/validators';
import { Auth, setToken } from '../../services/auth';
import Image from 'next/image';
import Error from 'next/error';

interface User {
  nome: string;
  dataNascimento: string;
  cpf: string;
  username: string;
  password: string;
}

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User>();
  const [error, setError] = useState(null);
  const [isDisableValue, setIsDisable] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);

  // const fetchUser = (v) => {
  //   Patient.getById(v)
  //     .then((res) => setUser(res.data))
  //     .catch((e) => setError(e));
  // };

  // useEffect(() => {
  //   if (id) {
  //     fetchUser(id);
  //   }
  // }, [id]);

  // if (error) {
  //   return <Error statusCode={404} />;
  // }

  // if (id && user) {
  //   return (
  //     <>

  //     </>
  //   );
  // }

  const formik = useFormik({
    initialValues: {
      nome: 'Silvana Souza',
      cpf: '418.731.508-06',
      dataNascimento: '1992-03-10',
      gender: 'Feminino',
      phone: '11988778877',
      username: 'teste1@email.com',
      password: '',
      confirmPassword: '',
      acceptedTerms: false,
    },
    // validationSchema: Yup.object().shape({
    //   nome: Yup.string().required('Campo obrigatório'),
    //   username: Yup.string().email('Email inválido').required('Campo obrigatório'),
    //   cpf: Yup.string()
    //     .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Insira um CPF válido')
    //     .test('validate-cpf', 'Insira um CPF válido', (value) => {
    //       if (!value) {
    //         return true;
    //       }
    //       return validateCPF(value);
    //     })
    //     .required('Campo obrigatório'),
    //   phone: Yup.string()
    //     .matches(
    //       /^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/,
    //       'Insira um telefone válido'
    //     )
    //     .required('Campo obrigatório'),
    //   dataNascimento: Yup.string().required('Campo obrigatório'),
    //   gender: Yup.string().required('Campo obrigatório'),
    //   password: Yup.string().required('Campo obrigatório'),
    //   confirmPassword: Yup.string()
    //     .required('Campo obrigatório')
    //     .equals(
    //       [Yup.ref('password')],
    //       'A senha precisa ser a mesma digitada no campo anterior'
    //     ),
    //   acceptedTerms: Yup.boolean().isTrue('Você precisa ler e aceitar os termos'),
    // }),
    onSubmit: (values, { setFieldValue, setTouched }) => {
      // handleSubmit(values);
    },
  });

  const genders = ['Feminino', 'Masculino'];

  return (
    <>
      <Header />
      <div className="container px-48 overflow-hidden">
        <div
          className="flex flex-row items-center w-20 mt-6 text-sm font-semibold uppercase cursor-pointer text-primary-400"
          onClick={() => router.push('/')}
        >
          <IoIosArrowRoundBack className="text-2xl" />
          <p>voltar</p>
        </div>
        <div className="flex flex-col mt-3">
          <SubTitle text="dados pessoais" color="secondary" />
          <div className="flex flex-row justify-between">
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
                <div className="flex flex-row justify-between space-x-12">
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
                <div className="flex flex-row justify-between space-x-12">
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
                    <div className="flex flex-col w-2/5 space-y-3">
                      <FormItem
                        title="Senha"
                        field="password"
                        errors={formik.errors.password}
                        setFieldValue={formik.setFieldValue}
                        value={formik.values.password}
                        touched={formik.touched.password}
                      />
                      <FormItem
                        title="Confirme a senha"
                        field="confirmPassword"
                        errors={formik.errors.confirmPassword}
                        setFieldValue={formik.setFieldValue}
                        value={formik.values.confirmPassword}
                        touched={formik.touched.confirmPassword}
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
              <div className="flex items-center self-center justify-between w-1/4 text-lg underline uppercase text-ligthGreen-300">
                <a
                  className="cursor-pointer"
                  onClick={() => setIsDisable(false)}
                >
                  editar
                </a>
                <a className="cursor-pointer" onClick={() => console.log()}>
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
                    //fetchUser(id);
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
    </>
  );
}
