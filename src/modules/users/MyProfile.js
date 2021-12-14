import React, { useEffect, useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { AuthService } from "../auth/AuthService";
import {
  DialogContentText,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  DialogActions,
} from "@mui/material";
import { UsersRepository } from "./UsersRepository";
import { UpdateUserValidator } from "./UserValidator";

export const MyProfile = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [globalFormError, setGlobalFormError] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadById(AuthService.getCurrentUser()?.id);
  }, []);

  const loadById = (id) => {
    setLoading(true);
    UsersRepository.get(id)
      .then((res) => {
        setUser(res.data);

        setLoading(false);

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleSubmit = () => {
    let valid = UpdateUserValidator.isValidSync(user);
    setFormFieldErrors();
    if (!valid) {
      let validationErrors = {};
      UpdateUserValidator.validate(user, { abortEarly: false }).catch((err) => {
        console.log(err.inner);
        err.inner.forEach((validationError) => {
          validationErrors[validationError.path] = {};
          validationErrors[validationError.path] = validationError.message;
        });
        console.log(validationErrors);
        setFormFieldErrors(validationErrors);
        return;
      });
      return;
    }
    setLoading(true);
    setGlobalFormError(null);
    setSuccessMessage(null);
    UsersRepository.updateUser(user?.id, user)
      .then((res) => {
        console.log(res);
        console.log("success");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setGlobalFormError(err);
      });
  };
  const handleChangeUserData = (name, value) => {
    let data = { ...user };
    data[name] = value;
    setUser(data);
    console.log(data);
  };
  return (
    <>
      <Container maxWidth="xs">
        <Grid item xs={12} style={{ textAlign: "center", marginTop: "10px" }}>
          <PersonOutlineIcon sx={{ fontSize: 100, color: "#17202A" }} />{" "}
          <h2
            style={{
              fontFamily: "Helvetica, sans-serif",
              color: "#1F393C",
              marginTop: "5px",
            }}
          >
            {AuthService.getCurrentUser()?.firstName}{" "}
            {AuthService.getCurrentUser()?.lastName}
          </h2>
        </Grid>
      </Container>
      <Divider></Divider>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <h3 style={{ fontFamily: "Helvetica, sans-serif", color: "#1F393C" }}>
            Account Info
          </h3>
          <Divider></Divider>
          <Grid
            style={{
              marginTop: "5px",
              fontSize: "18px",
              fontFamily: "Verdana, sans-serif",
              color: "#566573",
            }}
          >
            <Grid item xs={12} md={12}>
              <TextField
                margin="dense"
                id="name"
                color="warning"
                fullWidth
                label="First Name"
                variant="standard"
                value={user?.firstName ? user?.firstName : ""}
                onChange={(e) =>
                  handleChangeUserData("firstName", e.target.value)
                }
                error={formFieldErrors?.firstName}
                helperText={formFieldErrors?.firstName}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                margin="dense"
                id="name"
                color="warning"
                label="Last Name"
                variant="standard"
                value={user?.lastName ? user?.lastName : ""}
                onChange={(e) =>
                  handleChangeUserData("lastName", e.target.value)
                }
                error={formFieldErrors?.lastName}
                helperText={formFieldErrors?.lastName}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                margin="dense"
                id="name"
                fullWidth
                color="warning"
                label="Username"
                disabled
                variant="standard"
                value={user?.username ? user?.username : ""}
                onChange={(e) =>
                  handleChangeUserData("username", e.target.value)
                }
                error={formFieldErrors?.username}
                helperText={formFieldErrors?.username}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                margin="dense"
                id="name"
                label="Email"
                disabled
                color="warning"
                fullWidth
                variant="standard"
                value={user?.email ? user?.email : ""}
                onChange={(e) => handleChangeUserData("email", e.target.value)}
                error={formFieldErrors?.email}
                helperText={formFieldErrors?.email}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                margin="dense"
                id="name"
                label="Phone Number"
                color="warning"
                variant="standard"
                fullWidth
                value={user?.phoneNumber ? user?.phoneNumber : ""}
                onChange={(e) =>
                  handleChangeUserData("phoneNumber", e.target.value)
                }
                error={formFieldErrors?.phoneNumber}
                helperText={formFieldErrors?.phoneNumber}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                style={{ marginTop: "10px", backgroundColor: "#2DA44E" }}
                variant="contained"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <h3 style={{ fontFamily: "Helvetica, sans-serif", color: "#1F393C" }}>
            Change password
          </h3>
          <Divider></Divider>
          <Button onClick={handleClickOpen} variant="filled" size="small">
            Change Password
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To change your password please insert new password and then
                submit.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="New Password"
                type="password"
                fullWidth
                color="warning"
                variant="standard"
                onChange={(e) =>
                  handleChangeUserData("newPassword", e.target.value)
                }
                error={formFieldErrors?.newPassword}
                helperText={formFieldErrors?.newPassword}
              />
              <TextField
                margin="dense"
                id="name"
                label="Confirm Password"
                type="password"
                color="warning"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  handleChangeUserData("newPassword", e.target.value)
                }
                error={formFieldErrors?.newPassword}
                helperText={formFieldErrors?.newPassword}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={() => {
                  handleClose();
                  handleSubmit();
                }}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
};
