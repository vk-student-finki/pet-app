import {
  Alert,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
  Table,
  TableBody,
  Hidden,
  Dialog,
  DialogTitle,
  DialogActions,
  TableCell,
  TableRow,
  Link,
  Button,
  Container,
  DialogContent,
  Slide,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UsersRepository } from "./UsersRepository";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthService } from "../auth/AuthService";
import { useDispatch } from "react-redux";
import { COMMON_ACTIONS } from "../common/CommonActions";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const Users = () => {
  const [users, setUsers] = useState();
  const [redirectTo, setRedirectTo] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [loading, setLoading] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
                        // onClick={() => {
                        //   setRedirectTo(`/users/delete/${user?.id}`);
                        // }}
                        onClick={() => handleClickOpen(user)}
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <HighlightOffIcon
          style={{
            color: "#F15E5E",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "70px",
            marginTop: "10px",
          }}
        />
        <DialogTitle
          style={{
            fontWeight: "bold",
            fontFamily: "Monaco, monospace",
          }}
        >
          {"Confirm delete"}
        </DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          Are you sure you want to delete this user? This action
          <br /> cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            size="large"
            style={{
              backgroundColor: "#C1C1C1",
              color: "white",
              border: "#C1C1C1",
            }}
          >
            Cancel
          </Button>
          <Button
            size="large"
            style={{
              backgroundColor: "#F15E5E",
              color: "white",
            }}
            onClick={() => {
              setRedirectTo(`/users/delete/${selectedUser?.id}`);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
