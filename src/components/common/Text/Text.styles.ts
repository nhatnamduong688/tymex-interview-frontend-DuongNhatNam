import { PropsWithChildren, ElementType, CSSProperties } from "react";
import styled, { css } from "styled-components";

// Định nghĩa các type cần thiết
export type TextVariant =
    | "header"
    | "header-medium"
    | "caption"
    | "body"
    | "title-lg"
    | "title-xl"
    | "title-sm"
    | "title-7xl";

export type TextColor =
    | "primary"
    | "secondary"
    | "shadow-gray"
    | "light-gray"
    | "gradient";

export type TextStyle = "none" | "underline";
export type TextCursor = "pointer" | "style" | "none";

// Theme object cho Text
export const textTheme = {
    colors: {
        primary: "#FFFFFF",
        secondary: "#A1A1AA", // Điều chỉnh giá trị thực tế
        "shadow-gray": "#D1D5DB", // Điều chỉnh giá trị thực tế
        "light-gray": "#E5E7EB", // Điều chỉnh giá trị thực tế
        gradient: {
            from: "#FF00FF", // cyber-magenta
            to: "#BB4BFF"    // neon-purple
        }
    },
    fonts: {
        default: "inherit",
        drone: "'Drone', sans-serif" // Điều chỉnh font thực tế
    }
};

// CSS helpers cho mỗi variant
export const textVariantStyles = {
    variant: {
        header: css`
      font-size: 0.875rem;
      line-height: 1.5rem;
      font-weight: 600;
      
      @media (min-width: 1024px) {
        font-size: 1rem;
      }
    `,
        "header-medium": css`
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 500;
    `,
        caption: css`
      font-size: 0.75rem;
      line-height: 1.25rem;
      font-weight: 500;
    `,
        body: css`
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 500;
    `,
        "title-lg": css`
      font-family: ${textTheme.fonts.drone};
      font-size: 1rem;
      line-height: 1.75rem;
      font-weight: 700;
      
      @media (min-width: 1024px) {
        font-size: 1.125rem;
      }
    `,
        "title-xl": css`
      font-family: ${textTheme.fonts.drone};
      font-size: 1.25rem;
      line-height: 2rem;
      font-weight: 700;
    `,
        "title-sm": css`
      font-family: ${textTheme.fonts.drone};
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 700;
    `,
        "title-7xl": css`
      font-family: ${textTheme.fonts.drone};
      font-size: 1.25rem;
      line-height: 5.5rem;
      font-weight: 700;
      
      @media (min-width: 640px) {
        font-size: 1.875rem;
      }
      
      @media (min-width: 1024px) {
        font-size: 2.25rem;
      }
      
      @media (min-width: 1280px) {
        font-size: 4.5rem;
      }
    `,
    },
    color: {
        primary: css`
      color: ${textTheme.colors.primary};
    `,
        secondary: css`
      color: ${textTheme.colors.secondary};
    `,
        "shadow-gray": css`
      color: ${textTheme.colors["shadow-gray"]};
    `,
        "light-gray": css`
      color: ${textTheme.colors["light-gray"]};
    `,
        gradient: css`
      background: linear-gradient(to right, ${textTheme.colors.gradient.from}, ${textTheme.colors.gradient.to});
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    `,
    },
    style: {
        none: css``,
        underline: css`
      position: relative;
      
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0.25rem;
        display: block;
        height: 0.125rem;
        width: 1rem;
        background: linear-gradient(to right, ${textTheme.colors.gradient.from}, ${textTheme.colors.gradient.to});
      }
    `,
    },
    cursor: {
        pointer: css`
      cursor: pointer;
    `,
        style: css``,
        none: css``,
    },
};

// Props interface cho Text component
export interface TextProps extends PropsWithChildren {
    variant?: TextVariant;
    color?: TextColor;
    style?: TextStyle;
    cursor?: TextCursor;
    className?: string;
    asChild?: boolean;
    tag?: string;
    href?: string;
}

// Utility function để lấy tất cả styles
export const getTextStyles = ({
                                  variant = "body",
                                  color = "primary",
                                  style = "none",
                                  cursor = "none",
                              }: {
    variant?: TextVariant;
    color?: TextColor;
    style?: TextStyle;
    cursor?: TextCursor;
}) => css`
  position: relative;
  
  /* Apply variant styles */
  ${textVariantStyles.variant[variant]}
  
  /* Apply color styles */
  ${textVariantStyles.color[color]}
  
  /* Apply text style */
  ${textVariantStyles.style[style]}
  
  /* Apply cursor style */
  ${textVariantStyles.cursor[cursor]}
`;

// Styled component tổng quát
export const StyledText = styled.p<TextProps>`
  ${props => getTextStyles({
    variant: props.variant,
    color: props.color,
    style: props.style,
    cursor: props.cursor
})}
`;