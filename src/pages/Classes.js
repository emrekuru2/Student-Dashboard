import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import { firestore } from '../firebase';
import React, { Component } from 'react';
import ClassToolbar from '../components/classes/ClassToolbar';
import ClassCard from '../components/classes/ClassCard';


export default class Classes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: {}
    }
  }


  componentDidMount() {
    firestore.collection('classes')
      .get()
      .then(snapshot => {
        let obj = {}
        snapshot.forEach(doc => {
          obj[doc.id] = doc.data()
        })
        this.setState({ classes: obj })
      }).catch(error => console.log(error))
  }



  render() {
    const classes = this.state.classes
    return (
      <>
        <Helmet>
          <title>Classes</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <Container maxWidth={false}>
            <ClassToolbar />
            <Box sx={{ pt: 3 }}>
              <Grid
                container
                spacing={3}
              >
                {Object.entries(classes).map(([name, value], index) => (
                  <Grid
                    item
                    key={index}
                    lg={4}
                    md={6}
                    xs={12}
                  >
                    <ClassCard classes={value} name={name} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      </>
    );
  }
}


