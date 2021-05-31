import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import React, { Component } from 'react';
import { auth, firestore } from '../../firebase';

export default class Average extends Component {
  constructor(props) {
    super(props);
    this.state = {
      average: 0
    }

  }

  componentDidMount() {
    firestore.collection('students')
      .get()
      .then( snapshot => {
        const user = auth.currentUser.uid
        let total = 0;
        let average = 0;
        snapshot.forEach(doc => {
          const data = doc.data()
          const uid = doc.id;
          if (user === uid) {
            data.classes.map(item => {
              total += item.grade
            })
            average = (total / data.classes.length).toFixed( )
          }

        })
        this.setState({average: average})
      })
      .catch( error => console.log(error))

    console.log("average")
  }


  render() {
    return (
      <Card
        sx={{ height: '100%' }}
        {...this.props}
      >
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
                AVERAGE
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                <p>{this.state.average}</p>
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: orange[600],
                  height: 56,
                  width: 56
                }}
              >
                <TrendingUpIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box sx={{ pt: 3 }}>
            <LinearProgress
              value={this.state.average}
              variant="determinate"
            />
          </Box>
        </CardContent>
      </Card>
    );
  }
}
