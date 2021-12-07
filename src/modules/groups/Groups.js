import {
  Button,
  CircularProgress,
  Grid,
  Link,
  Pagination,
  Table,
  TableBody,
  TableCell,
  Hidden,
  TableRow,
  Container,
  Stack,
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
    loadData(value - 1, 10);
  };
  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}

      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <h1 style={{ fontFamily: "Helvetica, sans-serif", color: "#1F393C" }}>
            Groups
          </h1>
        </Grid>
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
              setRedirectTo(`/groups/create`);
            }}
          >
            CREATE NEW GROUP
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
                groups?.content?.map((group, index) => (
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
                          cursor: "pointer",
                          backgroundColor:
                            index % 2 === 0 ? "#F4F6F6" : "transparent",
                        }}
                        onClick={() => {
                          setRedirectTo(`/groups/details/${group.id}`);
                        }}
                      >
                        {group.name}
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
                          setRedirectTo(`/groups/details/${group.id}`);
                        }}
                      >
                        {group.name}
                      </TableCell>
                    </Hidden>
                    <TableCell
                      style={{
                        textAlign: "right",
                      }}
                    >
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
                          setRedirectTo(`/groups/delete/${group?.id}`);
                        }}
                      ></DeleteIcon>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Container maxWidth="xs">
            {!loading && groups && groups.number !== undefined && (
              <Stack spacing={2} style={{ marginTop: "20px" }}>
                <Pagination
                  count={Math.floor(groups.totalElements / groups?.size) + 1}
                  shape="rounded"
                  showFirstButton
                  showLastButton
                  style={{ color: "#D35400" }}
                  page={groups?.number + 1}
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
