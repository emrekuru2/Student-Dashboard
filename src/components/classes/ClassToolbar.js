import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
} from '@material-ui/core';
import React, { Component } from 'react';
import Popup from './Popup';

class ClassToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  componentDidMount() {

  }



  render() {
    return (
      <Box {...this.props}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Popup name={"Leave"}/>
          <Popup name={"Join"}/>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  placeholder="Search classes"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  }
}



export default ClassToolbar;

