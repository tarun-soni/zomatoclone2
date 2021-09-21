import React, { useRef, useState } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  Text,
  TextInput,
  Platform,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { images } from '../../../constants/images'
import { COLORS, FONTS, SIZES } from '../../../constants/theme'
import { standardMapStyles } from '../../../utils/mapStyles'
import { restoDummyData } from '../../../constants/dummyData'
import CalloutCard from './CalloutCard'
import TopChips from './TopChips'
import BottomCards from './BottomCards'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker_wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 120,
  },
  marker: {
    width: 30,
    height: 30,
  },
  marker_title: {
    ...FONTS.body5,
    marginBottom: 5,
    lineHeight: 16,
  },

  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 50 : 30,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    width: '90%',
    alignSelf: 'center',
    borderRadius: SIZES.radius,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    ...FONTS.h4,
  },
})

const initialMapState = {
  categories: [
    {
      id: 1,
      name: 'Fastfood Center',
      icon: (
        <MaterialCommunityIcons
          style={{ marginRight: 10 }}
          name="food-fork-drink"
          size={18}
        />
      ),
    },
    {
      id: 2,

      name: 'Restaurant',
      icon: (
        <Ionicons name="ios-restaurant" style={{ marginRight: 10 }} size={18} />
      ),
    },
    {
      id: 3,
      name: 'Dineouts',
      icon: (
        <Ionicons name="md-restaurant" style={{ marginRight: 10 }} size={18} />
      ),
    },
    {
      id: 4,
      name: 'Snacks Corner',
      icon: (
        <MaterialCommunityIcons
          name="food"
          style={{ marginRight: 10 }}
          size={18}
        />
      ),
    },
    {
      id: 5,
      name: 'Hotel',
      icon: <Fontisto name="hotel" style={{ marginRight: 10 }} size={15} />,
    },
  ],
  restoDummyData,
  region: {
    latitude: 22.62938671242907,
    longitude: 88.4354486029795,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  },
}

const DineOutTabHomeScreen = () => {
  const [state] = useState(initialMapState)

  const _map = useRef(null)

  const onMarkerPress = () => {}

  return (
    <View style={styles.container}>
      {/* <MapView
        ref={_map}
        customMapStyle={standardMapStyles}
        provider={PROVIDER_GOOGLE}
        style={styles.container}
        initialRegion={state.region}
      >
        {state.restoDummyData.map(marker => {
          return (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              onPress={e => onMarkerPress(e)}
              pinColor="red"
            >
              <Callout tooltip>
                <CalloutCard marker={marker} />
              </Callout>

              <Animated.View style={[styles.marker_wrapper]}>
                <Text style={styles.marker_title}>{marker.title}</Text>
                <Animated.Image
                  source={images.mapMarker}
                  style={[styles.marker]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          )
        })}
      </MapView> */}

      {/* search box */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search ..."
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
        />
        <Ionicons name="ios-search" size={20} />
      </View>

      <TopChips data={state.categories} />
      <BottomCards data={state.restoDummyData} />
    </View>
  )
}

export default DineOutTabHomeScreen
