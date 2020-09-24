import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import Modal from "./Modal";

export default function CardCom({ id, title, content }) {
  const [open, setopen] = useState(false);
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
  };

  const handleView = () => {
    setopen(true);
  };
  const handleCLose = () => {
    setopen(false);
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography>{content}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="contained" color="primary" onClick={handleView}>
          View
        </Button>
      </CardActions>
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
