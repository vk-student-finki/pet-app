import { Button, Hidden, Typography } from "@mui/material";
import React, { useRef } from "react";

export const Upload = ({ attachments, setAttachments }) => {
  const uploadFileRef = useRef(null);

  const onFileUploadChange = (e) => {
    console.log(e.target.files);
    setAttachments(e.target.files);
  };

  return (
    <>
      <input
        ref={uploadFileRef}
        type="file"
        multiple={true}
        onChange={onFileUploadChange}
        style={{ display: "none" }}
      />

      {/* DESKTOP */}
      <Hidden smDown>
        <Button
          onClick={() => {
            uploadFileRef.current.click();
          }}
          size="small"
          variant="outlined"
          style={{
            backgroundColor: "#D35400",
            borderColor: "#D35400",
            color: "white",
            fontSize: "12px",
            fontFamily: "Verdana, sans-serif",
          }}
        >
          Upload ({attachments.length})
        </Button>
      </Hidden>

      {/* MOBILE */}
      <Hidden smUp>
        <Button
          fullWidth
          onClick={() => {
            uploadFileRef.current.click();
          }}
          size="small"
          variant="outlined"
          style={{
            backgroundColor: "#D35400",
            border: "1px solid transparent",
            color: "white",
            fontSize: "12px",
            fontFamily: "Verdana, sans-serif",
          }}
        >
          Upload ({attachments.length})
        </Button>
      </Hidden>
    </>
  );
};
