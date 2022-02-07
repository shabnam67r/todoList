import { Box, Typography } from "@mui/material";
import React from "react";

function Header() {
  return(
    <Box
    sx={{
      borderBottom: "1px solid #000",
      width: "100%",
      height: "fit-content",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Typography
      sx={{
        borderBottom: "2px solid #f59bdd",
        width: "fit-content",
        p: 1,
      }}
    >
      To Do List
    </Typography>
  </Box>
  )
 
}

export default Header;
