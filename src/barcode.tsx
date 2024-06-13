import React from "react";
import { Bar, Barcode as BarcodeType } from "./rm4scc";
import { RenderSpec, limits } from "./render";
import { round } from "./utils";

function clamp(value: number) {
  return round(value, 3);
}

export function Barcode({
  barcode,
  renderSpec,
}: {
  barcode: BarcodeType;
  renderSpec: RenderSpec;
}) {
  if (!renderSpec) {
    return null;
  }
  const { barWidth, ascDescHeight, trackHeight, density } = renderSpec;

  const spacePerBar = limits.densityRange / density;
  const gapWidth = spacePerBar - barWidth;

  const numBars = barcode.length;
  const numGaps = numBars - 1;

  const width = barWidth * numBars + gapWidth * numGaps;
  const height = ascDescHeight + trackHeight + ascDescHeight;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${clamp(width)} ${clamp(height)}`}
    >
      {barcode.map((bar, index) => {
        const x = clamp(index * (barWidth + gapWidth));
        switch (bar) {
          case Bar.SHORT:
            return (
              <rect
                x={clamp(x)}
                y={clamp(ascDescHeight)}
                width={clamp(barWidth)}
                height={clamp(trackHeight)}
              />
            );
          case Bar.UP:
            return (
              <rect
                x={clamp(x)}
                y={clamp(0)}
                width={clamp(barWidth)}
                height={clamp(ascDescHeight + trackHeight)}
              />
            );
          case Bar.DOWN:
            return (
              <rect
                x={clamp(x)}
                y={clamp(ascDescHeight)}
                width={clamp(barWidth)}
                height={clamp(ascDescHeight + trackHeight)}
              />
            );
          case Bar.LONG:
            return (
              <rect
                x={clamp(x)}
                y={clamp(0)}
                width={clamp(barWidth)}
                height={clamp(height)}
              />
            );
        }
      })}
    </svg>
  );
}
