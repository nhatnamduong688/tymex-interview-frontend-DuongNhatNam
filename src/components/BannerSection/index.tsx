import React from 'react';
import styled from 'styled-components';

// Styled components for BannerSection
const BannerSectionContainer = styled.div`
    height: 720px;
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: #0e2a47;

    @media (max-width: ${props => props.theme.breakpoints.lg}) {
        height: 480px;
    }

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        height: 420px;
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        height: 220px;
    }
`;

const BannerSectionElement = styled.div`
    position: absolute;

    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        display: block;
    }
`;

const BackgroundImage = styled(BannerSectionElement)`
    inset: 0;
    z-index: 1;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const ItemNewArrival = styled(BannerSectionElement)`
    width: 980px;
    height: auto;
    top: 38%;
    transform: translateY(-50%);
    left: 10%;
    z-index: 2;

    @media (max-width: ${props => props.theme.breakpoints.lg}) {
        width: 580px;
        transform: translateY(-50%);
        left: 10%;
    }

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        width: 480px;
        transform: translateY(-50%);
        left: 5%;
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        width: 220px;
        transform: translateY(-50%);
        left: 5%;
    }
`;

const ListItemBannerSection = styled(BannerSectionElement)`
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    height: auto;
    position: absolute;
    z-index: 2;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        aspect-ratio: auto 100 / 100;
    }
`;

const CharacterItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0 10px;
`;

const CharacterBox = styled.div`
    width: 140px;
    height: 100px;
    border: 3px solid #000;
    margin-bottom: 10px;
`;

const AssassinBox = styled(CharacterBox)`
    background: linear-gradient(to bottom right, #ff9966, #ff5e62);
`;

const NeonGuyBox = styled(CharacterBox)`
    background: linear-gradient(to bottom right, #00b09b, #96c93d);
`;

const MafiaEnglandBox = styled(CharacterBox)`
    background: linear-gradient(to bottom right, #4facfe, #00f2fe);
`;

const BasketballGirlBox = styled(CharacterBox)`
    background: linear-gradient(to bottom right, #a770ef, #cf8bf3);
`;

const CharacterName = styled.p`
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    font-family: ${props => props.theme.fonts.heading};
    color: #333;
`;

const CharactersContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    max-width: 90%;
    margin: 0 auto;
`;

const ItemBannerSectionContainer = styled.div`
    position: absolute;
    width: 400px;
    height: 605px;
    bottom: 0;
    right: 40px;
    z-index: 3;

    @media (max-width: ${props => props.theme.breakpoints.lg}) {
        width: 288px;
    }

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        width: 188px;
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        width: 108px;
    }
`;

const ItemBannerSectionInner = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const ItemBannerSection = styled(BannerSectionElement)`
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    position: relative;
`;

const BgTextTheDJ = styled.div`
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    width: 100%;
    
    img {
        width: 100%;
        height: auto;
        display: block;
        object-fit: contain;
    }
`;

const TextTheDJContainer = styled.div`
    width: 228px;
    height: 44px;
    position: absolute;
    bottom: 75px;
    right: 120px;
    z-index: 3;

    @media (max-width: ${props => props.theme.breakpoints.lg}) {
        width: 140px;
        height: 24px;
        bottom: 60px;
        right: 100px;
    }

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        width: 98px;
        height: 24px;
        bottom: 35px;
        right: 60px;
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        width: 48px;
        height: 12px;
        bottom: 25px;
        right: 40px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const FiltersContainer = styled.div`
    width: 100%;
    position: absolute;
    bottom: -60px;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    z-index: 2;
`;

const FiltersButton = styled.button`
    background-color: transparent;
    color: white;
    border: 2px solid white;
    border-radius: 5px;
    padding: 12px 25px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const ConnectWalletButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background-image: ${props => props.theme.colors.primaryGradient};
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    z-index: 10;
`;

const MenuButton = styled.button`
    position: absolute;
    top: 20px;
    left: 20px;
    background: transparent;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    z-index: 10;
`;

// Component implementation
export const BannerSection = () => {
    return (
        <BannerSectionContainer>
            {/*<MenuButton>*/}
            {/*    ☰*/}
            {/*</MenuButton>*/}
            
            {/*<ConnectWalletButton>*/}
            {/*    Connect Wallet*/}
            {/*</ConnectWalletButton>*/}
            
            <BackgroundImage>
                <img
                    src="/assets/images/bg-banner-section.jpeg"
                    alt="bg-banner-section"
                    loading="lazy"
                />
            </BackgroundImage>
            
            <ItemNewArrival>
                <img
                    src="/assets/images/new_arrival.png"
                    alt="new_arrival"
                    loading="lazy"
                />
            </ItemNewArrival>
            
            <ListItemBannerSection>
                <img
                    src="/assets/images/list-item-banner-section.png"
                    alt="list-item-banner-section"
                    loading="lazy"
                />
            </ListItemBannerSection>
            
            <ItemBannerSectionContainer>
                <ItemBannerSectionInner>
                    <ItemBannerSection>
                        <img
                            src="/assets/images/item-banner-section.png"
                            alt="item-banner-section"
                            loading="lazy"
                        />
                    </ItemBannerSection>
                    <BgTextTheDJ>
                        <img
                            src="/assets/images/bg-text-the-DJ.png"
                            alt="bg-text-the-DJ"
                            loading="lazy"
                        />
                    </BgTextTheDJ>
                    <TextTheDJContainer>
                        <img
                            src="/assets/images/text-the-DJ.png"
                            alt="text-the-DJ"
                            loading="lazy"
                        />
                    </TextTheDJContainer>
                </ItemBannerSectionInner>
            </ItemBannerSectionContainer>

            <FiltersContainer>
                <FiltersButton>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.5 2H1.5C1.224 2 1 2.224 1 2.5V3.5C1 3.776 1.224 4 1.5 4H14.5C14.776 4 15 3.776 15 3.5V2.5C15 2.224 14.776 2 14.5 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.5 8H4.5C4.224 8 4 8.224 4 8.5V9.5C4 9.776 4.224 10 4.5 10H11.5C11.776 10 12 9.776 12 9.5V8.5C12 8.224 11.776 8 11.5 8Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.5 14H7.5C7.224 14 7 13.776 7 13.5V12.5C7 12.224 7.224 12 7.5 12H8.5C8.776 12 9 12.224 9 12.5V13.5C9 13.776 8.776 14 8.5 14Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Filters & Sort
                </FiltersButton>
            </FiltersContainer>
        </BannerSectionContainer>
    );
};