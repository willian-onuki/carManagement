import React from 'react';
import { Input, Stack, Text } from 'native-base';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import theme from '../../../global/theme';

interface Props extends TextInputProps {
  name: string;
  control: Control;
  errors?: string;
}


export function InputForm({
  name,
  control,
  errors,
  ...rest
}: Props) {
  return (
    <Stack>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) =>
          <Input
            variant="unstyled"
            size='xl'
            placeholderTextColor="muted.500"
            onChangeText={onChange}
            value={value}
            style={{
              borderWidth: 1,
              borderColor: theme.colors.shape_dark,
              borderRadius: 6
            }}
            {...rest}
          />
        }
      />
      {errors && <Text color="red.500">{errors}</Text>}
    </Stack>
  )
}
