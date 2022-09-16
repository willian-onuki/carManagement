import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';

export const Header = styled.View`
  width: 100%;
  margin: 40px 0 40px 0;
  align-items: center;
`;

export const Content = styled.View`
  align-items: center;
`;

export const Icon = styled(FontAwesome)`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.success};
  `

export const ImageWrapper = styled.View`
  align-items: center;
  border-width: 6px;
  border-color: ${({ theme }) => theme.colors.shape_dark};
  border-radius: 5px;
  padding: 15px 10px;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: ${({ theme }) => theme.fonts.primary_600};
  color: ${({ theme }) => theme.colors.background_secondary};

`;

export const SubTitle = styled.Text`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.background_primary};
  margin-top: 16px;
`;

export const TextWrapper = styled.View`
  text-align: center;
  align-items: center;
  margin: 40px 0;
`;

export const Button = styled.TouchableOpacity`
    background: ${({ theme }) => theme.colors.shape_dark};
    align-items: center;
    width: 20%;
    margin-top: 40px;
`;

export const TextButton = styled.Text`
    font-size: 15px;
    text-align: center;
    padding: 20px 25px;
    font-weight: ${({ theme }) => theme.fonts.primary_600};
    color: ${({ theme }) => theme.colors.background_primary};
`;
