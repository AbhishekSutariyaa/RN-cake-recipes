import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Switch,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import {THEME_COLORS} from './Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CAKE_LIST} from '../CakeData';

const FilterScreen = ({navigation}) => {
  const [isFirst, setFirstFilter] = useState(false);
  const [isSecond, setSecondFilter] = useState(false);
  const [isThird, setThirdFilter] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getDataArray);

    return unsubscribe;
  }, [navigation]);

  const getDataArray = async () => {
    let filterData = await AsyncStorage.getItem('filter');
    filterData = filterData ? JSON.parse(filterData) : [];
    // console.log('====JSON.parse(jsonValue)==', filterData);

    if (filterData.length) {
      if (filterData.includes(1)) setFirstFilter(true);
      if (filterData.includes(2)) setSecondFilter(true);
      if (filterData.includes(3)) setThirdFilter(true);
    }
  };

  const onSave = async () => {
    try {
      let data = [];
      if (isFirst) {
        data.push(1);
      }
      if (isSecond) {
        data.push(2);
      }
      if (isThird) {
        data.push(3);
      }
      data = JSON.stringify(data);
      await AsyncStorage.setItem('filter', data);
    } catch (e) {
      console.log('e----->>>>', e);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.switchContainer}>
        <View style={{flex: 0.7}}>
          <Text style={{fontSize: 16}}>{'Calories between 0- 200'}</Text>
        </View>
        {/* <View style={{flex: 0.3}}> */}
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isFirst ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(newValue) => {
            setFirstFilter(newValue);
          }}
          value={isFirst}
        />
        {/* </View> */}
      </View>
      <View style={styles.switchContainer}>
        <View style={{flex: 0.7}}>
          <Text style={{fontSize: 16}}>{'Calories between 200 - 400'}</Text>
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isSecond ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(newValue) => {
            setSecondFilter(newValue);
          }}
          value={isSecond}
        />
      </View>
      <View style={styles.switchContainer}>
        <View style={{flex: 0.7}}>
          <Text style={{fontSize: 16}}>{'Calories are > 400'}</Text>
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isThird ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(newValue) => {
            setThirdFilter(newValue);
          }}
          value={isThird}
        />
      </View>
      <TouchableOpacity
        style={{
          borderWidth: 2,
          alignSelf: 'center',
          padding: 10,
          marginTop: 10,
          borderColor: THEME_COLORS.categorycolor,
        }}
        onPress={() => onSave()}>
        <Text style={{color: THEME_COLORS.categorycolor, fontWeight: 'bold'}}>
          {'SAVE'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  textContainer: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    margin: 20,
  },
};

export default FilterScreen;
