import { Slider, Space, Popover } from "antd";
import React, { memo, useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useVideo } from "react-use";
import {
  PlayCircleOutlined,
  PauseOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import { useMemo } from "react";
const VideoDetail = memo(() => {
  const {
    state: { createdAt, poster, updatedAt, url },
  } = useLocation();
  const [video, state, controls, ref] = useVideo(
    <video
      src={url}
      style={{ width: "960px", height: "544px" }}
      autoPlay
    ></video>
  );
  const [slideValue, setSlideValue] = useState(0);
  // const [volumeValue, setVolumeValue] = useState(state.volume * 100);
  const volumeValue = state.volume * 100;
  const slideChange = (val) => {
    setSlideValue(val);
    controls.seek((val / 100) * state.duration);
    // state.time=(val/100)*state.duration
  };
  const volumeChange = (val) => {
    state.volume = val / 100;
  };
  useEffect(() => {
    const currentPercent = (state.time / state.duration) * 100;
    setSlideValue(currentPercent);
  }, [state]);
  return (
    <div>
      {video}
      <Slider
        defaultValue={0}
        value={slideValue}
        onChange={slideChange}
        tooltip={false}
        style={{ width: "950px", zIndex: "9999", marginTop: "-20px" }}
      ></Slider>
      {state.playing === false ? (
        <PlayCircleOutlined
          onClick={controls.play}
          size={"large"}
          style={{
            color: "white",
            cursor: "pointer",
            fontSize: "80px",
            position: "absolute",
            top: "390px",
            left: "700px",
          }}
        />
      ) : (
        ""
      )}
      {state.playing === false ? (
        ""
      ) : (
        <PauseOutlined
          style={{
            cursor: "pointer",
            fontSize: "25px",
            position: "absolute",
            marginTop: "-45px",
            left: "1170px",
          }}
          onClick={controls.pause}
        />
      )}
      <Popover
        // style={{ width: "0px" }}
        content={
          <>
            <Slider
              vertical
              onChange={volumeChange}
              value={volumeValue}
              style={{ height: "90px", width: "20px", marginLeft: "50%" }}
            ></Slider>
          </>
        }
        title="音量调节"
      >
        <SoundOutlined
          style={{
            cursor: "pointer",
            fontSize: "25px",
            position: "absolute",
            marginTop: "-45px",
            left: "1120px",
          }}
        ></SoundOutlined>
      </Popover>
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
      {/* <Video url={url} poster={poster}></Video> */}
    </div>
  );
});

export default VideoDetail;
