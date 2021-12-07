import {
  Container,
  Button,
  Grid,
  ListItemText,
  ListItem,
  List,
  SwipeableDrawer,
  Hidden,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";

export default function Header({}) {
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ backgroundColor: "#F5F5F5" }}>
        {["Home", "Users", "Groups", "Privileges", "Sign In", "Sign Up"].map(
          (text, index) => (
            <Link
              to={
                index === 0
                  ? "/"
                  : index === 1
                  ? "/users"
                  : index === 2
                  ? "/groups"
                  : index === 3
                  ? "/privileges"
                  : index === 4
                  ? "/signin"
                  : index === 5
                  ? "/users/create"
                  : ""
              }
              style={{
                textDecoration: "none",
                color: "#1F393C",
                fontFamily: "Monaco, monospace",
              }}
            >
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          )
        )}
      </List>
    </Box>
  );
  return (
    <>
      <Hidden mdUp={true}>
        <Grid>
          {["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                <MenuIcon color="disabled" fontSize="large"></MenuIcon>
              </Button>
              <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              >
                {list(anchor)}
              </SwipeableDrawer>
            </React.Fragment>
          ))}
        </Grid>
      </Hidden>
      <Hidden mdDown={true}>
        <Grid
          container
          spacing={2}
          style={{ backgroundColor: "#17202A", padding: "10px" }}
        >
          <Grid item xs={6} md={1}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <HomeIcon
                sx={{ fontSize: 40 }}
                style={{ color: "#D35400" }}
              ></HomeIcon>
            </Link>
          </Grid>
          <Grid item xs={6} md={1}>
            <Link to="/users" style={{ textDecoration: "none" }}>
              <Button
                size="medium"
                variant="outlined"
                style={{
                  color: "#D9D9D9",
                  borderColor: "#17202A",
                  fontSize: "18px",
                  fontFamily: "Monaco, monospace",
                }}
              >
                USERS
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6} md={1}>
            <Link to="/groups" style={{ textDecoration: "none" }}>
              <Button
                size="medium"
                variant="outlined"
                style={{
                  color: "#D9D9D9",
                  borderColor: "#17202A",
                  fontFamily: "Monaco, monospace",
                  fontSize: "18px",
                }}
              >
                GROUPS
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6} md={2}>
            <Link to="/privileges" style={{ textDecoration: "none" }}>
              <Button
                size="medium"
                variant="outlined"
                style={{
                  color: "#D9D9D9",
                  borderColor: "#17202A",
                  marginLeft: "20px",
                  fontFamily: "Monaco, monospace",
                  fontSize: "18px",
                }}
              >
                PRIVILEGES
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6} md={2}>
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Button
                size="medium"
                variant="outlined"
                style={{
                  color: "#D9D9D9",
                  borderColor: "#17202A",
                  marginLeft: "450px",
                  fontFamily: "Monaco, monospace",
                  fontSize: "18px",
                  whiteSpace: "nowrap",
                }}
              >
                sign in
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6} md={2}>
            <Link to="/users/create" style={{ textDecoration: "none" }}>
              <Button
                size="medium"
                variant="outlined"
                style={{
                  color: "#D9D9D9",
                  borderColor: "#17202A",
                  marginLeft: "360px",
                  fontFamily: "Monaco, monospace",
                  fontSize: "18px",
                  whiteSpace: "nowrap",
                }}
              >
                sign up
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Hidden>
    </>
  );
}
