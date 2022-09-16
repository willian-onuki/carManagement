import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { Button, Center, Icon, Spinner, Stack, View } from 'native-base';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InputForm } from '../../components/Form/InputForm';
import { Loading } from '../../components/Loading';
import { RegisterScreamRouteProps } from '../../global/navigation';
import { apiService } from '../../services/api';
import {
  Text, TextButton
} from './styles';

interface Form {
  [index: string]: string | number;
}

const schema = yup.object().shape({
  title: yup.string().required('Preencha o campo Título').min(3, 'O nome precisa ter no mínimo 3 letras'),
  brand: yup.string().required('Preencha o campo Marca').min(3, 'O fabricante precisa ter no mínimo 3 letras'),
  price: yup.number().required('Preencha o campo Preço').typeError('Preencha somente com números').positive('O valor deve ser positivo'),
  age: yup.number().required('Preencha o campo Ano').typeError('Preencha somente com números').positive('O ano deve ser positivo'),
})

export function Register() {
  const navigation = useNavigation();
  const {params} = useRoute<RegisterScreamRouteProps>();
  const [loading, setLoading] = useState(false);
  const [loadingEditData, setLoadingEditData] = useState(false);
  const [loadingDeleteData, setLoadingDeleteData] = useState(false);
  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<Form>({
    resolver: yupResolver(schema)
  })

  const carId = params ? params.id : "";

  const type = params ? params.type : "";


  async function submit(data: Form) {
    setLoading(true);
    try {
      const body = {
        title: data.title,
        brand: data.brand,
        price: String(data.price),
        age: data.age
      }
      if (type === 'edit') {
        await apiService.put(`/cars/${carId}`, body);
      }
      else {
        await apiService.post('/cars', body);
      }

      navigation.dispatch(StackActions.replace('Success', {
        ... (type === 'edit' && { type: 'edit' }),
      }))

    } catch (error) {
      Alert.alert("Erro ao realizar essa operação")
      console.error(error);
    } finally {
      reset();
      setLoading(false);
    }
  }

  function alertDeleteCar() {
    Alert.alert(
      "Aviso",
      "Deseja realmente excluir esse cadastro?",
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: deleteCar,
        }
      ]
    )
  }

  async function deleteCar() {
    setLoadingDeleteData(true);
    try {
      await apiService.delete(`/cars/${carId}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao excluir o cadastro')
    } finally {
      setLoadingEditData(false)
      navigation.navigate('CarList');
    }
  }

  async function loadData() {
    setLoadingEditData(true);
    try {
      const { data } = await apiService.get(`/cars/${carId}`);
      setValue("title", data.title);
      setValue("brand", data.brand);
      setValue("price", data.price);
      setValue("age", String(data.age));

    } catch (error) {
      console.error(error);
    } finally {
      setLoadingEditData(false);
    }
  }

  useEffect(() => {
    if (carId) {
      navigation.setOptions({ title: 'Editar' })
      loadData();
    }
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {
        loadingEditData
          ? <Loading />
          : <View flex='1' bg='primary.background_primary'>
            <Center mt={10}>
              <Text>
                {type === 'edit'
                  ? "Para editar as informações do carro cadastrado, altere os campos preenchidos"
                  : "Preencha os campos a baixo para cadastrar um carro"
                }
              </Text>
            </Center>

            <Stack space={4} my={10} px={5}>
              <InputForm
                name="title"
                control={control}
                placeholder="Nome"
                errors={errors.title && errors.title.message}
              />
              <InputForm
                name="brand"
                control={control}
                placeholder="fabricante"
                errors={errors.brand && errors.brand.message}
              />
              <InputForm
                name="price"
                control={control}
                placeholder="Preço"
                errors={errors.price && errors.price.message}
                keyboardType="numeric"
              />
              <InputForm
                name="age"
                control={control}
                placeholder="Ano"
                errors={errors.age && errors.age.message}
                keyboardType="numeric"
              />

              <Button size="sm" colorScheme="danger" py={5} mt={10} borderRadius='lg' onPress={handleSubmit(submit)} rightIcon={!loading && <Icon as={MaterialCommunityIcons} name="send" size="md" ml={2} />}>
                {loading ? <Spinner color="muted.900" /> : <TextButton>{type === 'edit' ? 'Salvar' : 'Enviar'}</TextButton>}
              </Button>
              {
                type === 'edit' && <Button variant='outline' size="sm" borderColor="danger.500" colorScheme="danger" py={5} borderRadius='lg' onPress={alertDeleteCar} rightIcon={!loadingDeleteData && <Icon as={MaterialCommunityIcons} name="trash-can-outline" size="md" ml={2} /> }>
                  {loadingDeleteData ? <Spinner color="muted.900" /> : 'Excluir'}
                </Button>
              }
            </Stack>
          </View>
      }
    </TouchableWithoutFeedback>
  )
}
