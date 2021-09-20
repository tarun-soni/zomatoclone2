import React, { useRef, useState } from 'react'
import { View, StyleSheet, Animated, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { images } from '../../../constants/images'
import { FONTS } from '../../../constants/theme'
import { standardMapStyles } from '../../../utils/mapStyles'
import { restoDummyData } from '../../../constants/dummyData'
import CalloutCard from './CalloutCard'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 120,
  },
  marker: {
    width: 30,
    height: 30,
  },

  // Character name
  name: {
    ...FONTS.h4,
    marginBottom: 5,
  },
})

const initialMapState = {
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
      <MapView
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

              <Animated.View style={[styles.markerWrap]}>
                <Text style={styles.name}>{marker.title}</Text>
                <Animated.Image
                  source={images.mapMarker}
                  style={[styles.marker]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          )
        })}
      </MapView>
    </View>
  )
}

export default DineOutTabHomeScreen
