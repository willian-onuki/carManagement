import AntDesign from '@expo/vector-icons/build/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, Center, Fab, Icon, Input, View } from 'native-base';
import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { Loading } from '../../components/Loading';
import { CarListNavigationProps } from '../../global/navigation';
import theme from '../../global/theme';
import { apiService } from '../../services/api';
import { adjustCurrency } from '../../utils/adjustCurrency';
import { Age, Amount, Brand, ButtonCard, DataSheet, EmptyIcon, EmptyText, TextAmount, Title } from './styles';

interface CarData {
  id: string;
  title: string;
  brand: string;
  price: string;
  age: number;
}

export function CarList() {
  const navigation = useNavigation<CarListNavigationProps>()
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState<CarData[]>([])
  const [text, setText] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await apiService.get('/cars');
      setCars(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  },[])

  function search(text: string) {
    return cars
      .filter((car: CarData) =>
        car.title.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        || car.brand.toLocaleLowerCase().includes(text.toLocaleLowerCase())
      )
  }

  function goToEdit(id: string) {
    navigation.navigate('Register', {
      type: 'edit',
      id,
    });
  }

  const carsFilteredByTitle = text ? search(text) : cars

  useFocusEffect(useCallback(() => {
    loadData();
  }, []))

  return (
    <View flex='1' bg='primary.background_primary'>
      <Center my={4}>
        <Input
          value={text}
          variant="filled"
          bgColor={theme.colors.shape}
          _focus={{
            borderColor: theme.colors.header,
          }}
          placeholder="Pesquise aqui o seu carro"
          w="92%"
          size="md"
          alignItems='center'
          onChangeText={(text) => setText(text.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2"))}
          InputLeftElement={<Icon as={AntDesign} name="search1" size="md" ml={2} />}
          InputRightElement={<Button variant='unstyled' onPress={() => setText("")}><Icon as={AntDesign} name="close" size="md" /></Button>}
        />
      </Center>
      <FlatList
        data={carsFilteredByTitle}
        keyExtractor={item => item["_id"]}
        renderItem={({ item }) =>
          <ButtonCard onPress={() => goToEdit(item["_id"])}>
            <DataSheet>
              <Brand>{item.brand}</Brand>
              <Title>{item.title}</Title>
              <Age>Ano: {item.age}</Age>
            </DataSheet>
            <Amount>
              <TextAmount>{adjustCurrency(item.price)}</TextAmount>
            </Amount>
          </ButtonCard>
        }
        ListEmptyComponent={() => {
          if (loading) {
            return <Loading />
          }
          return (
            <Center flex='1'>
              <EmptyIcon name="text-search" />
              <EmptyText>Automóvel não encontrado</EmptyText>
            </Center>
          )
        }}
      />
      <Fab renderInPortal={false} shadow={2} colorScheme="danger" icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} onPress={() => navigation.navigate('Register')} />
    </View>
  )
}
