import { useState } from 'react';
import {
  Box,
  Button,
  TextField, Typography
} from '@material-ui/core';
import React, { Component } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { auth, firestore } from '../../firebase';


class AccountProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student : {}
    }

  }

  componentDidMount() {
    firestore.collection('students')
      .get()
      .then( snapshot => {
        const user = auth.currentUser.uid
        snapshot.forEach(doc => {
          const data = doc.data()
          const uid = doc.id;
          if (user === uid) {
            this.setState({student : data})
          }
        })

      }).catch( error => console.log(error))

  }


  firestoreSubmit(firstname, lastname) {
    const user = auth.currentUser.uid
    firestore.collection('students')
      .doc(user)
      .update({
        firstname: firstname,
        lastname: lastname,
      }).then(r => {
        alert("updated successfully")
    })
  }


  render() {
    const student = this.state.student
    return (
      <Formik
        initialValues={{
          firstName: '',
          lastName: ''
        }}
        validationSchema={
          Yup.object().shape({
            firstName: Yup.string().max(255).required('First name is required'),
            lastName: Yup.string().max(255).required('Last name is required'),

          })
        }
        onSubmit={(values) => {
          this.firestoreSubmit(values.firstName, values.lastName)

        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values}) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 0 }}>
              <Typography
                color="textPrimary"
                variant="h2"
              >
                Change account information
              </Typography>
              <Typography
                color="textPrimary"
                variant="body1"
              >
                Please fill both fields to change
              </Typography>
            </Box>
            <TextField
              error={Boolean(touched.firstName && errors.firstName)}
              fullWidth
              helperText={touched.firstName && errors.firstName}
              label= {student.firstname}
              margin="normal"
              name="firstName"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.lastName && errors.lastName)}
              fullWidth
              helperText={touched.lastName && errors.lastName}
              label= {student.lastname}
              margin="normal"
              name="lastName"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                onClick={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Change now
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    );
  }
}


export default AccountProfileDetails;



