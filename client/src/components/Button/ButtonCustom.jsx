import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

function ButtonCustom({
  onClick,
  isSubmit,
  children,
  backgroundColor,
  style = {},
}) {
  return (
    <Button
      disabled={isSubmit}
      onClick={onClick}
      variant="contained"
      style={{
        backgroundColor: backgroundColor || "#333436",
        borderRadius: "30px",
        padding: "0.8rem 0",
        boxShadow: "none",
        ...style,
      }}
      loading={isSubmit}
      loadingIndicator={
        <CircularProgress
          color="inherit"
          style={{ height: "25px", width: "25px" }}
        />
      }
    >
      {children}
    </Button>
  );
}

export default ButtonCustom;
