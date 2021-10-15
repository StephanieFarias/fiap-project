import * as Yup from 'yup';
import { validateCPF } from '../utils/validators';

export const validationMessages = {
  required: '* campo obrigatório',
  email: '* e-mail inválido',
  password: '* é necessa´rio preencher a senha',
  passwordConfirm: '* a senha precisa ser a mesma digitada no campo anterior',
  cpf: '* CPF inválido',
  phone: '* insira um telefone válido',
  terms: '* você precisa ler e aceitar os termos',
};

export const validationRules = {
  requiredString: Yup.string().required(validationMessages.required),
  requiredCpf: Yup.string()
    .matches(/^\d{3}\d{3}\d{3}\d{2}$/, 'Insira um CPF válido')
    .test('validate-cpf', 'Insira um CPF válido', (value) => {
      if (!value) {
        return true;
      }
      return validateCPF(value);
    })
    .required(validationMessages.required),
  RequiredPhone: Yup.string()
    .matches(
      /^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/,
      validationMessages.phone
    )
    .required(validationMessages.required),
  requiredTerms: Yup.boolean().isTrue(validationMessages.terms),
  confirmPassword: Yup.string()
    .equals([Yup.ref('password')], validationMessages.passwordConfirm)
    .required(validationMessages.required),
  email: Yup.string().email(validationMessages.email).required(validationMessages.required),
};
