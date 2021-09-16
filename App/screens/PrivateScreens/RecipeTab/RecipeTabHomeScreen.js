import React from 'react'
import { Text, SafeAreaView, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { COLORS, SIZES } from '../../../constants/theme'
import { trendingRecipes } from '../../../constants/dummyData'
import CategoryCard from './components/CategoryCard'
import { RECIPE_TAB_HOMESCREEN } from '../../../constants/screens'

const RecipeTabHomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.zomatoWhite }}>
      <FlatList
        data={trendingRecipes}
        keyExtractor={item => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <Text>LISt HEADER</Text>
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
                // TODO create and add RECIPE SCREEN
                onPress={() =>
                  navigation.navigate(RECIPE_TAB_HOMESCREEN, { recipe: item })
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
