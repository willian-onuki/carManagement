import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.background_secondary};
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  margin: 16px;
`;

export const DataSheet = styled.View`
  flex-direction: column;
`

export const Amount = styled.View`
  align-items: center;
  justify-content: center;
`

export const TextAmount = styled.Text`
  align-items: center;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.main};
  font-weight: ${({ theme }) => theme.fonts.primary_500};
`;

export const Title = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: ${({ theme }) => theme.fonts.primary_500};
`;

export const Brand = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text_detail};
  font-weight: ${({ theme }) => theme.fonts.primary_500};
`;

export const Age = styled.Text`
  margin-top: 16px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text_detail};
  font-weight: ${({ theme }) => theme.fonts.primary_500};
`;
