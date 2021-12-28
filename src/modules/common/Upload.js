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
          color="inherit"
          size="small"
          variant="outlined"
        >
          Upload files ({attachments.length})
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
            backgroundColor: "#17202A",
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
