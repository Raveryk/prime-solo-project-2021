import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import Header from '../Header/Header'
import { useHistory } from 'react-router-dom';

import {Typography, makeStyles} from '@material-ui/core'

import Button from '@material-ui/core/Button'
const useStyles = makeStyles((theme) => ({
    body: {
      backgroundColor: theme.palette.secondary.sand,
      padding: '5%',
      paddingBottom: '100%',
      border: '5px',
    }

}))

function LoginPage() {
  const history = useHistory();

  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Header />
      <LoginForm />

      <center>
      <Typography>Want to join?</Typography>
        <Button
          variant="outlined"
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
