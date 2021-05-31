import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { clearSnackbar } from '../../actions';
import { SnackbarContent, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

export default function SuccessSnackbar() {
  const dispatch = useDispatch();

  const { snackbarMessage, snackbarOpen } = useSelector(
    state => state.ui
  );


  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={snackbarOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      aria-describedby="client-snackbar"
    >
      <SnackbarContent
        style={{backgroundColor: '#3f51b5'}}
        message={
          <Typography>
            {snackbarMessage}
          </Typography>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CancelIcon/>
          </IconButton>
        ]}
      />
    </Snackbar>
  );
}
