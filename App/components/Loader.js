import React from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native'
import { COLORS } from '../constants/theme'

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
        color={COLORS.zomatoLogoRed}
        size="large"
        style={{ marginVertical: 40 }}
      />
    </SafeAreaView>
  )
}

export default Loader
