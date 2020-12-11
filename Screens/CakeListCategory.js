import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {CAKE_LIST} from '../CakeData';
import {THEME_COLORS} from './Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CakeListCategory = ({route, navigation}) => {
  const {itemId, itemTitle} = route.params;

  const [listData, setFilterData] = useState([]);

  navigation.setOptions({
    headerTitle: itemTitle,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getDataArray);

    return unsubscribe;
  }, [navigation]);

  const getDataArray = async () => {
    let filterArray = [];
    let filterData = await AsyncStorage.getItem('filter');
    filterData = filterData ? JSON.parse(filterData) : [];

    if (filterData.length) {
      if (filterData.includes(1)) {
        CAKE_LIST.map((item) => {
          if (item.calories < 200) {
            filterArray.push(item);
          }
        });
      }
      if (filterData.includes(2)) {
        CAKE_LIST.map((item) => {
          if (item.calories > 200 && item.calories < 400) {
            filterArray.push(item);
          }
        });
      }
      if (filterData.includes(3)) {
        CAKE_LIST.map((item) => {
          if (item.calories > 400) {
            filterArray.push(item);
          }
        });
      }
    } else {
      filterArray = CAKE_LIST;
    }
    setFilterData(filterArray.filter((item) => item.id == itemId));
  };

  return (
    <View style={styles.container}>
      <FlatList
        extraData={listData}
        // numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        ListEmptyComponent={
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              alignSelf: 'center',
            }}>
            {'No recipe found.'}
          </Text>
        }
        data={listData}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('CakeDetails', {Item: item})}
              style={styles.categoryContainer}>
              <Image
                style={{height: 250, width: '100%'}}
                source={{uri: item.image}}
              />
              <View
                style={{
                  backgroundColor: THEME_COLORS.categorycolor,
                  width: '100%',
                  padding: 5,
                }}>
                <Text style={[styles.title, {textAlign: 'center'}]}>
                  {item.name}
                </Text>
                <Text style={[styles.title, {textAlign: 'center'}]}>
                  {`Calorie: ${item.calories}`}
                </Text>
                <Text style={[styles.title, {textAlign: 'center'}]}>
                  {item.type + ' Mins'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: THEME_COLORS.background,
    flex: 1,
    padding: 10,
  },
  categoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginHorizontal: 8,
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: THEME_COLORS.background,
  },
};

export default CakeListCategory;
