import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import React, { Component } from 'react';
import { auth, firestore } from '../../firebase';

export default class Assignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments : []
    }

  }

  componentDidMount() {
    firestore.collection('students')
      .get()
      .then(snapshot => {
        const assignment = []
        const user = auth.currentUser.uid
        snapshot.forEach(doc => {
          const uid = doc.id;
          if (user === uid) {
            firestore.collection('classes')
              .get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  const students = doc.data().students
                  const assignments = doc.data().assignments
                  students.map(item => {
                    if (user === item) {
                      assignments.map(assign => {
                        assignment.push(assign)
                        this.setState({ assignments: assignment })
                      })
                    }
                  })
                })
              })
              .catch(error => console.log(error))
          }
        })
      })
      .catch(error => console.log(error))

    console.log("assignments")
  }

  render() {
    return (
      <Card {...this.props} >
        <CardHeader title="Assignments" />
        <Divider />
        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Weight
                  </TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Given Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Due Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  this.state.assignments.map((item, index) => {
                    return (
                      <TableRow
                        hover
                        key={index}
                      >
                        <TableCell>
                          {item.name}
                        </TableCell>
                        <TableCell>
                          {item.weight}
                        </TableCell>
                        <TableCell>
                          {new Date(item.date.seconds * 1000).toLocaleDateString("en-US")}
                        </TableCell>
                        <TableCell>
                          <Chip
                            color="primary"
                            label={new Date(item.due.seconds * 1000).toLocaleDateString("en-US")}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
    );
  }
}





