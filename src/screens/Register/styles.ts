import styled from 'styled-components/native';

export const TextButton = styled.Text`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.background_primary};
`;

export const TitleHeader = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background_primary};
  text-align: center;
`;

export const Text = styled.Text`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fonts.primary_500};
  text-align: center;
  max-width: 350px;
`;
