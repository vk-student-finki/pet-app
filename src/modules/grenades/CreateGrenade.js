import { Avatar, Button, Container, Grid, TextField } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";

export const CreateGrenade = () => {
  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#D35400" }}>
          <AddIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{ textAlign: "center", fontFamily: "Copperplate, fantasy" }}
        >
          Add new product
        </Typography>
      </Box>
      <Container maxWidth="xs">
        <Grid item xs={12} style={{ marginTop: "40px" }}>
          <TextField
            label="Name"
            size="small"
            variant="outlined"
            color="warning"
            autoFocus
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            placeholder="Description"
            size="small"
            variant="outlined"
            color="warning"
            fullWidth
            style={{ marginTop: "8px" }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Country"
            size="small"
            variant="outlined"
            color="warning"
            fullWidth
            style={{ marginTop: "8px" }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Producer"
            size="small"
            variant="outlined"
            color="warning"
            fullWidth
            style={{ marginTop: "8px" }}
          />
        </Grid>

        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <Button
            // onClick={() => {
            //   handleSubmit();
            // }}
            type="submit"
            style={{ backgroundColor: "#17202A " }}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
          >
            Create
          </Button>
        </Grid>
      </Container>
    </>
  );
};
