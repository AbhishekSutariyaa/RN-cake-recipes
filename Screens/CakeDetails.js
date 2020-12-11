import React, {useEffect, useState} from 'react';
import {Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import {CAKE_LIST} from '../CakeData';
import {THEME_COLORS} from './Theme';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CakeDetails = ({route, navigation}) => {
  const {Item} = route.params;
  const [favData, setData] = useState([]);

  navigation.setOptions({
    headerTitle: Item.name,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', isDataFav);

    return unsubscribe;
  }, [navigation]);

  const isDataFav = async () => {
    let jsonArray = await AsyncStorage.getItem('favData');
    jsonArray = jsonArray ? JSON.parse(jsonArray) : [];
    let checkItem = jsonArray.filter((item) => item.name == Item.name);
    // console.log('dataArray--', checkItem);
    setData(checkItem);
  };

  const handleDownload = async () => {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
    })
      .fetch('GET', Item.image)
      .then((res) => {
        CameraRoll.save(res.data, 'photo')
          .then((res) => {
            // console.log('res---->>', res);
            alert('Save Image Successfully');
          })
          .catch((err) => console.log('err--->>', err));
      })
      .catch((error) => console.log('error---------', error));
  };

  const addToFav = async (data) => {
    try {
      // AsyncStorage.clear()
      let jsonArray = await AsyncStorage.getItem('favData');
      jsonArray = jsonArray ? JSON.parse(jsonArray) : [];
      // console.log('jsonArray--', jsonArray);
      jsonArray.push(data);
      const jsonValue = JSON.stringify(jsonArray);
      await AsyncStorage.setItem('favData', jsonValue).then((i) =>
        console.log('response---->', i),
      );
      isDataFav();
    } catch (e) {
      console.log('e----->>>>', e);
    }
  };

  const removeFromFav = async (data) => {
    try {
      // AsyncStorage.clear()
      let jsonArray = await AsyncStorage.getItem('favData');
      // console.log('RemoveJson---->>>>>>>>', jsonArray);
      jsonArray = jsonArray ? JSON.parse(jsonArray) : [];
      // console.log('RemoveJsonArray--', jsonArray);
      let filterArray = jsonArray.filter((i) => i.name !== data.name);
      const jsonValue = JSON.stringify(filterArray);
      await AsyncStorage.setItem('favData', jsonValue);
      isDataFav();
    } catch (e) {
      console.log('e----->>>>', e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('FullImage', {itemImage: Item.image});
        }}>
        <Image
          style={styles.mobileImage}
          source={{url: Item.image}}
          resizeMode="stretch"
        />
      </TouchableOpacity>
      <View style={{justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            !favData.length ? addToFav(Item) : removeFromFav(Item);
            // !isDataInCart ? addItemToCart(data) : removeItemFromCart(data)
          }}>
          <Text style={styles.buttonText}>
            {/* {!isDataInCart ? 'Add to Favorite' : 'Remove from Favorite'} */}
            {!favData.length ? 'Add To Save' : 'Remove From Save'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonContainer, {margin: 10}]}
          onPress={handleDownload}>
          <Text
            style={{
              textAlign: 'center',
              color: THEME_COLORS.background,
              fontWeight: 'bold',
            }}>
            {'Download Image'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
        {Item.name}
      </Text>
      <View style={styles.textDuration}>
        <Text>
          Recipe Duration:
          <Text style={{fontWeight: 'bold'}}>{Item.type + ' Mins'}</Text>
        </Text>
        <Text>
          Calories: <Text style={{fontWeight: 'bold'}}>{Item.calories}</Text>
        </Text>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={Item.des}
        renderItem={({item, index}) => {
          return (
            <View style={styles.detailItemcontainer}>
              <Text style={{fontSize: 16}}>{item}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
    padding: 10,
  },
  mobileImage: {width: '100%', height: 260},
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  detailItemcontainer: {
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  textDuration: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    margin: 10,
  },
  buttonContainer: {
    borderWidth: 1,
    marginVertical: 10,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: THEME_COLORS.categorycolor,
    borderRadius: 12,
  },
  buttonText: {
    textAlign: 'center',
    color: THEME_COLORS.background,
    fontWeight: 'bold',
  },
};
export default CakeDetails;
