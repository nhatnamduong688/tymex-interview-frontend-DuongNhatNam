import styled from 'styled-components';

// Styled components for BannerSection
export const BannerSectionContainer = styled.div`
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

export const BannerSectionElement = styled.div`
    position: absolute;

    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        display: block;
    }
`;

export const BackgroundImage = styled(BannerSectionElement)`
    inset: 0;
    z-index: 1;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const ItemNewArrival = styled(BannerSectionElement)`
    width: 980px;
    height: auto;
    top: 38%;
    transform: translateY(-50%);
    left: 5%;
    z-index: 2;
    
    @media (max-width: ${props => props.theme.breakpoints.lg}) {
        width: 640px;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        width: 480px;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        width: 260px;
    }
`;

export const ItemShoe = styled(BannerSectionElement)`
    width: 300px;
    height: auto;
    bottom: 65px;
    right: 7%;
    z-index: 3;
    transform: rotate(-5deg);
    
    @media (max-width: ${props => props.theme.breakpoints.lg}) {
        width: 220px;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        width: 180px;
        bottom: 45px;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        width: 120px;
        bottom: 10px;
    }
`;

export const ItemTrending = styled(BannerSectionElement)`
    width: 300px;
    height: auto;
    bottom: 20%;
    right: 15%;
    z-index: 2;
    
    @media (max-width: ${props => props.theme.breakpoints.lg}) {
        width: 220px;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        width: 180px;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        width: 120px;
    }
`;

export const ItemPopular = styled(BannerSectionElement)`
    width: 260px;
    height: auto;
    top: 10%;
    right: 10%;
    z-index: 2;
    
    @media (max-width: ${props => props.theme.breakpoints.lg}) {
        width: 200px;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        width: 160px;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        width: 100px;
    }
`;

export const ListItemBannerSection = styled(BannerSectionElement)`
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

export const CharacterItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0 10px;
`;

export const CharacterBox = styled.div`
    width: 140px;
    height: 100px;
    border: 3px solid #000;
    margin-bottom: 10px;
`;

export const AssassinBox = styled(CharacterBox)`
    background: linear-gradient(to bottom right, #ff9966, #ff5e62);
`;

export const NeonGuyBox = styled(CharacterBox)`
    background: linear-gradient(to bottom right, #00b09b, #96c93d);
`;

export const MafiaEnglandBox = styled(CharacterBox)`
    background: linear-gradient(to bottom right, #4facfe, #00f2fe);
`;

export const BasketballGirlBox = styled(CharacterBox)`
    background: linear-gradient(to bottom right, #a770ef, #cf8bf3);
`;

export const CharacterName = styled.p`
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    font-family: ${props => props.theme.fonts.heading};
    color: #333;
`;

export const CharactersContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    max-width: 90%;
    margin: 0 auto;
`;

export const ItemBannerSectionContainer = styled.div`
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
        width: 242px;
    }

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        width: 130px;
    }
`;

export const ItemBannerSectionInner = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const ItemBannerSection = styled(BannerSectionElement)`
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    position: relative;
`;

export const BgTextTheDJ = styled.div`
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

export const TextTheDJContainer = styled.div`
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

export const FiltersContainer = styled.div`
    width: 100%;
    position: absolute;
    bottom: -60px;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    z-index: 2;
`;

export const FiltersButton = styled.button`
    background-color: transparent;
    //color: white;
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

export const ConnectWalletButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background-image: ${props => props.theme.colors.primaryGradient};
    //color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    z-index: 10;
`;

export const MenuButton = styled.button`
    position: absolute;
    top: 20px;
    left: 20px;
    background: transparent;
    //color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    z-index: 10;
`; 