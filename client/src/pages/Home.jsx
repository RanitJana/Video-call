import React, { useState } from "react";
import ButtonCustom from "../components/Button/ButtonCustom.jsx";
import Input from "../components/Input/Input.jsx";
import { useNavigate } from "react-router";
import NavBar from "../components/Navbar/NavBar.jsx";
import VideocamIcon from "@mui/icons-material/Videocam";

function Home() {
  const [newMeetingClicked, setNewMeetingClicked] = useState(false);
  const [joinClicked, setJoinClicked] = useState(false);

  const navigate = useNavigate();

  const handleJoinNewMeeting = async () => {
    if (newMeetingClicked) return;
    setNewMeetingClicked(true);
    await new Promise((res) => {
      setTimeout(() => {
        res("Done");
        navigate("/meet?id=45");
      }, 1000);
    });
    setNewMeetingClicked(false);
  };

  const handleJoinExistingMeeting = async () => {
    if (joinClicked) return;
    setJoinClicked(true);
    await new Promise((res) => {
      setTimeout(() => {
        res("Done");
      }, 3000);
    });
    setJoinClicked(false);
  };

  return (
    <div className="flex flex-col h-dvh">
      <NavBar />
      <div className="w-full h-full p-4 flex justify-center items-center">
        <div className="flex flex-col max-w-[30rem] gap-3">
          <h2 className="text-[2.8rem] leading-13 text-gray-800 font-medium">
            Video calls and meetings for everyone
          </h2>
          <p className="text-xl break-words text-wrap font-medium text-gray-600">
            connect, collaborate, and celebrate from anywhere with Google Meet
          </p>
          <div className="flex gap-5 flex-wrap mt-2 w-full">
            <ButtonCustom
              backgroundColor={"#2C82FA"}
              isSubmit={newMeetingClicked}
              onClick={handleJoinNewMeeting}
            >
              <div
                className="flex
               justify-center items-center gap-2 px-4 lowercase font-bold"
              >
                <span>New meeting</span>
                {<VideocamIcon />}
              </div>
            </ButtonCustom>
            <div className="flex gap-2">
              <Input width={"12rem"} height={"3rem"} />
              <ButtonCustom
                backgroundColor={"#dce9fa"}
                isSubmit={joinClicked}
                onClick={handleJoinExistingMeeting}
              >
                <span className="text-[#2C82FA] font-bold lowercase">Join</span>
              </ButtonCustom>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
