import React from 'react';
import Text from "@/components/Text/Text";
import {
    SliderContainer,
    StyledSlider,
    LabelContainer,
    SliderProps
} from './Slider.styles';

const Slider = ({
                    title = "",
                    maxTitle = "",
                    minTitle = "",
                    className,
                    onChange,
                    ...props
                }: SliderProps) => {
    return (
        <SliderContainer className={className}>
            {title && (
                <Text tag="label" variant="header">
                    {title}
                </Text>
            )}

            <StyledSlider
                tooltip={{
                    formatter: value => `${value} ETH`,
                }}
                onChange={onChange}
                {...props}
            />

            {maxTitle && minTitle && (
                <LabelContainer>
                    <Text variant="header-medium" color="light-gray">
                        {minTitle}
                    </Text>
                    <Text variant="header-medium" color="light-gray">
                        {maxTitle}
                    </Text>
                </LabelContainer>
            )}
        </SliderContainer>
    );
};

export default Slider;