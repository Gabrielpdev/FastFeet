import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';

import Deliveries from './pages/Deliveries';
import Profile from './pages/Profile';

import Detail from '~/pages/New/Detail';
import Confirm from '~/pages/New/Confirm';
import NewProblem from '~/pages/New/NewProblem';
import ListProblem from '~/pages/New/ListProblem';
import ViewProblem from '~/pages/New/ViewProblem';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Deliveries: {
              screen: createStackNavigator(
                {
                  Deliveries,
                  Detail,
                  Confirm,
                  NewProblem,
                  ListProblem,
                  ViewProblem,
                },
                {
                  defaultNavigationOptions: ({ navigation }) => ({
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      marginLeft: 15,
                      paddingTop: 10,
                    },
                    headerTitleStyle: {
                      paddingTop: 10,
                    },
                  }),
                }
              ),
              navigationOptions: () => ({
                tabBarLabel: 'Entregas',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="dehaze" size={20} color={tintColor} />
                ),
              }),
            },
            Profile,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255, 255, 255, 0.5)',
              style: {
                borderTopColor: '#640903',
                backgroundColor: '#640903',
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
