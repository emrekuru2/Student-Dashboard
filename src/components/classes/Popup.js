import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { Box, TextField, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { auth, firestore } from '../../firebase';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { showSuccessSnackbar } from '../../actions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({name}) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  function addClass(code) {
    let count = 0
    firestore.collection('classes')
      .get()
      .then( snapshot => {
        const user = auth.currentUser.uid
        snapshot.forEach(doc => {
          const data = doc.data()
          const id = doc.id
          if (data.description === code) {
            firestore.collection('classes')
              .doc(id)
              .update({ students: firebase.firestore.FieldValue.arrayUnion(user) })
              .then(r => {
                console.log("student added to the class successfully")
              })

            let classInfo = { name : id, grade : 50}
            firestore.collection('students')
              .doc(user)
              .update({ classes: firebase.firestore.FieldValue.arrayUnion(classInfo)})
              .then(r => {
                console.log("class added to the student's classes successfully")
              })

            setTimeout(function(){
              dispatch(showSuccessSnackbar("Joined successfully"))
              handleClose()
            }, 100);

            count++;
          }
        })
        if (count === 0) {
          dispatch(showSuccessSnackbar("You have entered a wrong code. Please check if they are all capital letters"))
        }

      })
      .catch( error => console.log(error))
  }

  function removeClass(code) {
    let count = 0
    firestore.collection('classes')
      .get()
      .then( snapshot => {
        const user = auth.currentUser.uid
        let classes = null;
        snapshot.forEach(doc => {
          const data = doc.data()
          const id = doc.id
          if (data.description === code) {
            firestore.collection('students')
              .get()
              .then( otherSnapShot => {
                otherSnapShot.forEach( person => {
                  if(person.id === user) {
                    classes = Object.values(person.data().classes)
                    for(const element in classes) {
                      if(classes.hasOwnProperty(element)) {
                        if(classes[element].name === id) {
                          classes.splice(classes[element], 1)
                        }
                      }
                    }

                  }

                })

                firestore.collection('classes')
                  .doc(id)
                  .update({ students: firebase.firestore.FieldValue.arrayRemove(user) })
                  .then(r => {

                  })

                firestore.collection('students')
                  .doc(user)
                  .update({classes : classes})
                  .then(r => {

                  })

              })

            setTimeout(function(){
              dispatch(showSuccessSnackbar("Left Successfully"))
              handleClose()
            }, 100);

            count++;

          }
        })

        if (count === 0) {
          dispatch(showSuccessSnackbar("You have entered a wrong code. Please check if they are all capital letters"))
        }

      })
      .catch( error => console.log(error))




  }

  return (
    <div>
      <Button variant="outlined" color="primary" sx={{mx : 1}} onClick={handleClickOpen}>
        {name} a Class
      </Button>
      <Dialog
        fullWidth
        maxWidth={'md'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Formik
            initialValues={{
              classCode: '',
            }}
            validationSchema={
              Yup.object().shape({
                classCode: Yup.string().max(255).required('Class Code is required')
              })
            }
            onSubmit={(values) => {
              if (name === "Join") {
                addClass(values.classCode)
              } else {
                removeClass(values.classCode)
              }
            }}
          >
            {props => (
              <form onSubmit={props.handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    {name} a class
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    To {name} a class, please write the class code in the text field
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(props.touched.classCode && props.errors.classCode)}
                  fullWidth
                  helperText={props.touched.classCode && props.errors.classCode}
                  label="Class Code"
                  margin="normal"
                  name="classCode"
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  value={props.values.classCode}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    onClick={props.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {name} the class now!
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
