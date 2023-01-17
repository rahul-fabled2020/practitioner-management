import { FunctionComponent, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { AppDispatch } from '../../redux/store';
import { setCredentials, signIn } from '../../redux/slices/authSlice';

import useAuth from '../../hooks/useAuth';
import banner from '../../images/banner.jpg';

import { getUserFromToken } from '../../utils/token';
import { showErrorMessage } from '../../utils/toast';

import { refreshAccessToken } from '../../services/authService';

import { userSignInSchema } from '../../schema/authSchema';
import { SignInPayload } from '../../interfaces/interfaces';

interface LoginPageProps {}

const initialValues: SignInPayload = {
  email: '',
  password: '',
};

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const auth = useAuth();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  async function onSubmit(values: SignInPayload, { setSubmitting }: any) {
    try {
      await dispatch(signIn(values));
    } catch (error: any) {
      console.log('Login', error);
      showErrorMessage(error.response.data.error.message);
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    (async function () {
      try {
        const response = await refreshAccessToken();

        const { accessToken } = response.data.data;
        const user = getUserFromToken(accessToken);

        dispatch(setCredentials({ user, accessToken }));
      } catch (error) {}
    })();
  }, []);

  if (auth.isLoggedIn()) {
    const navigateTo: string = location?.state?.from?.pathname || '/';

    return <Navigate to={navigateTo} state={{ from: location }} replace />;
  }

  return (
    <>
      <div className="login-page">
        <div className="login-page__container">
          <Grid container>
            <Grid item md={6}>
              <div className="login-page__banner">
                <div className="login-page__banner__text">
                  <span className="login-page__banner__welcome-text">
                    Welcome to the Practitioner Management System!
                  </span>
                  Here, you will find all the tools and resources you need to manage and organize your team of
                  practitioners.
                </div>
                <div className="login-page__baner__image-wrapper">
                  <img src={banner} alt="Practitioner Management System" />
                </div>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="login-page__form-container">
                <div className="login-page__form-container__header">Practitioner Management System</div>
                <div className="login-page__form-container__header--secondary">Login Page</div>
                <div className="login-page__form-container__body">
                  <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={userSignInSchema}>
                    {formik => (
                      <Form>
                        <FormControl variant="standard" className="form-control">
                          <TextField
                            id="standard-basic"
                            label="Email"
                            variant="standard"
                            fullWidth
                            name="email"
                            error={!!(formik.touched.email && formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                          />
                        </FormControl>
                        <FormControl variant="standard" className="form-control">
                          <TextField
                            id="standard-basic"
                            label="Password"
                            variant="standard"
                            type="password"
                            fullWidth
                            name="password"
                            error={!!(formik.touched.password && formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                          />
                        </FormControl>
                        <div className="login-page__form-container__submit-button-wrapper">
                          <Button
                            variant="contained"
                            fullWidth
                            className="login-page__form-container__submit-button"
                            type="submit"
                            disabled={!formik.isValid || formik.isSubmitting}
                          >
                            Sign in
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>

                <div className="login-page__form-footer">
                  New to Practitioner Management? <u>Create an Account</u>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
