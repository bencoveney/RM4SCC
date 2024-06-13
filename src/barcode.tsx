import React from "react";
import { Bar, Barcode as BarcodeType } from "./rm4scc";

export function Barcode({ barcode }: { barcode: BarcodeType }) {
  const numBars = barcode.length;
  const numGaps = numBars - 1;
  const barWidth = 0.6;
  const gapWidth = 1 - barWidth;
  const ascenderDescenderHeight = 2.16; // 1.6 -> 2.16
  const trackHeight = 1.52; // 1.02 -> 1.52
  const height = ascenderDescenderHeight * 2 + trackHeight;
  const imageWidth = numBars * barWidth + numGaps * gapWidth;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${imageWidth} ${height}`}
    >
      {barcode.map((bar, index) => {
        const x = index * (barWidth + gapWidth);
        switch (bar) {
          case Bar.SHORT:
            return (
              <rect
                x={x}
                y={ascenderDescenderHeight}
                width={barWidth}
                height={trackHeight}
              />
            );
          case Bar.UP:
            return (
              <rect
                x={x}
                y={0}
                width={barWidth}
                height={ascenderDescenderHeight + trackHeight}
              />
            );
          case Bar.DOWN:
            return (
              <rect
                x={x}
                y={ascenderDescenderHeight}
                width={barWidth}
                height={ascenderDescenderHeight + trackHeight}
              />
            );
          case Bar.LONG:
            return <rect x={x} y={0} width={barWidth} height={height} />;
        }
      })}
    </svg>
  );
}

export const render = {
  clearZone: 2,
  minBarWidth: 0.38,
  maxBarWidth: 0.63,
  ascDescMinHeight: 1.6,
  ascDescMaxHeight: 2.16,
  trackMinHeight: 1.02,
  trackMaxHeight: 1.52,
  densityRange: 25.4,
  minDensity: 20, // Bars per densityRange
  maxDensity: 24, // Bars per densityRange
};
