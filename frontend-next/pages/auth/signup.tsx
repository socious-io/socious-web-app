import * as React from "react";
import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import { usernamePattern } from "utils/schemas";

const schema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  username: Joi.string().regex(usernamePattern).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(8).required(),
  passwordConfirm: Joi.string().min(8).required(),
});

const Signup: NextPage = () => {
  const [step, setStep] = useState<number | undefined>(0);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(schema),
  });
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);

  return <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="First name" {...register("firstname")} />
      <input type="text" placeholder="Last name" {...register("lastname")} />
      <input type="email" placeholder="Email" {...register("email")} />
      <input type="password" placeholder="Password" {...register("password")} />
      <input type="password" placeholder="Password Confirmation" {...register("passwordConfirm")} />

      <input type="submit" />
    </form>
  </>;
}

export default Signup;
