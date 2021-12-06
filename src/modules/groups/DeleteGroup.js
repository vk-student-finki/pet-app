import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { GroupsRepository } from "./GroupsRepository";

export const DeleteGroup = ({}) => {
  const { id } = useParams();
  const [deleteError, setDeleteError] = useState(false);
  const [group, setGroup] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    GroupsRepository.get(id)
      .then((res) => {
        setGroup(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    deleteThisGroup(id);
  }, []);

  const deleteThisGroup = (id) => {
    setDeleteError(false);
    GroupsRepository.deleteGroup(id)
      .then((res) => {
        console.log(res.data);
        setDeleteError(false);
      })
      .catch((err) => {
        setDeleteError(true);
        console.log(err.data);
      });
  };

  const [redirectTo, setRedirectTo] = useState();
  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push></Navigate>}
      {!deleteError && (
        <>
          <h1>The group was successfully deleted!</h1>
          <Grid xs={4}>
            <Button
              variant="outlined"
              size="large"
              style={{
                backgroundColor: "#17202A",
                color: "#D9D9D9",
                borderColor: "#17202A",
              }}
              size="medium"
              fullWidth
              onClick={() => {
                setRedirectTo(`/groups`);
              }}
            >
              Back to Users
            </Button>
          </Grid>
        </>
      )}
      {deleteError && (
        <>
          <h1>The group can not be deleted!</h1>
          <Grid xs={4}>
            <Button
              variant="outlined"
              size="large"
              style={{
                backgroundColor: "#17202A",
                color: "#D9D9D9",
                borderColor: "#17202A",
              }}
              size="medium"
              fullWidth
              onClick={() => {
                setRedirectTo(`/groups`);
              }}
            >
              Back to Groups
            </Button>
          </Grid>
        </>
      )}
    </>
  );
};
