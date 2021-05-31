import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
import { auth, firestore } from '../../firebase';
import React, { Component } from 'react';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myClasses : [],
      myGrades : [],
      classGrades : []
    }

  }

  componentDidMount() {
    firestore.collection('students')
      .get()
      .then( snapshot => {
        const user = auth.currentUser.uid
        const classes = []
        const grades = []
        const classGrade = []
        snapshot.forEach(doc => {
          const data = doc.data()
          const uid = doc.id;
          if (user === uid) {
            data.classes.map(item => {
              classes.push(item.name)
              grades.push(item.grade)
            })
            firestore.collection('classes')
              .get()
              .then( snapshot => {
                snapshot.forEach( doc => {
                  const students = doc.data().students
                  const grade = doc.data().classAverage
                  students.map(item => {
                    if(user === item) {
                      classGrade.push(grade)
                    }
                  })
                })
                this.setState({classGrades : classGrade})
              })
              .catch(error => console.log(error))
          }
        })
        this.setState({myClasses : classes, myGrades : grades})
      })
      .catch( error => console.log(error))

    console.log("overview")
  }


  render() {
    const { theme } = this.props;

    const data = {
      datasets: [
        {
          backgroundColor: colors.indigo[500],
          data: this.state.myGrades,
          label: 'My Average'
        },
        {
          backgroundColor: colors.orange[200],
          data: this.state.classGrades,
          label: 'Class Average'
        }
      ],
      labels: this.state.myClasses
    };

    const options = {
      animation: false,
      cornerRadius: 20,
      layout: { padding: 0 },
      legend: { display: false },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        xAxes: [
          {
            barThickness: 15,
            maxBarThickness: 12,
            barPercentage: 0.5,
            categoryPercentage: 0.5,
            ticks: {
              fontColor: theme.palette.text.secondary
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              fontColor: theme.palette.text.secondary,
              beginAtZero: true,
              min: 0,
              max: 100
            },
            gridLines: {
              borderDash: [2],
              borderDashOffset: [2],
              color: theme.palette.divider,
              drawBorder: true,
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
              zeroLineColor: theme.palette.divider
            }
          }
        ]
      },
      tooltips: {
        backgroundColor: theme.palette.background.paper,
        bodyFontColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        enabled: true,
        footerFontColor: theme.palette.text.secondary,
        intersect: false,
        mode: 'index',
        titleFontColor: theme.palette.text.primary
      }
    };

    return (
      <Card {...this.props}>
        <CardHeader
          title="Overview"
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 400,
              position: 'relative'
            }}
          >
            <Bar
              data={data}
              options={options}
            />
          </Box>
        </CardContent>
        <Divider />
      </Card>
    );
  }
}

export default function(props) {
  const theme = useTheme();

  return <Overview {...props} theme = {theme} />


};


