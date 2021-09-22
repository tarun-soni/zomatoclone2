import React from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { COLORS } from '../../../../constants/theme'

const styles = StyleSheet.create({
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 100 : 100,
    paddingHorizontal: 10,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 40,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
})

const TopChips = ({ data }) => {
  return (
    <ScrollView
      horizontal
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      height={50}
      style={styles.chipsScrollView}
      contentInset={{
        // iOS only
        top: 0,
        left: 0,
        bottom: 0,
        right: 20,
      }}
      contentContainerStyle={{
        paddingRight: Platform.OS === 'android' ? 20 : 0,
      }}
    >
      {data.map(category => (
        <TouchableOpacity key={category.id} style={styles.chipsItem}>
          {category.icon}
          <Text>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default TopChips
