import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = ({}) => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("/grenades");
  // }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ background: "#f1f2f6", height: "150px" }}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Grid container>
              <Grid item xs={12}>
                <span
                  style={{
                    fontFamily: "Copperplate, fantasy",
                    fontSize: "30px",
                    color: "#1e1f1c",
                    display: "block",
                    paddingTop: "50px",
                    textTransform: "uppercase",
                  }}
                >
                  Welcome
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
