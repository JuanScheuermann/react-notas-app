import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useMemo, useState } from 'react'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'

const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe contener un "@"'],
    password: [(value) => value.length >= 6, 'La contraseña debe ser mayor a 6 caracteres'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {


    const dispatch = useDispatch()
    const { status, errorMessage } = useSelector((state) => state.auth);
    const [formSubmited, setFormSubmited] = useState(false);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

    const {
        displayName, email, password, onInputChange, formState,
        isFormValid, emailValid, passwordValid, displayNameValid
    }
        = useForm(formData, formValidations);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!isFormValid) return;
        dispatch(startCreatingUserWithEmailPassword(formState));
    };

    return (
        <AuthLayout title='Crear Cuenta'>
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre"
                            type="text"
                            name='displayName'
                            placeholder="Nombre completo"
                            fullWidth
                            onChange={onInputChange}
                            value={displayName}
                            error={!!displayNameValid && formSubmited} /* !!'abc' === true | !!null === false */
                            helperText={displayNameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="correo"
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name='email'
                            onChange={onInputChange}
                            value={email}
                            error={!!emailValid && formSubmited} /* !!'abc' === true | !!null === false */
                            helperText={emailValid}
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
                            error={!!passwordValid && formSubmited} /* !!'abc' === true | !!null === false */
                            helperText={passwordValid}
                        />
                    </Grid>


                    <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>

                        <Grid
                            item
                            xs={12}
                            display={!!errorMessage ? '' : 'none'}
                        >

                            <Alert severity='error'>
                                {errorMessage}
                            </Alert>
                        </Grid>

                        <Grid item xs={12} >
                            <Button
                                type='submit'
                                variant="contained"
                                disabled={isCheckingAuthentication}
                                fullWidth>
                                Crear cuenta
                            </Button>
                        </Grid>

                    </Grid>


                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
                        <Link component={RouterLink} color='inherit' to='/auth/login'>
                            Ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
