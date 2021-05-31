import { Helmet } from 'react-helmet';
import {
  Box,
  Container, Link,
  Typography
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => (
  <>
    <Helmet>
      <title>404</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography
          align="center"
          color="textPrimary"
          variant="h1"
        >
          404: The page you are looking for isn’t here. Go back to
          {' '}
          <Link
            component={RouterLink}
            to="/login"
            variant="h1"
          >
            Sign in
          </Link>
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <img
            alt="Under development"
            src="/static/images/404-error.svg"
            style={{
              marginTop: 20,
              display: 'inline-block',
              maxWidth: '100%',
              width: 560
            }}
          />
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
