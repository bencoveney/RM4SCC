import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Form, Labeled } from "./form";
import { Subheading } from "./heading";
import { round } from "./utils";

import classes from "./render.module.css";
import { useCheckbox } from "./input";

type Range = [number, number, number, string]; // min, max, step, unit

// Units generally in mm
export const limits = {
  clearZone: 2,
  barWidth: [0.38, 0.63, 0.01, "mm"] as Range,
  ascDescHeight: [1.6, 2.16, 0.01, "mm"] as Range,
  trackHeight: [1.02, 1.52, 0.01, "mm"] as Range,
  densityRange: 25.4,
  // Bars per densityRange
  density: [20, 24, 1, "bars"] as Range,
};

export type RenderSpec = {
  barWidth: number;
  ascDescHeight: number;
  trackHeight: number;
  density: number;
  animate: boolean;
};

export function Render({
  setRenderSpec,
}: {
  setRenderSpec: (spec: RenderSpec) => void;
}) {
  const barWidth = useSlider(limits.barWidth);
  const ascDescHeight = useSlider(limits.ascDescHeight);
  const trackHeight = useSlider(limits.trackHeight);
  const density = useSlider(limits.density);
  const animate = useCheckbox({ defaultChecked: false });

  useEffect(() => {
    setRenderSpec({
      barWidth: barWidth.value,
      ascDescHeight: ascDescHeight.value,
      trackHeight: trackHeight.value,
      density: density.value,
      animate: animate.checked,
    });
  }, [
    barWidth.value,
    ascDescHeight.value,
    trackHeight.value,
    density.value,
    animate.checked,
  ]);

  return (
    <>
      <Subheading>Render</Subheading>
      <Form>
        <Labeled label="Bar Width" vertical>
          {barWidth.element}
        </Labeled>
        <Labeled label="Ascender/Descender Height" vertical>
          {ascDescHeight.element}
        </Labeled>
        <Labeled label="Track Height" vertical>
          {trackHeight.element}
        </Labeled>
        <Labeled label={`Density (per ${limits.densityRange}mm)`} vertical>
          {density.element}
        </Labeled>
        <Labeled label="Animate">{animate.element}</Labeled>
      </Form>
    </>
  );
}

function useSlider(range: Range) {
  const [min, max, step, unit] = range;
  const [value, setValue] = useState(round((min + max) / 2, 2));

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(parseFloat(event.target.value));
    },
    [setValue]
  );

  return {
    value,
    element: (
      <>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
        />
        <div className={classes.range}>
          <div>
            Min: {min}
            {unit}
          </div>
          <div>
            {value}
            {unit}
          </div>
          <div>
            Max: {max}
            {unit}
          </div>
        </div>
      </>
    ),
  };
}