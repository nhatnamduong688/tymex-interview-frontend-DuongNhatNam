import styled from 'styled-components';

export const HomePageContainer = styled.div`
  padding: 100px 20px 40px;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  font-size: 36px;
  margin-bottom: 30px;
  text-align: center;
  
  span {
    ${props => props.theme.mixins.gradientText}
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

export const Card = styled.div`
  background: rgba(15, 16, 41, 0.8);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
`;

export const CardContent = styled.div`
  padding: 15px;
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const CardPrice = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: ${props => props.theme.colors.primaryAccent};
`; 