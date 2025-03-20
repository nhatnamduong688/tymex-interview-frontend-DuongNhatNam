import styled from 'styled-components';
import {
    Select as ShadcnSelect,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import * as SelectPrimitive from "@radix-ui/react-select";

// Container chính cho component Select
export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Có thể thêm các styled components cho các thành phần của Select nếu cần
export const StyledSelectTrigger = styled(SelectTrigger)`
  /* Thêm custom styles nếu cần */
`;

export const StyledSelectContent = styled(SelectContent)`
  /* Thêm custom styles nếu cần */
`;

export const StyledSelectGroup = styled(SelectGroup)`
  /* Thêm custom styles nếu cần */
`;

export const StyledSelectItem = styled(SelectItem)`
  /* Thêm custom styles nếu cần */
`;

export const StyledSelectValue = styled(SelectValue)`
  /* Thêm custom styles nếu cần */
`;

// Re-export types từ file types
export type { SelectProps } from './Select.type';