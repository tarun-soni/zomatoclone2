import React, { useEffect } from 'react'
import {
  FlatList,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS, FONTS, SIZES } from '../../../constants/theme'
// import { trendingRecipes } from '../../../constants/dummyData'
import CategoryCard from './components/CategoryCard'
import { RECIPE_INFO_SCREEN } from '../../../constants/screens'
import { images } from '../../../constants/images'
import TrendingCard from './components/TrendingCard'
import { selectGlobalUser } from '../../../redux/slices/appReducer'
import {
  selectAllRecipes,
  selectGetAllRecipesStatus,
} from '../../../redux/slices/recipeReducer'
import { getRecipes } from '../../../redux/asyncThunks/recipeAsyncThunk'

const RecipeTabHomeScreen = ({ navigation }) => {
  const user = useSelector(selectGlobalUser)
  const allRecipes = useSelector(selectAllRecipes)
  const status = useSelector(selectGetAllRecipesStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch])

  useEffect(() => {
    console.log(`allRecipes`, allRecipes)
  }, [allRecipes])
  useEffect(() => {
    console.log(`status`, status)
  }, [status])

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
            Hello, {user?.displayName}
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
          Trending Recipes
        </Text>

        <FlatList
          data={allRecipes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item, index }) => (
            <TrendingCard
              recipeItem={item}
              containerStyle={{
                marginLeft: index === 0 ? SIZES.padding : 0,
              }}
              onPress={() =>
                navigation.navigate(RECIPE_INFO_SCREEN, { recipe: item })
              }
            />
          )}
        />
      </View>
    )
  }

  function renderCategoryHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          marginHorizontal: SIZES.padding,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3 }}>Categories</Text>
        <TouchableOpacity>
          <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>View All</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (status === 'loading' || status === null) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.zomatoWhite,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color={COLORS.zomatoLogoRed} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.zomatoWhite,
      }}
    >
      <FlatList
        style={{ marginBottom: 20 }}
        data={allRecipes}
        keyExtractor={item => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            {renderHeader()}
            {renderSearchBar()}
            {renderSeeRecipeCard()}
            {renderTrendingSection()}
            {renderCategoryHeader()}
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
