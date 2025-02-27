import React, { createContext, useContext, useState } from "react";

const colorPalette = {
  // main: "#009963", // 초록
  main: "#0070f3",      // 파랑
  mainLight: "#e1ebff", // 연한 파랑
  sub: "#64748b",       // 밝은 회색
  subLight: "#f8fafc",  // 매우 연한 회색
  red: "#dc3545",       // 빨강
};

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [colors] = useState(colorPalette);

  return (
    <ColorContext.Provider value={colors}>{children}</ColorContext.Provider>
  );
};

export const useColors = () => useContext(ColorContext);
