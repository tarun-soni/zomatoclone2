import React, { useEffect, useRef, useState } from 'react'
import { Animated, Image, Text, View, SafeAreaView } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../../constants/theme'

const HEADER_HEIGHT = 350

const RecipeInfoScreen = ({ navigation, route }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const scrollY = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const { recipe } = route.params
    setSelectedRecipe(recipe)
  }, [route])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Animated.FlatList
        data={selectedRecipe?.ingredients}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <Text>header</Text>
          </View>
        )}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
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
      <Text>RECIPE INFO</Text>
    </SafeAreaView>
  )
}

export default RecipeInfoScreen
