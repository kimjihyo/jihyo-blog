import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
  Box,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import SignInEntry from '../../interfaces/SignInEntry';
import { signIn, signInWithGoogleAccount } from '../../firebase/auth';
import useStyles from './style';

const LoginEntrySchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required()
    .email(),
  password: yup
    .string()
    .trim()
    .required(),
});

type LoginAlertDialogProps = {
  open: boolean;
  onClose: () => void;
};

const LoginAlertDialog = ({ open, onClose }: LoginAlertDialogProps) => {
  const classes = useStyles();
  const [signInMessage, setSignInMessage] = React.useState<string>();
  const [isInProgress, setIsInProgress] = React.useState<boolean>(false);

  const onSignInButtonClicked = (signInInfo: SignInEntry) => {
    signIn(
      signInInfo,
      () => {
        setIsInProgress(false);
        onClose();
      },
      (errorMessage) => {
        setIsInProgress(false);
        setSignInMessage(errorMessage);
      },
    );
    setIsInProgress(true);
  };

  const onSignInWithGoogleAccountButtonClicked = () => {
    signInWithGoogleAccount();
    onClose();
  };

  const { register, handleSubmit, errors } = useForm<SignInEntry>({
    validationSchema: LoginEntrySchema,
  });

  return (
    <Dialog className={classes.dialog} open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
      <form noValidate onSubmit={handleSubmit(onSignInButtonClicked)}>
        <DialogContent>
          <DialogContentText color="textPrimary">
            You can leave comments on stories if you signed in. To sign in to
            the website, please enter your email address and password. You can
            also sign in with your Google account.
          </DialogContentText>
          {signInMessage && <Alert severity="error">{signInMessage}</Alert>}
          <Button
            className={classes.googleSignInButton}
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={onSignInWithGoogleAccountButtonClicked}
          >
            Sign In with Google Account
          </Button>
          <TextField
            color="secondary"
            inputRef={register}
            margin="dense"
            id="email"
            label="Email Address"
            name="email"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            autoComplete="off"
            fullWidth
          />
          <TextField
            color="secondary"
            inputRef={register}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            name="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          {isInProgress ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress color="secondary" />
            </Box>
          ) : (
            <div>
              <Button type="submit" color="secondary">
                Sign in
              </Button>
              <Button onClick={onClose} color="secondary">
                Cancel
              </Button>
            </div>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LoginAlertDialog;
