import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { COLORS } from '../constants/theme'

const styles = StyleSheet.create({
  stepper_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  index_container: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginRight: 20,
    borderWidth: 2,
    paddingTop: 20,
  },
  vertical_line: {
    top: 18,
    height: 26,
    justifyContent: 'center',
    borderWidth: 1.2,
  },
})

const Stepper = ({ step, index, isLastStep }) => {
  return (
    <View style={styles.stepper_container}>
      <View style={styles.index_container}>
        <Text
          style={{ fontSize: 12, fontWeight: 'bold', position: 'absolute' }}
        >
          {`${index + 1}`}
        </Text>
        {!isLastStep && <View style={[styles.vertical_line]} />}
      </View>
      <Text style={{ color: COLORS.gray }}>{step} </Text>
    </View>
  )
}

export default Stepper
