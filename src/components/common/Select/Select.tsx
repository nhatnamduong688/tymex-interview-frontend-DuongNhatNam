import React from 'react';
import { Select as ShadcnSelect } from "@/components/ui/select";
import Text from "../Text/Text";
import {
  SelectContainer,
  StyledSelectTrigger,
  StyledSelectContent,
  StyledSelectGroup,
  StyledSelectItem,
  StyledSelectValue,
  SelectProps
} from './Select.styles';

const Select = ({
                  placeholder = "",
                  label = "",
                  options = [],
                  onValueChange,
                  defaultValue,
                  value,
                }: SelectProps) => {
  return (
      <SelectContainer>
        {label && (
            <Text variant="header" color="shadow-gray">
              {label}
            </Text>
        )}
        <ShadcnSelect
            onValueChange={onValueChange}
            defaultValue={defaultValue}
            value={value}
        >
          <StyledSelectTrigger>
            <StyledSelectValue placeholder={placeholder} />
          </StyledSelectTrigger>
          <StyledSelectContent>
            <StyledSelectGroup>
              {options.map(({ value, label }) => (
                  <StyledSelectItem key={value} value={value}>
                    {label}
                  </StyledSelectItem>
              ))}
            </StyledSelectGroup>
          </StyledSelectContent>
        </ShadcnSelect>
      </SelectContainer>
  );
};

export default Select;