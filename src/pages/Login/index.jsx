import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '111test@test.com',
      password: '12345'
    },
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))

    if(!data.payload){
      return alert('Failed to log in')
    }

    if('token' in data.payload){
      window.localStorage.setItem('token',data.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to="/" />
  }



  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="email"
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Enter email' })}
          fullWidth
        />
        <TextField type="password" className={styles.field} label="Пароль" error={Boolean(errors.password?.message)} helperText={errors.password?.message}  {...register('password', { required: 'Enter password' })} fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
