import React from 'react'
import {
  FlatList,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { COLORS, FONTS, SIZES } from '../../../constants/theme'
import { trendingRecipes } from '../../../constants/dummyData'
import CategoryCard from './components/CategoryCard'
import { RECIPE_INFO_SCREEN } from '../../../constants/screens'
import { images } from '../../../constants/images'
import TrendingCard from './components/TrendingCard'

const RecipeTabHomeScreen = ({ navigation }) => {
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.padding,
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 80,
        }}
      >
        <View>
          <Text style={{ color: COLORS.zomatoLogoRed, ...FONTS.h2 }}>
            Hello, User
          </Text>

          <Text
            style={{
              marginTop: 3,
              color: COLORS.gray,
              ...FONTS.body3,
            }}
          >
            What u want to cook today?
          </Text>
        </View>

        {/* Profile Image */}
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={images.UserProfile7}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  function renderSearchBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          borderRadius: 8,
          backgroundColor: COLORS.gray2,
          borderWidth: 1,
          paddingHorizontal: SIZES.radius,
        }}
      >
        <Icon type="material" name="search" color="gray" />
        <TextInput
          style={{ marginLeft: SIZES.radius, ...FONTS.body3 }}
          placeholderTextColor={COLORS.gray}
          placeholder="Search Recipes"
        />
      </View>
    )
  }

  function renderSeeRecipeCard() {
    return (
      <View
        style={{
          flexDirection: 'row',

          marginHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
          borderRadius: 8,
          backgroundColor: COLORS.lightGreen2,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: 100,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingHorizontal: SIZES.radius,
          }}
        >
          <Image source={images.recipe} style={{ width: 80, height: 80 }} />

          {/* TEXT */}
          <View
            style={{
              paddingLeft: SIZES.radius,
              flex: 1,
              paddingVertical: SIZES.radius,
            }}
          >
            <Text
              style={{
                width: '70%',
                ...FONTS.body4,
              }}
            >
              You have 12 recipes that u havent tried yet
            </Text>

            <TouchableOpacity style={{ marginTop: 10 }} onPress={() => {}}>
              <Text
                style={{
                  color: COLORS.darkGreen,
                  textDecorationLine: 'underline',
                  ...FONTS.h4,
                }}
              >
                See Recipes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  function renderTrendingSection() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <Text style={{ marginHorizontal: SIZES.padding, ...FONTS.h2 }}>
          Trending Recipe
        </Text>

        <FlatList
          data={trendingRecipes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <TrendingCard recipeItem={item} />}
        />
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.zomatoWhite }}>
      <FlatList
        data={trendingRecipes}
        keyExtractor={item => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            {renderHeader()}
            {renderSearchBar()}
            {renderSeeRecipeCard()}
            {renderTrendingSection()}
            {/* TRending section */}
            {/* Category header */}
          </View>
        )}
        ListFooterComponent={() => (
          <View>
            <Text>LISt Footer</Text>
          </View>
        )}
        renderItem={({ item }) => {
          return (
            <View>
              <CategoryCard
                categoryItem={item}
                containerStyle={{ marginHorizontal: SIZES.padding }}
                onPress={() =>
                  navigation.navigate(RECIPE_INFO_SCREEN, { recipe: item })
                }
              />
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}

export default RecipeTabHomeScreen
