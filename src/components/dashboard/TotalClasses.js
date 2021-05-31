import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import ClassIcon from '@material-ui/icons/Class';
import React, { Component } from 'react';
import { auth, firestore } from '../../firebase';

export default class TotalClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student : null
    }

  }

  componentDidMount() {
    firestore.collection('students')
      .get()
      .then( snapshot => {
        const students = []
        const user = auth.currentUser.uid
        snapshot.forEach(doc => {
          const data = doc.data()
          const uid = doc.id;
          if (user === uid) {
            students.push(data)
          }
        })
        this.setState({student : students})
      })
      .catch( error => console.log(error))

    console.log("totalclasses")
  }


  render() {
    return (
      <Card {...this.props}>
        <CardContent>
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
              >
                TOTAL CLASSES
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {
                  this.state.student &&
                  this.state.student.map( student => {
                    if (student.classes) {
                      return (
                        <p>{student.classes.length}</p>
                      )
                    }
                  })
                }
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: indigo[600],
                  height: 56,
                  width: 56
                }}
              >
                <ClassIcon />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
