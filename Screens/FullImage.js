import React from 'react';
import {View, Dimensions, Image, TouchableOpacity, Share} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

const FullImage = ({route, navigation}) => {
  const {itemImage} = route.params;

  const handleOnShare = async () => {
    try {
      const result = await Share.share({
        message: 'Please find image url for Cake Recipe',
        url: itemImage,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        alert('dismissed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  navigation.setOptions({
    headerRight: () => (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={handleOnShare} style={{right: 20}}>
          <Image
            style={{height: 30, width: 30}}
            source={require('../assets/share.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  });

  return (
    <ImageZoom
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
      enableCenterFocus
      useNativeDriver
      pinchToZoom
      enableDoubleClickZoom
      cropWidth={Dimensions.get('window').width}
      cropHeight={Dimensions.get('window').height}
      imageWidth={Dimensions.get('window').width}
      imageHeight={Dimensions.get('window').height}>
      <Image
        resizeMode={'contain'}
        style={{width: '100%', height: '100%'}}
        source={{uri: itemImage}}
      />
    </ImageZoom>
  );
};

export default FullImage;
