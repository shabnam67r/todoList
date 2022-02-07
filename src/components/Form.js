import { Box, FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import FormatAlignLeftSharpIcon from "@mui/icons-material/FormatAlignLeftSharp";

function Form({ todoItem, setTodoItem, handleEnter }) {
  return (
    <Box component="form" noValidate autoComplete="off" p={2}>
      <FormControl sx={{ width: "100%" }}>
        <OutlinedInput
          value={todoItem}
          onChange={(e) => setTodoItem(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleEnter(e)}
          sx={{ color: "#fff", borderColor: "#000 !important" }}
          placeholder="Add A task"
          startAdornment={
            <InputAdornment position="start">
              <FormatAlignLeftSharpIcon sx={{ color: "#695965" }} />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}

export default Form;
