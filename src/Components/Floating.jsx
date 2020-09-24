import React, { useState } from "react";
import { Fab, makeStyles } from "@material-ui/core";
import Modal from "./Modal";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "sticky",
    bottom: "50px",
    float: "right",
  },
}));

export default function Floating() {
  const [open, setopen] = useState(false);

  const handleOpen = () => {
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
  };

  const classes = useStyles();
  return (
    <div className={classes.fab}>
      <Fab color="primary" onClick={handleOpen}>
        Add
      </Fab>
      <Modal open={open} close={handleClose} />
    </div>
  );
}
