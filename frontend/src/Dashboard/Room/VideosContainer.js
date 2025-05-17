import React from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import Video from "./Video";

const MainContainer = styled("div")(({ layout }) => ({
  height: "85%",
  width: "100%",
  display: "grid",
  gap: "10px",
  justifyItems: "center",
  alignItems: "center",
  ...getGridStyles(layout),
}));

const getGridStyles = (count) => {
  switch (count) {
    case 1:
      return {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
      };
    case 2:
      return {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr 1fr",
      };
    case 3:
      return {
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gridTemplateAreas: `
          "top-left top-right"
          ". bottom"
        `,
      };
    case 4:
    default:
      return {
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
      };
  }
};

const VideosContainer = ({ localStream, remoteStreams, screenSharingStream }) => {
  const allStreams = [screenSharingStream || localStream, ...remoteStreams];
  const layoutCount = allStreams.length;

  return (
    <MainContainer layout={layoutCount}>
      {allStreams.map((stream, index) => (
        <Video
          stream={stream}
          key={stream.id || index}
          isLocalStream={index === 0}
          index={index}
          count={layoutCount}
        />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(VideosContainer);
