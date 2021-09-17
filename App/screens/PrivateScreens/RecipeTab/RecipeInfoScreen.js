/* eslint-disable no-else-return */
import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { Icon } from 'react-native-elements'
import { COLORS, FONTS, SIZES } from '../../../constants/theme'

const HEADER_HEIGHT = 350

const RecipeCreatorCardDetails = ({ selectedRecipe }) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      {/* profile pic */}
      <View style={{ width: 40, height: 40, marginLeft: 20 }}>
        <Image
          source={selectedRecipe?.author?.profilePic}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
      </View>

      {/* labels */}
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <Text style={{ color: COLORS.lightGray, ...FONTS.body4 }}>
          Recipe By
        </Text>
        <Text style={{ color: COLORS.white2, ...FONTS.h4 }}>
          {selectedRecipe?.author?.name}
        </Text>
      </View>

      {/* button */}

      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          marginRight: 20,
          borderWidth: 1,
          borderColor: COLORS.buttonRed,
        }}
      >
        <Icon size={20} color={COLORS.buttonRed} name="arrow-forward" />
      </TouchableOpacity>
    </View>
  )
}
const RecipeCreatorCardInfo = ({ selectedRecipe }) => {
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        blurType="dark"
        style={{
          flex: 1,
          borderRadius: SIZES.radius,
        }}
      >
        <RecipeCreatorCardDetails selectedRecipe={selectedRecipe} />
      </BlurView>
    )
  } else {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.transparentBlack9,
        }}
      >
        <RecipeCreatorCardDetails selectedRecipe={selectedRecipe} />
      </View>
    )
  }
}

const RecipeInfoScreen = ({ navigation, route }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const scrollY = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const { recipe } = route.params
    setSelectedRecipe(recipe)
  }, [route])

  function renderHeaderBar() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 90,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: SIZES.padding,
        }}
      >
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 18,
            borderWidth: 1,
            backgroundColor: COLORS.transparentBlack5,
          }}
          onPress={() => navigation.goBack()}
        >
          <Icon size={20} color={COLORS.white} name="arrow-back" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon
            size={20}
            color={COLORS.white}
            name={selectedRecipe?.isBookmark ? 'bookmark' : 'bookmark-outline'}
          />
        </TouchableOpacity>
      </View>
    )
  }

  function renderRecipeCardHeader() {
    return (
      <View
        style={{
          alignItems: 'center',
          overflow: 'hidden',
          // workaround for  white section on scrolldown
          marginTop: -1000,
          paddingTop: 1000,
        }}
      >
        {/* bgimage */}
        <Animated.Image
          source={selectedRecipe?.image}
          resizeMode="contain"
          style={{
            height: HEADER_HEIGHT,
            width: '200%',
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75],
                }),
              },
            ],
          }}
        />
        {/* creator card */}

        <Animated.View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 30,
            right: 30,
            height: 80,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 170, 250],
                  outputRange: [0, 0, 100],
                  extrapolate: 'clamp',
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75],
                }),
              },
            ],
          }}
        >
          <RecipeCreatorCardInfo selectedRecipe={selectedRecipe} />
        </Animated.View>
      </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Animated.FlatList
        data={selectedRecipe?.ingredients}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            {/* header */}
            {renderRecipeCardHeader()}
            {/* info */}
            {/* ingredient title */}
          </View>
        )}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 30,
              marginVertical: 5,
            }}
          >
            {/* icon */}
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                width: 50,
                borderRadius: 5,
                backgroundColor: COLORS.lightGreen,
              }}
            >
              <Image source={item.icon} style={{ width: 40, height: 40 }} />
            </View>
            {/* desc */}
            <View
              style={{
                paddingHorizontal: 20,
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
            </View>
            {/* quanitity */}

            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            >
              <Text style={{ ...FONTS.body3 }}>{item.quantity}</Text>
            </View>
          </View>
        )}
      />

      {/* header bar */}
      {renderHeaderBar()}
    </View>
  )
}

export default RecipeInfoScreen
