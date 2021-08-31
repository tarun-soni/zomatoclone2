import React from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native'
import colors from '../constants/colors'

const styles = StyleSheet.create({
  loader_container: {
    flex: 1,
    justifyContent: 'center',
  },
})

const Loader = () => {
  return (
    <SafeAreaView style={styles.loader_container}>
      <ActivityIndicator
        color={colors.zomatoLogoRed}
        size="large"
        style={{ marginVertical: 40 }}
      />
    </SafeAreaView>
  )
}

export default Loader
