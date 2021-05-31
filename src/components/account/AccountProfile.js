import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider, Grid,
  Typography
} from '@material-ui/core';
import { auth, firestore, storage } from '../../firebase';
import React, { Component } from 'react';

export default class AccountProfile extends Component {
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
            this.setState({student: data})
          }
        })

      }).catch( error => console.log(error))

    console.log("account Component mounted")

  }

  render() {
    const student = this.state.student
    return (
      <Card {...this.props}>
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar
              sx={{
                height: 100,
                width: 100
              }}
            />
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h3"
            >
              {student.firstname + " " + student.lastname}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {student.email}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Student
            </Typography>
          </Box>
          <Divider variant="middle"/>
          <Grid container justifyContent={'center'} sx={{mt: 2}}>
            <Grid item>
              <Button
                variant="contained"
                component="label"
              >
                Upload Profile Picture
                <input
                  type="file"
                  hidden
                />
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}


