import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { useEffect } from "react";
import {
  FormControl,
  InputAdornment,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Box, style } from "@mui/system";

const options = ["Pin To The Top", "Add a Memo", "Delete"];
const ITEM_HEIGHT = 48;

function ToDoList({
  id,
  pinned,
  title,
  checked,
  deleteTaskHandler,
  addMemoText,
  updateTask,
  memo,
  setMemoText,
  memoText,
  
}) {
  //************************************ *********************** */
  /*hooks*/
  /************************************************************* */
  const [items, setItems] = useState({
    id,
    title,
    pinned,
    checked,
  });
  useEffect(
    () =>
      setItems({
        id,
        title,
        pinned,
        checked,
      }),
    [id, title, pinned, checked]
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [memoInput, setMemoInput] = useState(false);

  const open = Boolean(anchorEl);
  //************************************ *********************** */
  /*handle functions */
  /************************************************************* */

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <ListItem
      key={id}
      secondaryAction={
        <IconButton edge="end" aria-label="comments">
          {/* //************************************ *********************** */}
          {/* /*small menu*/}
          {/* /************************************************************* */}
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "small-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreHorizIcon sx={{ color: "#695965" }} />
            </IconButton>
            <Menu
              sx={{ color: "#695965" }}
              id="small-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                  padding: "0px",
                  color: "#695965",
                  backgroundColor: "#221a21db",
                },
              }}
            >
              <MenuItem
                key={options[0]}
                pinned={items.pinned}
                onClick={() => updateTask(id, { pinned: !items.pinned })}
              >
                {options[0]}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setMemoInput(true);
                  handleClose();
                }}
                key={options[1]} 
                
              >
                {options[1]}
              </MenuItem>
              <MenuItem
                key={options[2]}
                onClick={() => deleteTaskHandler(id, title)}
              >
                {options[2]}
              </MenuItem>
            </Menu>
          </div>
        </IconButton>
      }
      disablePadding
    >
      {/* //************************************ *********************** */}
      {/* /*list items*/}
      {/* /************************************************************* */}
      <ListItemButton role={undefined}>
        <ListItemIcon
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {pinned ? (
            <PushPinOutlinedIcon sx={{ color: "#f59bdd", width: 15 }} />
          ) : (
            <div style={{ color: "#f59bdd", width: 15 }}></div>
          )}
          <Checkbox
            checked={items.checked}
            sx={{ color: "#f59bdd !important" }}
            inputProps={{ "aria-label": "controlled" }}
            onClick={() => updateTask(id, { checked: !items.checked })}
          />
        </ListItemIcon>
        <ListItemText key={id} primary={title} />
        {memoInput ? (
          <TextField
          sx={{dislpay:'flex',flexDirection:'column'}}
            onBlur={() => setMemoInput(false)}
            onChange={(e) => setMemoText(e.target.value)}
            onKeyPress={(e) => {
              e.key === "Enter" && addMemoText(e, id, { memo: memoText });
              e.key === "Enter" && setMemoInput(false);
            }}
          />
        ) : (
          <Typography display={"block"}>{memo}</Typography>
        )}
      </ListItemButton>
    </ListItem>
  );
}

export default ToDoList;
