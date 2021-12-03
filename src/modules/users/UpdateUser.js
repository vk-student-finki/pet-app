import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  Hidden,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserForm } from "./UserForm";
import { UsersRepository } from "./UsersRepository";
import { UpdateUserValidator } from "./UserValidator";
import { GroupsRepository } from "../groups/GroupsRepository";

export const UpdateUser = ({}) => {
  const [globalFormError, setGlobalFormError] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState();
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    loadData(0, 1000);
  }, []);

  const loadData = (page, size) => {
    GroupsRepository.getAll(page, size)
      .then((res) => {
        setGroups(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadById(id);
  }, []);
  const loadById = (id) => {
    setLoading(true);
    UsersRepository.get(id)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
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

    setGlobalFormError(null);
    setSuccessMessage(null);
    UsersRepository.updateUser(user?.id, user)
      .then((res) => {
        console.log(res);
        setSuccessMessage("User is updated successfully");
      })
      .catch((err) => {
        console.log(err);
        setGlobalFormError(err);
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
        Update existing user
      </h1>

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
          <Grid container spacing={2} style={{ marginTop: "40px" }}>
            <UserForm
              formError={globalFormError}
              formFieldErrors={formFieldErrors}
              handleSubmit={handleSubmit}
              handleChangeUserData={handleChangeUserData}
              user={user}
            />
            <Grid xs={12} md={12} style={{ textAlign: "center" }}>
              {groups?.content?.map((group) => (
                <FormGroup
                  style={{
                    display: "inline-block",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: "#E27575" }}
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
                  <Grid item xs={4}></Grid>
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
                    Update user
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
          </Grid>
        </>
      )}
    </>
  );
};
