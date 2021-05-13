import { Raw } from "../type";
import { Select } from "antd";
import React from "react";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

/**
 * value 可以接收多种类型的值
 * onChange 回调只能接收 number | undefined 的值
 * 当 isNaN(Number(value)) 为 true 时，代表选择默认 Option
 * 当选择默认 Option 时，onChange 回调会传入 undefined
 * @param props
 * @constructor
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => {
  return isNaN(Number(value)) ? 0 : Number(value);
};
