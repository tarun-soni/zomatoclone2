import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native'
import StarRating from '../../../../components/StarRating'
import { COLORS, FONTS } from '../../../../constants/theme'

const { width } = Dimensions.get('window')

const CARD_HEIGHT = 220
const CARD_WIDTH = width * 0.8
const SPACING_FOR_CARD_INSET = width * 0.1 - 10

const styles = StyleSheet.create({
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    padding: 12,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  card_title: { ...FONTS.h3, fontWeight: 'bold' },
  card_desctiption: { ...FONTS.body3, color: COLORS.gray },
  card_image: {
    flex: 2,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textSign: { ...FONTS.h3, fontWeight: 'bold' },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  text_content: {
    flex: 2,
    padding: 10,
  },
})

const BottomCards = ({ data, mapAnimation, scrollViewRef }) => {
  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      horizontal
      decelerationRate="fast"
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + 20}
      snapToAlignment="center"
      style={styles.scrollView}
      contentInset={{
        top: 0,
        left: SPACING_FOR_CARD_INSET,
        bottom: 0,
        right: SPACING_FOR_CARD_INSET,
      }}
      contentContainerStyle={{
        paddingHorizontal:
          Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
      }}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x: mapAnimation,
              },
            },
          },
        ],
        { useNativeDriver: true },
      )}
    >
      {data.map(marker => (
        <View style={styles.card} key={marker.id}>
          <Image
            source={marker.image}
            style={styles.card_image}
            resizeMode="cover"
          />

          <View style={styles.text_content}>
            <Text numberOfLines={1} style={styles.card_title}>
              {marker.title}
            </Text>
            <StarRating ratings={marker.rating} reviews={marker.reviews} />
            <Text numberOfLines={1} style={styles.card_desctiption}>
              {marker.description}
            </Text>

            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => {}}
                style={[
                  styles.signIn,
                  {
                    borderColor: COLORS.zomatoLogoRed,
                    borderWidth: 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: COLORS.zomatoLogoRed,
                    },
                  ]}
                >
                  Order Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </Animated.ScrollView>
  )
}

export default BottomCards
