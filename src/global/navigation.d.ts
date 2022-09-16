import type {
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import type { StackScreenProps, NativeStackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  CarList: undefined;
  Register: {
    id?: string,
    type?: string,
  };
  Success: {
    type?: string,
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type CarListNavigationProps = NativeStackNavigationProp<RootStackParamList<'Register'>>
export type RegisterScreamRouteProps = RouteProp<RootStackParamList, 'Register'>

export type RegisterNavigationProps = NativeStackNavigationProp<RootStackParamList<'Success'>>
export type SuccessScreamRouteProps = RouteProp<RootStackParamList, 'Success'>


declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
