import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Typography, Box } from "@material-ui/core";
import CardCom from "../Components/Card";

const style = {
  marginTop: "20px",
};
const useStyles = makeStyles((theme) => ({
  grid: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
  notfound: {
    textAlign: "center",
    opacity: "30%",
    width: "100%",
  },
}));

export default function NoteList(params) {
  const classes = useStyles();
  const [notes, setnotes] = useState([]);
  const [fetchdata, setfetchdata] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/Notes")
      .then((res) => res.json())
      .then((res) => {
        setnotes(res);
        setfetchdata(false);
      });
  }, [notes]);

  const conditionalRender = () => {
    if (notes.length === 0) {
      return (
        <Box className={classes.notfound}>
          <Typography variant="h3">Empty</Typography>
        </Box>
      );
    } else {
      return notes.map((note, i) => {
        return (
          <Grid key={notes[i]._id} item xs={6} sm={3}>
            <CardCom
              id={notes[i]._id}
              title={notes[i].title}
              content={notes[i].note}
            />
          </Grid>
        );
      });
    }
  };

  return (
    <Grid style={style} container spacing={3} className={classes.grid}>
      {conditionalRender()}
    </Grid>
  );
}
