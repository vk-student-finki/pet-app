import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  Hidden,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { UsersRepository } from "./UsersRepository";
import { UserForm } from "./UserForm";
import { CreateUserValidator } from "./UserValidator";
import { GroupsRepository } from "../groups/GroupsRepository";

export const CreateUser = (props) => {
  const [globalFormError, setGlobalFormError] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [groups, setGroups] = useState();
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    loadData(0, 1000);
  }, []);

  const loadData = (page, size) => {
    GroupsRepository.getAll(page, size)
      .then((res) => setGroups(res.data))
      .catch((err) => console.log(err));
  };
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    groups: [],
    privileges: [],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    let valid = CreateUserValidator.isValidSync(user);
    setFormFieldErrors();
    if (!valid) {
      let validationErrors = {};
      CreateUserValidator.validate(user, { abortEarly: false }).catch((err) => {
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
    UsersRepository.create(user)
      .then((res) => {
        console.log(res);
        setSuccessMessage("User is created successfully");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setGlobalFormError(err);
        setLoading(false);
      });
  };

  const handleChangeUserData = (name, value) => {
    let data = { ...user };
    data[name] = value;
    setUser(data);
    console.log(data);
  };

  const handleChangeGroups = (group, event) => {
    let currentCheckedList = [...checked];
    if (currentCheckedList.includes(group)) {
      //remove
      const index = currentCheckedList.indexOf(group);
      if (index > -1) {
        currentCheckedList.splice(index, 1);
      }
    } else {
      //add
      currentCheckedList.push(group);
    }
    console.log(currentCheckedList);
    setChecked(currentCheckedList);
    handleChangeUserData("groups", currentCheckedList);
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Create new user
      </h1>
      <Grid container spacing={2} style={{ marginTop: "40px" }}>
        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "50px",
              marginTop: "150px",
            }}
          >
            <CircularProgress />
          </div>
        )}
        {!loading && (
          <>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <UserForm
                  formError={globalFormError}
                  formFieldErrors={formFieldErrors}
                  handleSubmit={handleSubmit}
                  handleChangeUserData={handleChangeUserData}
                  user={user}
                />
              </Grid>
            </Grid>
            <Hidden smDown>
              <Grid item md={3.1}></Grid>
            </Hidden>
            <Grid xs={12} md={6.1} style={{ textAlign: "center" }}>
              {groups?.content?.map((group) => (
                <FormGroup
                  style={{
                    display: "inline-block",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: "#D35400" }}
                        checked={checked.includes(group) ? true : false}
                        onChange={(e) => handleChangeGroups(group, e)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label={group.name}
                  />
                </FormGroup>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Hidden smDown={true}>
                  <Grid item md={4}></Grid>
                </Hidden>
                <Grid item xs={12} md={4}>
                  <Button
                    onClick={() => {
                      handleSubmit();
                    }}
                    fullWidth
                    size="large"
                    variant="outlined"
                    style={{
                      backgroundColor: "#17202A",
                      color: "#D9D9D9",
                      borderColor: "#17202A",
                    }}
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {successMessage && (
              <>
                <Grid item xs={12} md={2.9}></Grid>
                <Grid item xs={12} md={6.2}>
                  <Alert severity="success">{successMessage}</Alert>
                </Grid>
              </>
            )}
          </>
        )}
      </Grid>
    </>
  );
};
