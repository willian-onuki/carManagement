import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components/native'

export const EmptyIcon = styled(MaterialCommunityIcons)`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.header};
`;

export const EmptyText = styled.Text`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fonts.primary_600};
  color: ${({ theme }) => theme.colors.title};
  max-width: 300px;
  margin-top: 40px;
`;
