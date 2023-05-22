import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import img from "../images/petsimage.jpg";
export const Home = ({}) => {
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            background: "#f1f2f6",
            height: "150px",
            backgroundImage: `url(${img})`,
          }}
        >
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Grid container>
              <Grid item xs={12}>
                <h1
                  style={{
                    fontFamily: "Sans-serif, verdana",
                    fontWeight: "bold",
                    color: "#0B648A",
                    display: "block",
                    paddingTop: "200px",
                    textTransform: "uppercase",
                  }}
                >
                  Welcome
                </h1>
              </Grid>
              <Grid item xs={12}>
                <h3
                  style={{
                    fontFamily: "Sans-serif, verdana",
                    color: "#0B648A",
                    display: "block",
                  }}
                >
                  {
                    " We are Macedonia based business that makes sure that you get your newest and cutest family member. You can buy* or adopt one (or more) of our many furry friends here at PETS."
                  }
                </h3>
              </Grid>
              <Grid item xs={12}>
                <h6
                  style={{
                    fontFamily: "Sans-serif, verdana",
                    color: "#0B648A",
                    display: "block",
                  }}
                >
                  {
                    "*All of the money is donated to the animals that need it most."
                  }
                </h6>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
