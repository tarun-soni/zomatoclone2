import React from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../../../constants/theme'

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
        source={recipeItem.image}
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
      <Text>{recipeItem.name}</Text>
    </TouchableOpacity>
  )
}

export default TrendingCard
