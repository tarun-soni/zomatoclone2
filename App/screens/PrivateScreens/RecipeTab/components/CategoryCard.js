import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../../../constants/theme'

const styles = StyleSheet.create({
  card_container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
})

const CategoryCard = ({ containerStyle, categoryItem, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card_container, { ...containerStyle }]}
      onPress={onPress}
    >
      <Image
        // source={categoryItem.image}
        source={{ uri: categoryItem.image }}
        resizeMode="cover"
        style={{
          width: 100,
          height: 100,
          borderRadius: SIZES.radius,
        }}
      />
      <View
        style={{
          width: '65%',
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3 }}>{categoryItem.name}</Text>

        <Text style={{ color: COLORS.gray, ...FONTS.h4 }}>
          {categoryItem.duration} | {categoryItem.servings} servings
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default CategoryCard
