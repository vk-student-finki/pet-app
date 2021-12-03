import {
  CircularProgress,
  Grid,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UsersRepository } from "./UsersRepository";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

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
    loadData(value, 10);
  };

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}
      <h1>Users</h1>
      <Grid container spacing={2}>
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
                  <TableRow>
                    <TableCell
                      style={{
                        fontFamily: "Helvetica, sans-serif",
                        color: "#1F393C",
                        fontSize: "18px",
                        width: "980px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setRedirectTo(`/users/details/${user.id}`);
                      }}
                    >
                      {user.firstName} {user.lastName}
                    </TableCell>
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
                        }}
                        onClick={() => {
                          UsersRepository.deleteUser(user?.id);
                          setRedirectTo(`/users/delete/${user?.id}`);
                        }}
                      ></DeleteIcon>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {!loading && users && users?.pageable?.pageNumber !== undefined && (
            <Pagination
              count={Math.floor(users?.totalElements / users?.size + 1)}
              page={users?.pageable?.pageNumber}
              onChange={handleChange}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};
