import React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { Typography } from "@material-ui/core";

export default function Darpzone({
  title,
  onChange,
  filesLimit,
  acceptedFiles,
  initialFiles = [],
  maxFileSize,
  noNamesPreview,
  error,
  helperText,
}) {
  console.log(initialFiles, "initialFiles");
  return (
    <div>
      <DropzoneArea
        acceptedFiles={acceptedFiles || ["image/*"]}
        error={error}
        showFileNames={true}
        // useChipsForPreview
        dropzoneText={
          error ? (
            helperText
          ) : (
            <Typography>Drop your file, Browse your file</Typography>
          )
        }
        onChange={(files) => {
          onChange(files);
        }}
        filesLimit={filesLimit || 1}
        initialFiles={initialFiles || []}
        maxFileSize={maxFileSize}
      />
    </div>
  );
}
