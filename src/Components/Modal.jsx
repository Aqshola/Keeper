import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  makeStyles,
} from "@material-ui/core";

const customStyle = makeStyles((theme) => ({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
}));

export default function Modal({
  open,
  close,
  deftitle,
  defcontent,
  id,
  update,
}) {
  const [title, settitle] = useState(deftitle);
  const [note, setnote] = useState(defcontent);
  const classes = customStyle();

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "title") {
      settitle(value);
    } else {
      setnote(value);
    }
  };

  const handleSubmit = () => {
    if (update) {
      fetch("http://localhost:5000/Notes", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: title,
          note: note,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          close();
        });
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
          close();
        });
    }
  };

  return (
    <Dialog open={open} fullWidth={true}>
      <DialogTitle>Input Memories</DialogTitle>
      <DialogContent dividers>
        <TextField
          placeholder="Title memories"
          name="title"
          InputProps={{ classes }}
          onChange={handleChange}
          variant="standard"
          defaultValue={deftitle}
        />
        <TextField
          multiline
          placeholder="memories"
          fullWidth={true}
          rows={10}
          name="note"
          InputProps={{ classes }}
          onChange={handleChange}
          defaultValue={defcontent}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={close}>
          cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
