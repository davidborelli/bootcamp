import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Form } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

export default function SignUp() {
  const handleSubmit = data => {
    console.tron.log(data);
  };

  return (
    <>
      <img src={logo} alt="Logo GoBarber" />

      <Form onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
