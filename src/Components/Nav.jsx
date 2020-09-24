import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export default function Nav(params) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Keeper</Typography>
      </Toolbar>
    </AppBar>
  );
}
