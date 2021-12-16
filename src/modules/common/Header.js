import {
  Container,
  Button,
  Grid,
  ListItemText,
  ListItem,
  List,
  SwipeableDrawer,
  Hidden,
  ListItemButton,
  Divider,
  MenuItem,
  Menu,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { AuthService } from "../auth/AuthService";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import StarIcon from "@mui/icons-material/Star";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Fade from "@mui/material/Fade";
import CircleIcon from "@mui/icons-material/Circle";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";
import Tooltip from "@mui/material/Tooltip";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Header({}) {
  const [redirectTo, setRedirectTo] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const handleLogout = () => {
    AuthService.logout();
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {window?.localStorage?.getItem("auth") && (
        <List style={{ backgroundColor: "#F5F5F5" }}>
          {["Home", "Grenades", "Producers", "Users", "Groups", "Privileges"]
            .filter(
              (key) =>
                (AuthService.hasRole("ROLE_ADMINISTRATOR") &&
                  [
                    "Grenades",
                    "Producers",
                    "Users",
                    "Groups",
                    "Privileges",
                  ].includes(key)) ||
                ["Home", "Grenades", "Producers"].includes(key)
            )
            .map((text, index) => (
              <Link
                key={index}
                to={
                  index === 0
                    ? "/"
                    : index === 1
                    ? "/grenades"
                    : index === 2
                    ? "/producers"
                    : index === 3
                    ? "/users"
                    : index === 4
                    ? "/groups"
                    : index === 5
                    ? "/privileges"
                    : ""
                }
                style={{
                  textDecoration: "none",
                  color: "#D35400",
                  fontFamily: "Monaco, monospace",
                }}
              >
                <ListItem button key={text}>
                  <ListItemIcon style={{ color: "#D35400" }}>
                    {index === 0 ? (
                      <HomeIcon />
                    ) : index === 1 ? (
                      <CircleIcon />
                    ) : index === 2 ? (
                      <CategoryIcon />
                    ) : index === 3 ? (
                      <GroupsIcon />
                    ) : index === 4 ? (
                      <StarIcon />
                    ) : index === 5 ? (
                      <PersonIcon />
                    ) : (
                      ""
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          <Divider />
          <Link
            to={`/myprofile/${AuthService.getCurrentUser()?.username}`}
            style={{ textDecoration: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <AccountCircleIcon style={{ color: "#D35400" }} />
              </ListItemIcon>
              <ListItemText
                style={{
                  textDecoration: "none",
                  color: "#D35400",
                  fontFamily: "Monaco, monospace",
                }}
                primary={
                  AuthService.getCurrentUser()?.firstName +
                  " " +
                  AuthService.getCurrentUser()?.lastName
                }
              />
            </ListItem>
          </Link>
          <Link to={`/signin`} style={{ textDecoration: "none" }}>
            <ListItem>
              <ListItemIcon>
                <LogoutIcon style={{ color: "#D35400" }} />
              </ListItemIcon>
              <ListItemText
                style={{
                  textDecoration: "none",
                  color: "#D35400",
                  fontFamily: "Monaco, monospace",
                }}
                primary={"Sign Out"}
              />
            </ListItem>
          </Link>
        </List>
      )}

      {!window?.localStorage?.getItem("auth") && (
        <List style={{ backgroundColor: "#F5F5F5" }}>
          {["Home", "Sign In"].map((text, index) => (
            <Link
              key={index}
              to={index === 0 ? "/" : index === 1 ? "/signin" : ""}
              style={{
                textDecoration: "none",
                color: "#D35400",
                fontFamily: "Monaco, monospace",
              }}
            >
              <ListItem button key={text}>
                <ListItemIcon style={{ color: "#D35400" }}>
                  {index === 0 ? (
                    <HomeIcon />
                  ) : index === 1 ? (
                    <LoginIcon />
                  ) : index === 2 ? (
                    <PersonAddAltOutlinedIcon />
                  ) : index === 4 ? (
                    <LogoutIcon />
                  ) : (
                    ""
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}

      <Hidden mdUp={true}>
        <Grid>
          {["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                <MenuIcon
                  style={{ color: "#D35400", marginLeft: "-30px" }}
                  sx={{ fontSize: 50 }}
                ></MenuIcon>
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
          style={{
            backgroundColor: "#1E1F1C",
            padding: "10px",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <Grid item xs={6} md={0.7}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <HomeIcon
                sx={{ fontSize: 40 }}
                style={{ color: "#D35400" }}
              ></HomeIcon>
            </Link>
          </Grid>
          <Grid item xs={6} md={1.3}>
            <Button
              size="small"
              variant="outlined"
              style={{
                color: "#D9D9D9",
                borderColor: "#17202A",
                fontSize: "18px",
                fontFamily: "Monaco, monospace",
              }}
              ariaControls="fade-menu"
              ariaHaspopup="true"
              ariaExpanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              CATEGORY
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <Link
                to="/grenades"
                style={{ textDecoration: "none", color: "#D35400" }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Grenades
                </MenuItem>
              </Link>
              <Link
                to="/producers"
                style={{ textDecoration: "none", color: "#D35400" }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Producers
                </MenuItem>
              </Link>
              <MenuItem onClick={handleClose}>Countries</MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={6} md={1}>
            {AuthService.hasRole("ROLE_ADMINISTRATOR") && (
              <Link to="/users" style={{ textDecoration: "none" }}>
                <Button
                  size="small"
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
            )}
          </Grid>
          <Grid item xs={6} md={1}>
            {AuthService.hasRole("ROLE_ADMINISTRATOR") && (
              <Link to="/groups" style={{ textDecoration: "none" }}>
                <Button
                  size="small"
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
            )}
          </Grid>
          <Grid item xs={6} md={1}>
            {AuthService.hasRole("ROLE_ADMINISTRATOR") && (
              <Link to="/privileges" style={{ textDecoration: "none" }}>
                <Button
                  size="small"
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
            )}
          </Grid>

          <Grid item xs={6} md={1}>
            {!window?.localStorage?.getItem("auth") && (
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button
                  size="small"
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
            )}
          </Grid>
          {window?.localStorage?.getItem("auth") && (
            <>
              <Grid xs={1} md={1}></Grid>
              <Grid
                item
                xs={6}
                md={3}
                style={{
                  color: "#D9D9D9",
                }}
              >
                <Tooltip title="Account settings">
                  <Link
                    to={`/myprofile/${AuthService.getCurrentUser()?.username}`}
                    style={{ textDecoration: "none", color: "#D9D9D9" }}
                  >
                    <AccountCircleOutlinedIcon
                      style={{
                        color: "#D35400",
                        verticalAlign: "middle",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ lineHeight: "2.5" }}>
                      {AuthService.getCurrentUser()?.firstName}{" "}
                      {AuthService.getCurrentUser()?.lastName}
                    </span>
                  </Link>
                </Tooltip>
              </Grid>
              <Grid
                item
                xs={6}
                md={1}
                style={{
                  color: "#D9D9D9 ",
                  whiteSpace: "break-spaces",
                }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  fullWidth
                  onClick={() => handleLogout()}
                  style={{
                    color: "#D9D9D9",
                    borderColor: "#17202A",
                    textAlign: "left",
                    fontFamily: "Monaco, monospace",
                    fontSize: "18px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Sign out
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Hidden>
    </>
  );
}
