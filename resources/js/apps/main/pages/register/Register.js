import React, { Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import RegisterForm from '@/pages/register/RegisterForm';
import Error from '@/components/Error';
import { REGISTER_USER } from '@/query/registerQuery';

export default function Register() {
  const [register, { error }] = useMutation(REGISTER_USER);

  return (
    <Fragment>
      <Error error={error} />
      <RegisterForm onSubmit={register} />
    </Fragment>
  );
}
