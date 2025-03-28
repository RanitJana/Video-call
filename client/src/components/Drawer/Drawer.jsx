import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../features/drawerOpen/drawer.slice.js";

function Drawer({ heading = "Users", children }) {
  const dispatch = useDispatch();
  const drawer = useSelector((state) => state.drawer);

  return (
    <div className="w-full max-h-full h-full max-w-[25rem] bg-white rounded-[8px] overflow-hidden">
      {drawer.isOpen && (
        <div className="p-5 h-full overflow-hidden text-nowrap flex flex-col">
          <div className="flex justify-between items-center">
            <span className="text-xl font-stretch-extra-expanded">
              {heading}
            </span>
            <IconButton
              onClick={() => {
                dispatch(toggleDrawer(drawer.barType));
              }}
              type="button"
              sx={{ p: "10px" }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </div>
          {children}
        </div>
      )}
    </div>
  );
}

export default Drawer;
