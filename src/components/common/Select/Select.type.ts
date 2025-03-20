import * as SelectPrimitive from "@radix-ui/react-select";

export type SelectProps = SelectPrimitive.SelectProps & {
  placeholder?: string;
  options: { value: string; label: string | number }[];
  label?: string;
};