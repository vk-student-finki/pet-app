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
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UsersRepository } from "./UsersRepository";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthService } from "../auth/AuthService";
import { useDispatch } from "react-redux";
import { COMMON_ACTIONS } from "../common/CommonActions";

export const Users = () => {
  const [users, setUsers] = useState();
  const [redirectTo, setRedirectTo] = useState();
  const [loading, setLoading] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    loadData(0, 10);
  }, []);

  const loadData = (page, size) => {
    setLoading(true);
    UsersRepository.getAll(page, size)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
        dispatch({
          type: COMMON_ACTIONS.SHOW_SUCCESS_MESSAGE,
          payload: { showSuccessMessage: "Fetch users done successfully" },
        });
      })
      .catch((err) => {
        console.log(err.response.data.status, err.response.data.message);
        if (err?.response?.data?.status === 403) {
          navigate("/forbidden");
        } else {
          console.log(err);
        }
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
        <Grid item xs={12} md={9}>
          <h1 style={{ fontFamily: "Helvetica, sans-serif", color: "#1F393C" }}>
            Users
          </h1>
        </Grid>
        {window?.localStorage?.getItem("auth") &&
          AuthService.hasRole("ROLE_ADMINISTRATOR") && (
            <Grid item xs={12} md={3}>
              <Button
                size="medium"
                variant="outlined"
                fullWidth
                style={{
                  color: "#D9D9D9",
                  borderColor: "#D9D9D9",
                  backgroundColor: "#17202A",
                  marginTop: "20px",
                }}
                onClick={() => {
                  setRedirectTo(`/users/create`);
                }}
              >
                CREATE NEW USER
              </Button>
            </Grid>
          )}

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
