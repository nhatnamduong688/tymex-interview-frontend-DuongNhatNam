import React, { memo, ElementType } from "react";
import { Slot } from "@radix-ui/react-slot";
import { WithAnimationProps } from "@/hocs/type";
import { withTextAnimation } from "@/hocs/withTextAnimation";
import { TextProps, StyledText } from "./Text.styles";

const Text = memo(
    ({
         children,
         className,
         variant = "body",
         color = "primary",
         cursor = "none",
         style = "none",
         asChild = false,
         tag = "p",
         href,
         ...restProps
     }: WithAnimationProps<TextProps>) => {
        // Chọn component hiển thị - Slot hoặc tag được chỉ định
        const Component = asChild ? Slot : StyledText;

        return (
            <Component
                as={asChild ? undefined : (tag as ElementType)}
                variant={variant}
                color={color}
                cursor={cursor}
                style={style}
                className={className}
                href={href}
                {...restProps}
            >
                {children}
            </Component>
        );
    }
);

const TextWithAnimation = withTextAnimation(Text);

export default TextWithAnimation;