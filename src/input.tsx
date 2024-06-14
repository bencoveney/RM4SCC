import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Barcode, buildBarcode } from "./rm4scc";

import { Button, Buttons, FieldGroup, Form, Labeled, Note } from "./form";
import { Subheading } from "./heading";

const modePostcodeDps = "PostcodeDPS";
const modePostcode = "Postcode";
const modeArbitrary = "Arbitrary";
const modes = [modePostcodeDps, modePostcode, modeArbitrary];

type Preset = {
  name: string;
  mode: string;
  postcode: string;
  dps: string;
  arbitrary: string;
  terminators: boolean;
  checksum: boolean;
};

export function Input({ setValue }: { setValue: (value: Barcode) => void }) {
  const preset = usePresetButtons();

  const mode = useRadioButtons({
    name: "mode",
    values: modes,
    defaultValue: preset.defaults.mode,
  });

  const postcode = useTextInput({ defaultValue: preset.defaults.postcode });
  const deliveryPointSuffix = useTextInput({
    defaultValue: preset.defaults.dps,
  });
  const arbitrary = useTextInput({ defaultValue: preset.defaults.arbitrary });

  const terminators = useCheckbox({
    defaultChecked: preset.defaults.terminators,
  });
  const checksum = useCheckbox({ defaultChecked: preset.defaults.checksum });

  useEffect(() => {
    let input = "";
    switch (mode.value) {
      case modePostcodeDps:
      default:
        input = `${postcode.value}${deliveryPointSuffix.value}`;
        break;
      case modePostcode:
        input = `${postcode.value}9Z`;
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
    <>
      <Subheading>Input</Subheading>
      <Form>
        <FieldGroup label="Preset">{preset.element}</FieldGroup>
        <FieldGroup label="Input Mode">
          <Labeled label="Postcode and DPS">
            {mode.elements[modePostcodeDps]}
          </Labeled>
          <Labeled label="Postcode">{mode.elements[modePostcode]}</Labeled>
          <Labeled label="Arbitrary Data">
            {mode.elements[modeArbitrary]}
          </Labeled>
        </FieldGroup>
        <FieldGroup label="Input">
          {mode.value === modePostcodeDps && (
            <>
              <Labeled label="Postcode">{postcode.element}</Labeled>
              <Labeled label="DPS">{deliveryPointSuffix.element}</Labeled>
            </>
          )}
          {mode.value === modePostcode && (
            <>
              <Labeled label="Postcode">{postcode.element}</Labeled>
              <Note>A default DPS code of 9Z will be used</Note>
            </>
          )}
          {mode.value === modeArbitrary && (
            <Labeled label="Value">{arbitrary.element}</Labeled>
          )}
        </FieldGroup>
        <FieldGroup label="Extras">
          <Note>Required for a valid barcode</Note>
          <Labeled label="Include Terminators">{terminators.element}</Labeled>
          <Note>Include leading and trailing characters</Note>
          <Labeled label="Include Checksum">{checksum.element}</Labeled>
          <Note>Include a checksum of the input value</Note>
        </FieldGroup>
      </Form>
    </>
  );
}

export function useCheckbox({ defaultChecked }: { defaultChecked: boolean }) {
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
    element: <input type="checkbox" checked={checked} onChange={onChange} />,
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
    element: <input type="text" onChange={onChange} value={value} />,
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
        checked={valueName === value}
        onChange={onChange}
      />
    );
  });

  return { elements, value };
}

const postcodePreset: Preset = {
  name: "Sample Postcode",
  mode: modePostcodeDps,
  postcode: "BX11LT",
  dps: "1A",
  arbitrary: "",
  terminators: true,
  checksum: true,
};

const benPreset: Preset = {
  name: "Ben",
  mode: modeArbitrary,
  postcode: "",
  dps: "",
  arbitrary: "Ben",
  terminators: false,
  checksum: false,
};

const emptyPreset: Preset = {
  name: "Empty",
  mode: modeArbitrary,
  postcode: "",
  dps: "",
  arbitrary: "",
  terminators: false,
  checksum: false,
};

function usePresetButtons() {
  const [defaults, setDefaults] = useState<Preset>(postcodePreset);
  return {
    element: (
      <Buttons>
        <Button
          onClick={(event) => {
            event.preventDefault();
            setDefaults(postcodePreset);
          }}
        >
          {postcodePreset.name}
        </Button>
        <Button
          onClick={(event) => {
            event.preventDefault();
            setDefaults(benPreset);
          }}
        >
          {benPreset.name}
        </Button>
        <Button
          onClick={(event) => {
            event.preventDefault();
            setDefaults(emptyPreset);
          }}
        >
          {emptyPreset.name}
        </Button>
      </Buttons>
    ),
    defaults,
  };
}
