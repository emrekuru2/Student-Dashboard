import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';

import Overview from 'src/components/dashboard/Overview';
import Average from 'src/components/dashboard/Average';
import TotalClasses from 'src/components/dashboard/TotalClasses';
import Assignments from '../components/dashboard/Assignments';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Dashboard | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          justifyContent={"space-evenly"}
          spacing={3}
        >
          <Grid
            item
            lg={5}
            sm={6}
            xl={3}
            xs={12}
          >
            <Average />
          </Grid>
          <Grid
            item
            lg={5}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalClasses sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <Overview />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <Assignments />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
