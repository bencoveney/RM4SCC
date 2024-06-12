import React, { useEffect, useState } from "react";
import { Barcode, buildBarcode } from "./rm4scc";

const modePostcodeDps = "PostcodeDPS";
const modePostcode = "Postcode";
const modeArbitrary = "Arbitrary";
type Mode = typeof modePostcodeDps | typeof modePostcode | typeof modeArbitrary;

const nameMode = "mode";
const nameValue = "value";
const nameIncludeChecksum = "includeChecksum";
const nameIncludeTerminators = "includeTerminators";

export function Input({ setValue }: { setValue: (value: Barcode) => void }) {
  const postcode = "BX11LT";
  const deliveryPointSuffix = "1A";
  const [input] = useState(`${postcode}${deliveryPointSuffix}`);

  useEffect(() => {
    const barcode = buildBarcode(input);
    setValue(barcode);
  }, [input]);

  return (
    <form>
      <fieldset>
        <legend>Preset</legend>
        <button>Sample Postcode</button>
        <button>TDG</button>
        <button>Ben</button>
      </fieldset>
      <fieldset>
        <legend>Input Mode</legend>
        <input
          type="radio"
          id={modePostcodeDps}
          name={nameMode}
          value={modePostcodeDps}
        />
        <label htmlFor={modePostcodeDps}>Postcode and DPS</label>
        <input
          type="radio"
          id={modePostcode}
          name={nameMode}
          value={modePostcode}
        />
        <label htmlFor={modePostcode}>Postcode</label>
        <input
          type="radio"
          id={modeArbitrary}
          name={nameMode}
          value={modeArbitrary}
        />
        <label htmlFor={modeArbitrary}>Arbitrary Data</label>
      </fieldset>
      <fieldset>
        <legend>Input Value</legend>
        <input type="text" id={nameValue} name={nameValue} />
        <label htmlFor={nameValue}>Value</label>
      </fieldset>
      <fieldset>
        <legend>Include</legend>
        <input
          type="checkbox"
          id={nameIncludeChecksum}
          name={nameIncludeChecksum}
        />
        <label htmlFor={nameIncludeChecksum}>Include Checksum</label>
        <input
          type="checkbox"
          id={nameIncludeTerminators}
          name={nameIncludeTerminators}
        />
        <label htmlFor={nameIncludeTerminators}>Include Terminators</label>
      </fieldset>
    </form>
  );
}
