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
  const { barWidth, ascDescHeight, trackHeight, density, display, animate } =
    renderSpec;

  const spacePerBar = limits.densityRange / density;
  const gapWidth = spacePerBar - barWidth;

  const numBars = barcode.length;
  const numGaps = numBars - 1;

  const width = barWidth * numBars + gapWidth * numGaps;
  const height = ascDescHeight + trackHeight + ascDescHeight;

  // Prevent elements hanging around - the animations get out of sync
  const uniquifier = barcode.map((bar) => {
    switch (bar) {
      case Bar.SHORT:
        return "s";
      case Bar.UP:
        return "u";
      case Bar.DOWN:
        return "d";
      case Bar.LONG:
        return "l";
      default:
        return "?";
    }
  });

  let displayProps: React.SVGProps<SVGSVGElement> = {};
  switch (display) {
    case "force_square":
      displayProps = {
        preserveAspectRatio: "none",
        style: { width: "5rem", height: "5rem", flexGrow: 0 },
      };
      break;
    case "real_size":
      displayProps = {
        width: `${width}mm`,
        height: `${height}mm`,
      };
      break;
    case "scale_to_fit":
    default:
      break;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${clamp(width)} ${clamp(height)}`}
      {...displayProps}
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
                key={`${index}${uniquifier}`}
              >
                {animate && (
                  <Animation
                    index={index}
                    total={numBars}
                    height={[clamp(trackHeight), clamp(height)]}
                    y={[clamp(ascDescHeight), clamp(0)]}
                  />
                )}
              </rect>
            );
          case Bar.UP:
            return (
              <rect
                x={clamp(x)}
                y={clamp(0)}
                width={clamp(barWidth)}
                height={clamp(ascDescHeight + trackHeight)}
                key={`${index}${uniquifier}`}
              >
                {animate && (
                  <Animation
                    index={index}
                    total={numBars}
                    height={[clamp(ascDescHeight + trackHeight), clamp(height)]}
                  />
                )}
              </rect>
            );
          case Bar.DOWN:
            return (
              <rect
                x={clamp(x)}
                y={clamp(ascDescHeight)}
                width={clamp(barWidth)}
                height={clamp(ascDescHeight + trackHeight)}
                key={`${index}${uniquifier}`}
              >
                {animate && (
                  <Animation
                    index={index}
                    total={numBars}
                    height={[clamp(ascDescHeight + trackHeight), clamp(height)]}
                    y={[clamp(ascDescHeight), clamp(0)]}
                  />
                )}
              </rect>
            );
          case Bar.LONG:
            return (
              <rect
                x={clamp(x)}
                y={clamp(0)}
                width={clamp(barWidth)}
                height={clamp(height)}
                key={`${index}${uniquifier}`}
              >
                {animate && (
                  <Animation
                    index={index}
                    total={numBars}
                    height={[clamp(height), clamp(height)]}
                  />
                )}
              </rect>
            );
        }
      })}
    </svg>
  );
}

const duration = 0.5;
const pause = 0.75;

function Animation({
  index,
  total,
  height,
  y,
}: {
  index: number;
  total: number;
  height?: [number, number];
  y?: [number, number];
}) {
  const startOffset = (index / total) * duration;

  const totalTime = pause + duration;
  const end = clamp(duration / totalTime);
  const midpoint = clamp(end / 2);

  return (
    <>
      {height && (
        <animate
          attributeName="height"
          from={height[0]}
          to={height[1]}
          values={`${height[0]}; ${height[1]}; ${height[0]}; ${height[0]}`}
          keyTimes={`0; ${midpoint}; ${end}; 1`}
          dur={`${totalTime}s`}
          begin={`${startOffset}s`}
          repeatCount="indefinite"
        />
      )}
      {y && (
        <animate
          attributeName="y"
          from={y[0]}
          to={y[1]}
          values={`${y[0]}; ${y[1]}; ${y[0]}; ${y[0]}`}
          keyTimes={`0; ${midpoint}; ${end}; 1`}
          dur={`${totalTime}s`}
          begin={`${startOffset}s`}
          repeatCount="indefinite"
        />
      )}
    </>
  );
}
