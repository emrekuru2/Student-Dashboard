import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import UserProvider from './providers/UserProvider';
import { useSelector } from 'react-redux';
import SuccessSnackbar from './components/SnackBar/Snackbar';

function App() {
  const isLogged  = useSelector(state => state.isLogged);
  const routing = useRoutes(routes(isLogged));

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <SuccessSnackbar/>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
