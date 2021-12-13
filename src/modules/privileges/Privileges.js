import {
  CircularProgress,
  Grid,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { COMMON_ACTIONS } from "../common/CommonActions";
import { PrivilegesRepository } from "./PrivilegesRepository";

export const Privileges = () => {
  const [privileges, setPrivileges] = useState();
  const [loading, setLoading] = useState();
  const [redirectTo, setRedirectTo] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    loadData(0, 10);
  }, []);

  const loadData = (page, size) => {
    setLoading(true);
    PrivilegesRepository.getAll(page, size)
      .then((res) => {
        setLoading(false);
        setPrivileges(res.data);
        dispatch({
          type: COMMON_ACTIONS.SHOW_SUCCESS_MESSAGE,
          payload: { showSuccessMessage: "Fetch privileges done successfully" },
        });
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
      <h1 style={{ fontFamily: "Helvetica, sans-serif", color: "#1F393C" }}>
        Privileges
      </h1>
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
                privileges?.content?.map((privilege, index) => (
                  <TableRow>
                    <TableCell
                      style={{
                        fontFamily: "Helvetica, sans-serif",
                        color: "#1F393C",
                        fontSize: "18px",
                        width: "980px",
                        cursor: "pointer",
                        backgroundColor:
                          index % 2 === 0 ? "#F4F6F6" : "transparent",
                      }}
                      onClick={() => {
                        setRedirectTo(`/privileges/${privilege.id}`);
                      }}
                    >
                      {privilege.name}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {!loading && privileges && privileges.page !== undefined && (
            <Pagination
              count={Math.floor(privileges?.totalElements / privileges?.size)}
              page={privileges.page}
              onChange={handleChange}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};
