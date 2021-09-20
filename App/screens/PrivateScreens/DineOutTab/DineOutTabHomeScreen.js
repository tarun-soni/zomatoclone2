import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps' // remove PROVIDER_GOOGLE import if not using Google Maps
import { images } from '../../../constants/images'
import { FONTS, SIZES } from '../../../constants/theme'
import { standardMapStyles } from '../../../utils/mapStyles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '100%',
  },
  // Callout bubble
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: SIZES.radius,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    ...FONTS.h4,
    marginBottom: 5,
  },
  // Character image
  callout_image: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
  },
})

const DineOutTabHomeScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        customMapStyle={standardMapStyles}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          image={images.mapMarker}
          title="test title"
          description="test desc"
        >
          <Callout tooltip>
            <View>
              <View style={styles.bubble}>
                <Text style={styles.name}>Favourite Restaurant</Text>
                {/* <Text>A short description</Text> */}
                <Image style={styles.callout_image} source={images.spagetti} />
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  )
}

export default DineOutTabHomeScreen
