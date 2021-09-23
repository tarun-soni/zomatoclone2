import React from 'react'
import { ScrollView, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { SIZES } from '../../../../constants/theme'

const RecipeHomeSkeleton = () => {
  function header() {
    return (
      <SkeletonPlaceholder>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: SIZES.padding,
          }}
        >
          <View>
            <View style={{ width: 120, height: 20, borderRadius: 4 }} />
            <View
              style={{ marginTop: 6, width: 200, height: 20, borderRadius: 4 }}
            />
          </View>
          <View style={{ width: 50, height: 50, borderRadius: 50 }} />
        </View>
      </SkeletonPlaceholder>
    )
  }
  function search() {
    return (
      <SkeletonPlaceholder>
        <View
          style={{
            height: 50,
            marginHorizontal: SIZES.padding,
            borderRadius: 8,

            borderWidth: 1,
            paddingHorizontal: SIZES.radius,
            marginTop: 20,
          }}
        />
      </SkeletonPlaceholder>
    )
  }
  function recipesBG() {
    return (
      <SkeletonPlaceholder>
        <View
          style={{
            height: 100,
            marginHorizontal: SIZES.padding,
            paddingHorizontal: SIZES.radius,
            borderRadius: 8,
            marginTop: 14,
          }}
        />
      </SkeletonPlaceholder>
    )
  }
  function trendingText() {
    return (
      <SkeletonPlaceholder>
        <View
          style={{
            height: 30,
            marginHorizontal: SIZES.padding,
            borderRadius: 4,
            width: 170,
            marginTop: 18,
            paddingHorizontal: SIZES.radius,
          }}
        />
      </SkeletonPlaceholder>
    )
  }

  function trendingVerticalCards() {
    return (
      <SkeletonPlaceholder>
        <View
          style={{
            marginTop: 10,

            height: 320,
            width: 200,
            marginHorizontal: SIZES.padding,
            paddingHorizontal: SIZES.radius,
            marginRight: 1,
            borderRadius: 8,
          }}
        />
      </SkeletonPlaceholder>
    )
  }
  function categoriesAndViewAll() {
    return (
      <SkeletonPlaceholder>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: SIZES.padding,
          }}
        >
          {/* <View style={{ width: 120, height: 20, borderRadius: 4 }} /> */}

          <View
            style={{
              height: 25,
              borderRadius: 4,
              width: 120,
              marginTop: 15,
            }}
          />
          <View
            style={{ marginTop: 6, width: 80, height: 25, borderRadius: 4 }}
          />
        </View>
      </SkeletonPlaceholder>
    )
  }
  return (
    <View style={{ marginVertical: SIZES.padding }}>
      {header()}
      {search()}
      {recipesBG()}
      {trendingText()}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      >
        {trendingVerticalCards()}
        {trendingVerticalCards()}
      </ScrollView>
      {categoriesAndViewAll()}
    </View>
  )
}

export default RecipeHomeSkeleton
