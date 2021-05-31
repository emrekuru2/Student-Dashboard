import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { auth, firestore } from '../firebase';
import { useDispatch} from 'react-redux';
import { showSuccessSnackbar} from '../actions';


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const signUpWithMail = (email, password, firstname, lastname) => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        firestore.collection('students').doc(user.uid).set({
          email: email,
          firstname: firstname,
          lastname: lastname,
          classes: []
        }, { merge: true }).then(r => {
          user.sendEmailVerification().then(verification => {
            dispatch(showSuccessSnackbar("Registered successfully. Please verify your email address"))
            navigate('/login', {replace: true})
          })

        })
      }).catch((error) => {
        dispatch(showSuccessSnackbar(error.message))

    });
  }

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              passwordConfirmation: ''
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                firstName: Yup.string().max(255).required('First name is required'),
                lastName: Yup.string().max(255).required('Last name is required'),
                password: Yup.string().min(8, 'Password is too short - should be 8 chars minimum.').required('password is required'),
                passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
              })
            }
            onSubmit={(values) => {
              signUpWithMail(values.email, values.password, values.firstName, values.lastName)

            }}
          >
            {props => (
              <form onSubmit={props.handleSubmit}>
                <Box sx={{ mb: 1 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(props.touched.firstName && props.errors.firstName)}
                  fullWidth
                  helperText={props.touched.firstName && props.errors.firstName}
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  value={props.values.firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(props.touched.lastName && props.errors.lastName)}
                  fullWidth
                  helperText={props.touched.lastName && props.errors.lastName}
                  label="Last name"
                  margin="normal"
                  name="lastName"
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  value={props.values.lastName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(props.touched.email && props.errors.email)}
                  fullWidth
                  helperText={props.touched.email && props.errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  type="email"
                  value={props.values.email}
                  variant="outlined"
                />
                <Grid container spacing={3} justifyContent={'center'}>
                  <Grid item xs={6}>
                    <TextField
                      error={Boolean(props.touched.password && props.errors.password)}
                      fullWidth
                      helperText={props.touched.password && props.errors.password}
                      label="Password"
                      margin="normal"
                      name="password"
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      type="password"
                      value={props.values.password}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                    error={Boolean(props.touched.passwordConfirmation && props.errors.passwordConfirmation)}
                    fullWidth
                    helperText={props.touched.passwordConfirmation && props.errors.passwordConfirmation}
                    label="Password Confirmation"
                    margin="normal"
                    name="passwordConfirmation"
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    type="password"
                    value={props.values.passwordConfirmation}
                    variant="outlined"
                    />
                  </Grid>
                  </Grid>
                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      onClick={props.isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign up now
                    </Button>
                  </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;
