/* eslint-disable no-else-return */
import React from 'react'
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { COLORS, FONTS, SIZES } from '../../../../constants/theme'

const styles = StyleSheet.create({
  recipe_card_container: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 100,
    paddingVertical: SIZES.radius,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius,
  },
})

const RecipeCardDetails = ({ recipeItem }) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* name and bookmark section */}
      <View
        style={{
          paddingHorizontal: 10,
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ width: '70%', color: COLORS.white, ...FONTS.h3 }}>
          {recipeItem.name}
        </Text>
        <Icon
          name={recipeItem.isBookmark ? 'bookmark' : 'bookmark-outline'}
          color="white"
        />
      </View>
      {/* duratiion and servings */}

      <Text
        style={{
          paddingHorizontal: 10,
          color: COLORS.lightGray,
          ...FONTS.body4,
        }}
      >
        {recipeItem.duration} | {recipeItem.servings} servings
      </Text>
    </View>
  )
}

const RecipeCardInfo = ({ recipeItem }) => {
  if (Platform.OS === 'ios') {
    return (
      <BlurView blurType="dark" style={styles.recipe_card_container}>
        <RecipeCardDetails recipeItem={recipeItem} />
      </BlurView>
    )
  } else {
    return (
      <View
        style={{
          ...styles.recipe_card_container,
          backgroundColor: COLORS.transparentDarkGray,
        }}
      >
        <RecipeCardDetails recipeItem={recipeItem} />
      </View>
    )
  }
}

const TrendingCard = ({ containerStyle, recipeItem, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        height: 350,
        width: 250,
        marginTop: SIZES.radius,
        borderRadius: SIZES.radius,
        marginRight: 20,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {/* bg image */}

      <Image
        // source={recipeItem.image}
        source={{ uri: recipeItem.image }}
        resizeMode="cover"
        style={{
          height: '100%',
          width: '100%',
          borderRadius: SIZES.radius,
        }}
      />
      {/* Category */}

      <View
        style={{
          position: 'absolute',
          top: 20,
          left: 15,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 5,
          backgroundColor: COLORS.transparentGray,
          borderRadius: SIZES.radius,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h3,
          }}
        >
          {recipeItem.category}
        </Text>
      </View>

      {/* card info */}
      <RecipeCardInfo recipeItem={recipeItem} />
    </TouchableOpacity>
  )
}

export default TrendingCard
