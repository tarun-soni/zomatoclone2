import React from 'react'
import { Text, SafeAreaView, View, TouchableOpacity, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { COLORS, FONTS, SIZES } from '../../../constants/theme'
import { trendingRecipes } from '../../../constants/dummyData'
import CategoryCard from './components/CategoryCard'
import { RECIPE_INFO_SCREEN } from '../../../constants/screens'
import { images } from '../../../constants/images'

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.zomatoWhite }}>
      <FlatList
        data={trendingRecipes}
        keyExtractor={item => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            {/* header */}
            {renderHeader()}
            {/* Search bar */}
            {/* See Recipe card */}
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
