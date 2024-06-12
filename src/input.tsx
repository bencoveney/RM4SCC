import React, {
  ChangeEvent,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Barcode, buildBarcode } from "./rm4scc";

const modePostcodeDps = "PostcodeDPS";
const modePostcode = "Postcode";
const modeArbitrary = "Arbitrary";
const modes = [modePostcodeDps, modePostcode, modeArbitrary];

export function Input({ setValue }: { setValue: (value: Barcode) => void }) {
  const mode = useRadioButtons({
    name: "mode",
    values: modes,
    defaultValue: modes[0],
  });

  const postcode = useTextInput({ defaultValue: "BX11LT" });
  const deliveryPointSuffix = useTextInput({ defaultValue: "1A" });
  const arbitrary = useTextInput({ defaultValue: "Ben" });

  const terminators = useCheckbox({ defaultChecked: true });
  const checksum = useCheckbox({ defaultChecked: true });

  useEffect(() => {
    let input = "";
    switch (mode.value) {
      case modePostcodeDps:
      default:
        input = `${postcode.value}${deliveryPointSuffix.value}`;
        break;
      case modePostcode:
        input = `${postcode.value}`;
        break;
      case modeArbitrary:
        input = `${arbitrary.value}`;
        break;
    }
    const barcode = buildBarcode(input, terminators.checked, checksum.checked);
    setValue(barcode);
  }, [
    mode.value,
    postcode.value,
    deliveryPointSuffix.value,
    arbitrary.value,
    terminators.checked,
    checksum.checked,
  ]);

  return (
    <form>
      <FieldGroup label="Preset">
        <button>Sample Postcode</button>
        <button>Ben</button>
        <button>Empty</button>
      </FieldGroup>
      <FieldGroup label="Input Mode">
        <Labeled label="Postcode and DPS">
          {mode.elements[modePostcodeDps]}
        </Labeled>
        <Labeled label="Postcode">{mode.elements[modePostcode]}</Labeled>
        <Labeled label="Arbitrary Data">{mode.elements[modeArbitrary]}</Labeled>
      </FieldGroup>
      <FieldGroup label="Input">
        <Labeled label="Postcode">{postcode.element}</Labeled>
        <Labeled label="DPS">{deliveryPointSuffix.element}</Labeled>
        <Labeled label="Value">{arbitrary.element}</Labeled>
      </FieldGroup>
      <FieldGroup label="Include">
        <Labeled label="Include Terminators">{terminators.element}</Labeled>
        <Labeled label="Include Checksum">{checksum.element}</Labeled>
      </FieldGroup>
    </form>
  );
}

function FieldGroup({ children, label }: PropsWithChildren<{ label: string }>) {
  return (
    <fieldset>
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
}

function Labeled({ children, label }: PropsWithChildren<{ label: string }>) {
  return (
    <label>
      {label}
      {children}
    </label>
  );
}

function useCheckbox({ defaultChecked }: { defaultChecked: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);

  useEffect(() => {
    setChecked(defaultChecked);
  }, [setChecked, defaultChecked]);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    },
    [setChecked]
  );

  return {
    element: (
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
    ),
    checked,
  };
}

function useTextInput({ defaultValue }: { defaultValue: string }) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [setValue, defaultValue]);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  return {
    element: (
      <input type="text" onChange={onChange} defaultValue={defaultValue} />
    ),
    value: value,
  };
}

function useRadioButtons({
  name,
  values,
  defaultValue,
}: {
  name: string;
  values: string[];
  defaultValue: string;
}) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [setValue, defaultValue]);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  const elements: Record<string, ReactElement> = {};
  values.forEach((valueName) => {
    elements[valueName] = (
      <input
        type="radio"
        name={name}
        value={valueName}
        defaultChecked={valueName === defaultValue}
        onChange={onChange}
      />
    );
  });

  return { elements, value };
}
