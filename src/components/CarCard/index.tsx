import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { CarListNavigationProps } from '../../global/navigation';
import {
  Container,
  DataSheet,
  Amount,
  TextAmount,
  Brand,
  Title,
  Age
} from './styles'

export interface CarData {
  id: string;
  title: string;
  brand: string;
  price: string;
  age: number;
}

interface Props {
  data: CarData;
}

export function CarCard({ data }: Props) {
  const navigation = useNavigation<CarListNavigationProps>();
  const amount = data.price.toString().replace('.', '').replace(',', '').replace('$', '').replace('R', '');
  const amountFormatted = Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(Number(amount))

  function goToEdit() {
    navigation.navigate('Register', {
      type: 'edit',
      id: data['_id'],
    });
  }

  return (
    <Container onPress={goToEdit}>
      <DataSheet>
        <Brand>{data.brand}</Brand>
        <Title>{data.title}</Title>
        <Age>Ano: {data.age}</Age>
      </DataSheet>
      <Amount>
        <TextAmount>{amountFormatted}</TextAmount>
      </Amount>
    </Container>
  )
}
