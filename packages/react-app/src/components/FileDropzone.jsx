import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { bytesToSize } from "../util";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 400,
  textAlign: "left",
  height: 200,
  overflow: "hidden",
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export function FileDropzone({ files, setFiles, updateInfo, info }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      console.log("files", acceptedFiles);
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map(file => {
    return (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <p>
            {/* <img src={file.preview} className="preview-image" /> */}
            <b>{file.name}</b>
            <br />
            {file.size && (
              <span>
                Size: {bytesToSize(file.size)}
                <br />
              </span>
            )}
            {file.type && <span>Type: {file.type}</span>}

            <Input
              addonBefore={"ItemName"}
              placeholder="Enter item name"
              value={info[`${file.name}-name`]}
              onChange={e => updateInfo({ [`${file.name}-name`]: e.target.value })}
            />
            <Input
              addonBefore={"Price (eth - optional)"}
              placeholder="Enter eth price"
              value={info[`${file.name}-price`]}
              onChange={e => updateInfo({ [`${file.name}-price`]: e.target.value })}
            />
          </p>
        </div>
      </div>
    );
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}
