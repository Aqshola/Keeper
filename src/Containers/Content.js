import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import Floating from "../Components/Floating";
import NoteList from "./NoteList";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    minHeight: 200,
  },
}));

export default function Content(params) {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.root}>
      <NoteList />
      <Floating />
    </Container>
  );
}
