import React, { memo } from "react";
import { Spin } from "antd";
import "./index.css";
const Loading = memo(() => {
  return (
    <div className="example">
      <Spin size="large" style={{ position: "absolute", top: "50%" }}></Spin>
    </div>
  );
});

export default Loading;
