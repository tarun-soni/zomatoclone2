import React from 'react'
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { images } from '../../constants/images'
import { COLORS, FONTS, SIZES } from '../../constants/theme'
import BasicButton from '../../components/BasicButton'

import { LOGINSCREEN } from '../../constants/screens'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  header_container: {
    height: SIZES.height > 700 ? '65%' : '60%',
  },
  img_bg: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradient: {
    height: 200,
    justifyContent: 'flex-end',
    paddingHorizontal: SIZES.padding,
  },
  header_text: {
    width: '80%',
    color: COLORS.white,
    lineHeight: 45,
    ...FONTS.largeTitle,
  },
  details_container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  details_text: {
    marginTop: SIZES.radius,
    width: '70%',
    color: COLORS.gray,
    ...FONTS.body3,
  },
})

const PublicHomeScreen = ({ navigation }) => {
  function renderHeader() {
    return (
      <View style={styles.header_container}>
        <ImageBackground
          source={images.loginBackground}
          style={styles.img_bg}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[COLORS.transparent, COLORS.black]}
            style={styles.gradient}
          >
            <Text style={styles.header_text}>
              Cooking Delicious Food Easily
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    )
  }

  function renderDetails() {
    return (
      <View style={styles.details_container}>
        <Text style={styles.details_text}>
          Discover food restos & more than 1200 recipes in your hands!
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {renderHeader()}
      {renderDetails()}
      {/* buttons */}
      <View style={{ borderWidth: 2, borderColor: 'red' }}>
        <BasicButton
          propColors={[COLORS.darkGreen, COLORS.lime]}
          text="LOGIN"
          onPress={() => navigation.replace(LOGINSCREEN)}
        />
        <BasicButton
          propColors={[COLORS.blue, COLORS.darkGreen]}
          text="SIGNUP"
          onPress={() => navigation.navigate(LOGINSCREEN)}
        />
      </View>
      <Text style={{ color: 'white' }}>hi</Text>
    </View>
  )
}

export default PublicHomeScreen
