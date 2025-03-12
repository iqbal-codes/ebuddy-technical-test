"use client";

import { createContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface SnackbarContextType {
  showSnackbar: (_message: string, _severity?: SnackbarSeverity) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<SnackbarSeverity>("success");

  const showSnackbar = (
    text: string,
    newSeverity: SnackbarSeverity = "success"
  ) => {
    console.log({ text, newSeverity });
    setMessage(text);
    setSeverity(newSeverity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

