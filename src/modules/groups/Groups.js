import {
  Button,
  CircularProgress,
  Grid,
  Link,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { GroupsRepository } from "./GroupsRepository";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const Groups = () => {
  const [groups, setGroups] = useState();
  const [loading, setLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState();

  useEffect(() => {
    loadData(0, 10);
  }, []);

  const loadData = (page, size) => {
    setLoading(true);
    GroupsRepository.getAll(page, size)
      .then((res) => {
        setLoading(false);
        setGroups(res.data);
      })
      .catch((err) => {
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
        Groups
      </h1>
      <Grid item xs={12} md={2}>
        <Button
          size="medium"
          variant="outlined"
          fullWidth
          style={{
            color: "#D9D9D9",
            borderColor: "#D9D9D9",
            backgroundColor: "#17202A",
          }}
          onClick={() => {
            setRedirectTo(`/groups/create`);
          }}
        >
          CREATE NEW GROUP
        </Button>
      </Grid>
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
                  <CircularProgress />
                </div>
              )}
              {!loading &&
                groups?.content?.map((group, index) => (
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
                        setRedirectTo(`/groups/details/${group.id}`);
                      }}
                    >
                      {group.name}
                    </TableCell>
                    <TableCell>
                      <EditIcon
                        fontSize="large"
                        style={{ width: "1.7em" }}
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setRedirectTo(`/groups/edit/${group?.id}`);
                        }}
                      ></EditIcon>

                      <DeleteIcon
                        fontSize="large"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          GroupsRepository.deleteGroup(group?.id);
                          setRedirectTo(`/groups/delete/${group?.id}`);
                        }}
                      ></DeleteIcon>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {!loading && groups && groups.pageable !== undefined && (
            <Pagination
              count={Math.floor(groups?.totalPages / groups?.size)}
              page={groups.pageable}
              onChange={handleChange}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};
