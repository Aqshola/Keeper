import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  TextField,
  IconButton,
  CardActionArea,
  Button,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

export default function CustomizedInputBase() {
  const [view, setview] = useState(false);
  const [dir, setdir] = useState("row");
  const [iconview, setsetIcon] = useState("block");
  const [closeview, setsclose] = useState("none");
  const [align, setalign] = useState("center");
  const [title, settitle] = useState("");
  const [note, setnote] = useState("");
  const useStyles = makeStyles((theme) => ({
    div: {
      marginTop: "5%",
    },
    paper: {
      margin: "auto",
      padding: theme.spacing(2),
      display: "flex",
      width: 400,
      flexDirection: dir,
      alignItems: align,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
      display: iconview,
    },

    underline: {
      "&&&:before": {
        borderBottom: "none",
      },
      "&&:after": {
        borderBottom: "none",
      },
    },
    Button: {
      width: "fit-content",
      alignSelf: "flex-end",
      display: closeview,
    },
  }));
  const classes = useStyles();

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "title") {
      settitle(value);
    } else {
      setnote(value);
    }
  };

  const click = () => {
    setview(true);
    setdir("column");
    setsetIcon("none");
    setsclose("block");
    setalign("none");
  };

  const close = () => {
    if (!title.trim() && !note.trim()) {
      setview(false);
      setdir("row");
      setalign("center");
      setsetIcon("block");
      setsclose("none");
    } else {
      fetch("http://localhost:5000/Notes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          note: note,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setview(false);
          setdir("row");
          setalign("center");
          setsetIcon("block");
          setsclose("none");
        });
    }
    settitle("");
    setnote("");
  };

  const rendered = () => {
    if (view) {
      return (
        <TextField
          className={classes.input}
          placeholder="Title"
          InputProps={{ classes }}
          name="title"
          onChange={handleChange}
        />
      );
    }
  };

  return (
    <div className={classes.div}>
      <Paper color={"blue"} className={classes.paper}>
        {rendered()}
        <TextField
          autoFocus={view}
          multiline={view}
          rows={4}
          className={classes.input}
          placeholder="Add notes..."
          inputProps={{ "aria-label": "Add notes..." }}
          InputProps={{ classes }}
          onClick={click}
          name="note"
          onChange={handleChange}
        />

        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
          onClick={click}
        >
          <AddIcon />
        </IconButton>
        <CardActionArea className={classes.Button} hide>
          <Button onClick={close}>Close</Button>
        </CardActionArea>
      </Paper>
    </div>
  );
}
