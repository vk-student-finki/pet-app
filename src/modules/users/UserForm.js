import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { UsersRepository } from "./UsersRepository";
import { Box } from "@mui/system";

export const UserForm = ({
  formError,
  formFieldErrors,
  user,
  handleChangeUserData,
  updateMode,
}) => {
  return (
    <>
      <Grid container spacing={2} style={{ marginLeft: "10px" }}>
        <Grid xs={0} md={3}></Grid>
        <Grid xs={12} md={6}>
          <Grid container spacing={2}>
            {formError && (
              <Grid item xs={12}>
                <Alert severity="error">
                  {formError?.response?.data?.error}
                </Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                label="First name"
                size="small"
                variant="outlined"
                fullWidth
                value={user?.firstName ? user?.firstName : ""}
                onChange={(e) =>
                  handleChangeUserData("firstName", e.target.value)
                }
                error={formFieldErrors?.firstName}
                helperText={formFieldErrors?.firstName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Last name"
                size="small"
                variant="outlined"
                fullWidth
                value={user?.lastName ? user?.lastName : ""}
                onChange={(e) =>
                  handleChangeUserData("lastName", e.target.value)
                }
                error={formFieldErrors?.lastName}
                helperText={formFieldErrors?.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                size="small"
                variant="outlined"
                fullWidth
                value={user?.username ? user?.username : ""}
                onChange={(e) =>
                  handleChangeUserData("username", e.target.value)
                }
                error={formFieldErrors?.username}
                helperText={formFieldErrors?.username}
              />
            </Grid>
            {!updateMode && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    size="small"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={user?.password ? user?.password : ""}
                    onChange={(e) =>
                      handleChangeUserData("password", e.target.value)
                    }
                    error={formFieldErrors?.password}
                    helperText={formFieldErrors?.password}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
