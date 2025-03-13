import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { useAlert } from "~/components/Alert/AlertContext";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();
  const { showAlert } = useAlert();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.log("uploadFile to", url);

    if (!file) {
      return;
    }

    // Get the authorization token from localStorage
    const authorization_token = localStorage.getItem("authorization_token");
    if (!authorization_token) {
      showAlert("Authorization token not found. Please log in again.", "error");
      return;
    }

    console.log(`Authorization = Basic ${authorization_token}`);

    let response;

    try {
      // Get the presigned URL
      response = await axios({
        method: "GET",
        headers: { Authorization: `Basic ${authorization_token}` },
        url,
        params: {
          name: encodeURIComponent(file.name),
        },
      });

      if (response.status === 401) {
        showAlert("Unauthorized: Please log in again", "error");
        return;
      }

      if (response.status === 403) {
        showAlert("Forbidden: Invalid credentials", "error");
        return;
      }
    } catch (error: any) {
      //showAlert("Unauthorized: Please log in again", "error");
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 401) {
            showAlert("Unauthorized: Please log in again", "error");
          } else if (error.response.status === 403) {
            showAlert("Forbidden: Invalid credentials", "error");
          } else {
            showAlert("Error: Unknown error", "error");
          }
        } else if (error.request) {
          // The request was made but no response was received
          showAlert("No response received from server", "error");
        } else {
          // Something happened in setting up the request that triggered an Error
          showAlert("Error setting up request: " + error.message, "error");
        }
      } else {
        // Something else happened
        showAlert("An unexpected error occurred", "error");
      }
      return;
    }

    console.log("File to upload: ", file.name);
    console.log("Uploading to: ", response.data);

    const result = await fetch(response.data, {
      method: "PUT",
      headers: {
        "Content-Type": "text/csv",
      },
      body: file,
    });

    console.log("Result: ", result);

    if (result.ok) {
      showAlert("File uploaded successfully", "success");
    } else {
      showAlert("Error uploading file", "error");
    }

    setFile(undefined);
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
