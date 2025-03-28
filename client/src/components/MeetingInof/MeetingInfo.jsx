import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Button from "../Button/ButtonCustom.jsx";

function MeetingInfo() {
  return (
    <div className="text-sm flex flex-col gap-2 py-8">
      <p className="font-bold">Joining info</p>
      <div className="flex flex-col">
        <p className="text-gray-700">{window.location.href}</p>
        <Button
          backgroundColor={"transparent"}
          style={{
            color: "#2E5DD5",
            padding: "0.5rem",
            width: "fit-content",
            display: "flex",
            justifyContent: "center",
            itemsCenter: "center",
            gap: "0.25rem",
            marginLeft: "-0.25rem",
          }}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
        >
          <ContentCopyIcon style={{ width: "1.2rem" }} />
          <span className="font-bold lowercase">Copy joining info</span>
        </Button>
      </div>
      <hr className="text-gray-400 mt-4" />
    </div>
  );
}

export default MeetingInfo;
