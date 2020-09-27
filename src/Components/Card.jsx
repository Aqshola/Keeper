import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Icon,
  makeStyles,
} from "@material-ui/core";
import Modal from "./Modal";
import DeleteIcon from "@material-ui/icons/Delete";

const customStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1),
    borderRadius: "15px",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default function CardCom({ id, title, content }) {
  const classes = customStyle();
  const [open, setopen] = useState(false);
  const [shadow, setshadow] = useState(false);

  const handleDelete = () => {
    fetch("http://localhost:5000/Notes", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
    setopen(false);
  };

  const mouseOver = () => setshadow(true);
  const mouseOut = () => setshadow(false);
  const handleView = () => {
    setopen(true);
  };
  const handleCLose = () => {
    setopen(false);
    setshadow(false);
  };

  return (
    <Card
      className={classes.card}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
      raised={shadow}
    >
      <CardContent onClick={handleView}>
        <Typography variant="h5">{title}</Typography>
        <Typography>{content}</Typography>
      </CardContent>

      <IconButton onClick={handleDelete} onMouseOver={() => setopen(false)}>
        <DeleteIcon />
      </IconButton>

      <Modal
        open={open}
        close={handleCLose}
        defcontent={content}
        deftitle={title}
        update={true}
        id={id}
      />
    </Card>
  );
}
