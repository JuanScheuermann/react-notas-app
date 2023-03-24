import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography, Alert } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startGoogleSignIn, startLoginWithEnailPassword } from '../../store/auth/thunks'

const formData = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector((state) => state.auth)

    const { email, password, onInputChange, formState } = useForm(formData)

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const onSubmit = (event) => {
        event.preventDefault();

        dispatch(startLoginWithEnailPassword(formState));

    }

    const onGoogleSingIn = () => {

        dispatch(startGoogleSignIn());
    }


    return (
        <AuthLayout title='Login'>

            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="correo"
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name='email'
                            onChange={onInputChange}
                            value={email}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="contraseña"
                            type="password"
                            placeholder="contraseña"
                            fullWidth
                            name='password'
                            onChange={onInputChange}
                            value={password}
                        />
                    </Grid>


                    <Grid container spacing={2} sx={{ mt: 1 }}>

                        <Grid
                            item
                            xs={12}
                            display={!!errorMessage ? '' : 'none'}
                        >

                            <Alert severity='error'>
                                {errorMessage}
                            </Alert>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticating}
                                type='submit'
                                variant="contained"
                                fullWidth>
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticating}
                                variant="contained"
                                fullWidth
                                onClick={onGoogleSingIn}>
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>


                    <Grid container direction='row' justifyContent='end'>
                        <Link component={RouterLink} color='inherit' to='/auth/register'>
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
