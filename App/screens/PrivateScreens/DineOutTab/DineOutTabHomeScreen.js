import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  Text,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MapView, { PROVIDER_GOOGLE, Callout } from 'react-native-maps'
import { images } from '../../../constants/images'
import { COLORS, FONTS, SIZES } from '../../../constants/theme'
import { standardMapStyles } from '../../../utils/mapStyles'
import { restoDummyData } from '../../../constants/dummyData'
import CalloutCard from './CalloutCard'
import TopChips from './TopChips'
import BottomCards from './BottomCards'

const { width } = Dimensions.get('window')

const CARD_WIDTH = width * 0.8
const SPACING_FOR_CARD_INSET = width * 0.1 - 10

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
  const _scrollView = useRef(null)

  let mapIndex = 0
  // eslint-disable-next-line prefer-const
  let mapAnimation = new Animated.Value(0)

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3) // animate 30% away from landing on the next item
      if (index >= state.restoDummyData.length) {
        index = state.restoDummyData.length - 1
      }
      if (index <= 0) {
        index = 0
      }

      // eslint-disable-next-line no-use-before-define
      clearTimeout(regionTimeout)

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          mapIndex = index
          const { coordinate } = state.restoDummyData[index]
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350,
          )
        }
      }, 10)
    })
  })
  const interpolations = state.restoDummyData.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ]

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    })

    return { scale }
  })

  const onMarkerPress = mapEventData => {
    const markerID = mapEventData._targetInst.return.index

    let x = markerID * CARD_WIDTH + markerID * 20
    if (Platform.OS === 'ios') {
      x -= SPACING_FOR_CARD_INSET
    }

    _scrollView.current.scrollTo({ x, y: 0, animated: true })
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        customMapStyle={standardMapStyles}
        provider={PROVIDER_GOOGLE}
        style={styles.container}
        initialRegion={state.region}
      >
        {state.restoDummyData.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          }
          return (
            <MapView.Marker
              key={marker.id}
              coordinate={marker.coordinate}
              onPress={e => onMarkerPress(e)}
            >
              <Callout tooltip>
                <CalloutCard marker={marker} />
              </Callout>

              <Animated.View style={[styles.marker_wrapper]}>
                <Text style={styles.marker_title}>{marker.title}</Text>
                <Animated.Image
                  source={images.mapMarker}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          )
        })}
      </MapView>

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
      <BottomCards
        data={state.restoDummyData}
        mapAnimation={mapAnimation}
        scrollViewRef={_scrollView}
      />
    </View>
  )
}

export default DineOutTabHomeScreen
