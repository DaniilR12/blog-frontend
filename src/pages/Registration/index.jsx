import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: 'Daniil Riazan',
      email: 'daniil@test.com',
      password: '12345'
    },
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))

    if (!data.payload) {
      return alert('Failed to registration')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Enter full Name' })}
          fullWidth className={styles.field} label="Full name" />
        <TextField type='email' error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Enter email' })}
          fullWidth className={styles.field} label="E-Mail" />
        <TextField type='password' error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Enter password' })}
          fullWidth className={styles.field} label="Password" />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>

    </Paper>
  );
};
