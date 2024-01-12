import React from "react";
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#000",
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          This project is for testing purposing, powered by Ma3d.js
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
          style={{ color: "#fff" }}
        >
          please feedback us with your experience contact me via email:
          ma3d.salman@gmail.com
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
