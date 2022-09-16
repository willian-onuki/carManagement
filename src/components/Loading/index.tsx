import { Center, Spinner } from 'native-base';
import React from 'react';

export function Loading() {
  return (
    <Center flex="1">
      <Spinner size="lg" color="muted.900"/>
    </Center>
  )
}
