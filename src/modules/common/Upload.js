import { Button, Typography } from "@mui/material";
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
    </>
  );
};
