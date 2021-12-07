import {
  Alert,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
  Table,
  TableBody,
  Hidden,
  TableCell,
  TableRow,
  Link,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UsersRepository } from "./UsersRepository";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const Users = () => {
  const [users, setUsers] = useState();
  const [redirectTo, setRedirectTo] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    loadData(0, 10);
  }, []);

  const loadData = (page, size) => {
    setLoading(true);
    UsersRepository.getAll(page, size)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleChange = (e, value) => {
    loadData(value - 1, 10);
  };

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <h1 style={{ fontFamily: "Helvetica, sans-serif", color: "#1F393C" }}>
            Users
          </h1>
        </Grid>
        <Grid md={4}></Grid>
        <Grid
          item
          xs={12}
          md={2}
          style={{ textAlign: "right", marginTop: "25px" }}
        >
          <Button
            size="medium"
            variant="outlined"
            fullWidth
            style={{
              color: "#D9D9D9",
              borderColor: "#D9D9D9",
              backgroundColor: "#17202A",
              marginBottom: "10px",
            }}
            onClick={() => {
              setRedirectTo(`/users/create`);
            }}
          >
            CREATE NEW USER
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Table>
            <TableBody>
              {loading && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "50px",
                    marginTop: "150px",
                  }}
                >
                  <CircularProgress style={{ color: "black" }} />
                </div>
              )}
              {!loading &&
                users?.content?.map((user, index) => (
                  <TableRow
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        index % 2 === 0 ? "#ecf0f1" : "transparent",
                    }}
                  >
                    <Hidden smDown>
                      <TableCell
                        style={{
                          fontFamily: "Helvetica, sans-serif",
                          color: "#1F393C",
                          fontSize: "18px",
                          width: "980px",
                        }}
                        onClick={() => {
                          setRedirectTo(`/users/details/${user.id}`);
                        }}
                      >
                        {user.firstName} {user.lastName}
                      </TableCell>
                    </Hidden>
                    <Hidden smUp>
                      <TableCell
                        style={{
                          fontFamily: "Helvetica, sans-serif",
                          color: "#1F393C",
                          fontSize: "18px",
                          width: "200px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setRedirectTo(`/users/details/${user.id}`);
                        }}
                      >
                        {user.firstName} {user.lastName}
                      </TableCell>
                    </Hidden>
                    <TableCell>
                      <EditIcon
                        fontSize="large"
                        style={{ width: "1.7em" }}
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setRedirectTo(`/users/edit/${user?.id}`);
                        }}
                      ></EditIcon>

                      <DeleteIcon
                        fontSize="large"
                        style={{
                          cursor: "pointer",
                          color: "#989292",
                        }}
                        onClick={() => {
                          setRedirectTo(`/users/delete/${user?.id}`);
                        }}
                      ></DeleteIcon>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Grid container spacing={2}>
            <Grid item md={4}></Grid>
            <Grid item md={8}>
              {!loading && users && users.number !== undefined && (
                <Stack spacing={2} style={{ marginTop: "20px" }}>
                  <Pagination
                    count={Math.floor(users.totalElements / users.size) + 1}
                    shape="rounded"
                    showFirstButton
                    showLastButton
                    style={{ color: "#D35400" }}
                    page={users.number + 1}
                    onChange={handleChange}
                  />
                </Stack>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
