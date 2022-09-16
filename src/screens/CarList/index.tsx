import React, { useCallback, useEffect, useState } from 'react';
import { Button, Center, Fab, Icon, Image, Input, View, } from 'native-base';
import { EmptyText, EmptyIcon } from './styles'
import { FlatList } from 'react-native';
import { apiService } from '../../services/api';
import { CarCard, CarData } from '../../components/CarCard';
import { Loading } from '../../components/Loading';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/build/AntDesign';
import theme from '../../global/theme';


export function CarList() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState<CarData[]>([])
  const [text, setText] = useState("");

  async function loadData() {
    setLoading(true);
    try {
      const { data } = await apiService.get('/cars');
      setCars(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function search(text: string) {
    return cars
      .filter((car: CarData) =>
        car.title.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        || car.brand.toLocaleLowerCase().includes(text.toLocaleLowerCase())
      )
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
        renderItem={({ item }) => <CarCard key={item.id} data={item} />}
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
