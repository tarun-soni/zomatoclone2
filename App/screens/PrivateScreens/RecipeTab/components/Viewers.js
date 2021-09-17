/* eslint-disable no-else-return */
import React from 'react'
import { Text, View, Image } from 'react-native'
import { COLORS, FONTS } from '../../../../constants/theme'

const Viewers = ({ viewersList }) => {
  if (viewersList?.length === 0) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: COLORS.lightGray2, ...FONTS.body4 }}>
          Be the first one to try this
        </Text>
      </View>
    )
  } else if (viewersList?.length <= 4) {
    return (
      <View>
        {/* profile section */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 10,
          }}
        >
          {viewersList?.map((v, index) => (
            <View
              key={v.id}
              style={{
                height: 40,
                width: 40,
                marginLeft: index === 0 ? 0 : -20,
              }}
            >
              <Image
                source={v.profilePic}
                style={{ width: 40, height: 40, borderRadius: 25 }}
              />
            </View>
          ))}
        </View>

        {/* text section */}
        <Text
          style={{
            color: COLORS.lightGray2,
            textAlign: 'right',
            ...FONTS.body4,
            lineHeight: 18,
          }}
        >
          {viewersList?.length} people
        </Text>

        <Text
          style={{
            color: COLORS.lightGray2,
            textAlign: 'right',
            ...FONTS.body4,
            lineHeight: 18,
          }}
        >
          Already tried this
        </Text>
      </View>
    )
  } else {
    return (
      <>
        {/* profile  */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 10,
          }}
        >
          {viewersList?.map((v, index) => {
            if (index <= 2) {
              return (
                <View
                  key={v.id}
                  style={{
                    height: 40,
                    width: 40,
                    marginLeft: index === 0 ? 0 : -20,
                  }}
                >
                  <Image
                    source={v.profilePic}
                    style={{ width: 40, height: 40, borderRadius: 25 }}
                  />
                </View>
              )
            }
            if (index === 3) {
              return (
                <View
                  key={v.id}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    width: 40,
                    marginLeft: -20,
                    borderRadius: 25,
                    backgroundColor: COLORS.darkGreen,
                  }}
                >
                  <Text style={{ color: COLORS.white, ...FONTS.body4 }}>
                    {viewersList?.length}
                  </Text>
                </View>
              )
            }
            return null
          })}
        </View>

        {/* text  */}
        <Text
          style={{
            color: COLORS.lightGray2,
            textAlign: 'right',
            ...FONTS.body4,
            lineHeight: 18,
          }}
        >
          {viewersList?.length} people
        </Text>

        <Text
          style={{
            color: COLORS.lightGray2,
            textAlign: 'right',
            ...FONTS.body4,
            lineHeight: 18,
          }}
        >
          Already tried this
        </Text>

        <Text>Viewers</Text>
      </>
    )
  }
}

export default Viewers
