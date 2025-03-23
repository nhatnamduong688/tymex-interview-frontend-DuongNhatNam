import React from 'react';
import {
    BannerSectionContainer,
    BannerSectionElement,
    BackgroundImage,
    ItemNewArrival,
    ItemShoe,
    ItemTrending,
    ItemPopular,
    ListItemBannerSection,
    CharacterItem,
    CharacterBox,
    AssassinBox,
    NeonGuyBox,
    MafiaEnglandBox,
    BasketballGirlBox,
    CharacterName,
    CharactersContainer,
    ItemBannerSectionContainer,
    ItemBannerSectionInner,
    ItemBannerSection,
    BgTextTheDJ,
    TextTheDJContainer,
    FiltersContainer,
    FiltersButton,
    ConnectWalletButton,
    MenuButton
} from './styles';

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

            {/*<FiltersContainer>*/}
            {/*    <FiltersButton>*/}
            {/*        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
            {/*            <path d="M14.5 2H1.5C1.224 2 1 2.224 1 2.5V3.5C1 3.776 1.224 4 1.5 4H14.5C14.776 4 15 3.776 15 3.5V2.5C15 2.224 14.776 2 14.5 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>*/}
            {/*            <path d="M11.5 8H4.5C4.224 8 4 8.224 4 8.5V9.5C4 9.776 4.224 10 4.5 10H11.5C11.776 10 12 9.776 12 9.5V8.5C12 8.224 11.776 8 11.5 8Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>*/}
            {/*            <path d="M8.5 14H7.5C7.224 14 7 13.776 7 13.5V12.5C7 12.224 7.224 12 7.5 12H8.5C8.776 12 9 12.224 9 12.5V13.5C9 13.776 8.776 14 8.5 14Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>*/}
            {/*        </svg>*/}
            {/*        Filters & Sort*/}
            {/*    </FiltersButton>*/}
            {/*</FiltersContainer>*/}
        </BannerSectionContainer>
    );
};