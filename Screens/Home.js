import React from 'react';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import CakeCategory from './CakeCategory';
import CakeListCategory from './CakeListCategory';
import SaveCake from './SaveCake';
import CakeDetails from './CakeDetails';
import {THEME_COLORS} from './Theme';
import FilterScreen from './FilterScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// const CustomDrawer = ({navigation}) => {
//   return (
//     <View>
//       <TouchableOpacity style={{}}>
//         <Text style={{textAlign: 'center'}}>{'Category'}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

const Home = ({params}) => {
  return (
    <Drawer.Navigator
      initialRouteName="CakeCategory"
      // drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="CakeCategory"
        component={CategoryRoute}
        options={{
          title: 'Category',
          drawerLabel: ({focused, color}) => (
            <Text
              style={{color: focused ? THEME_COLORS.categorycolor : 'black'}}>
              {'Category'}
            </Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../assets/menu.png')}
              style={[
                focused
                  ? {
                      height: 30,
                      width: 30,
                      tintColor: THEME_COLORS.categorycolor,
                    }
                  : {height: 20, width: 20},
              ]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="SaveCake"
        component={CartRoute}
        options={{
          title: 'Save Cake Recipe',
          drawerLabel: ({focused, color}) => (
            <Text
              style={{color: focused ? THEME_COLORS.categorycolor : 'black'}}>
              {'Save Cake Recipe'}
            </Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../assets/save-file-option.png')}
              style={[
                focused ? {height: 30, width: 30} : {height: 20, width: 20},
              ]}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="FilterScreen"
        component={FilterRoute}
        options={{
          title: 'Filter',
          drawerLabel: ({focused, color}) => (
            <Text
              style={{color: focused ? THEME_COLORS.categorycolor : 'black'}}>
              {'Filter'}
            </Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../assets/filter.png')}
              style={[
                focused ? {height: 30, width: 30} : {height: 20, width: 20},
              ]}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const CategoryRoute = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CakeCategory"
        component={CakeCategory}
        options={{
          headerTitle: 'Category',
          headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
          headerLeft: () => (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}
              onPress={() => props.navigation.openDrawer()}>
              <Image
                style={{height: 25, width: 25}}
                source={require('../assets/drawerMenu.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="CakeListCategory" component={CakeListCategory} />
      <Stack.Screen name="CakeDetails" component={CakeDetails} />
    </Stack.Navigator>
  );
};

const CartRoute = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SaveCake"
        component={SaveCake}
        options={{
          headerTitle: 'Save Cake Recipe',
          headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
          headerLeft: () => (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}
              onPress={() => props.navigation.openDrawer()}>
              <Image
                style={{height: 25, width: 25}}
                source={require('../assets/drawerMenu.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="CakeDetails"
        component={CakeDetails}
        // options={{headerTitle: 'Full Image'}}
      />
    </Stack.Navigator>
  );
};

const FilterRoute = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{
          headerTitle: 'Filter',
          headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
          headerLeft: () => (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}
              onPress={() => props.navigation.openDrawer()}>
              <Image
                style={{height: 25, width: 25}}
                source={require('../assets/drawerMenu.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="CakeDetails"
        component={CakeDetails}
        // options={{headerTitle: 'Full Image'}}
      />
    </Stack.Navigator>
  );
};

export default Home;
