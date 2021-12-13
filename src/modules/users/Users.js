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
  Container,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UsersRepository } from "./UsersRepository";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const Users = () => {
  const [users, setUsers] = useState();
  const [redirectTo, setRedirectTo] = useState();
  const [loading, setLoading] = useState();
  const { id } = useParams();

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
                        index % 2 === 0 ? "#F4F6F6" : "transparent",
                    }}
                  >
                    <Hidden smDown>
                      <TableCell
                        style={{
                          fontFamily: "Helvetica, sans-serif",
                          color: "#1F393C",
                          fontSize: "18px",
                          width: "900px",
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
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setRedirectTo(`/users/details/${user.id}`);
                        }}
                      >
                        {user.firstName} {user.lastName}
                      </TableCell>
                    </Hidden>
                    <TableCell
                      style={{
                        textAlign: "right",
                      }}
                    >
                      <EditIcon
                        fontSize="large"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setRedirectTo(`/users/edit/${user?.id}`);
                        }}
                      ></EditIcon>
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "left",
                      }}
                    >
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
          <Container maxWidth="xs">
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
          </Container>
        </Grid>
      </Grid>
    </>
  );
};
