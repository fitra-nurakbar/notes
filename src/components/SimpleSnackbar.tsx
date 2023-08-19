import { TypeSnackbar } from "@/utils/types/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SimpleSnackbar(props: TypeSnackbar) {
  const { message, severity } = props;
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
