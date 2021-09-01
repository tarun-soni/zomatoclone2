import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { firestore } from '../../config/firebase'
import colors from '../../constants/colors'
import CustomButton from '../../components/CustomButton'
import { wait } from '../../utils/wait'

const styles = StyleSheet.create({
  cards_container: {
    margin: 10,
    padding: 13,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    marginVertical: 10,
    width: 300,
    height: 80,
    borderRadius: 8,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#333',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  text: {
    fontFamily: 'Nunito-Regular',
    color: colors.zomatoLogoRed,
    fontSize: 20,
  },
})

const AdminScreen = () => {
  const [restos, setRestos] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const onAddRestoPress = async () => {
    const restoName = 'random resto'
    await firestore().collection('restos').add({
      resto_name: restoName,
    })
  }

  async function getRestos() {
    const restosCollection = await firestore().collection('restos').get()
    setRestos(restosCollection._docs)
  }

  const onRefresh = useCallback(() => {
    setIsRefreshing(true)
    wait(1000).then(() => setIsRefreshing(false))
    getRestos()
  }, [])

  useEffect(() => {
    getRestos()
  }, [])

  return (
    <View style={styles.cards_container}>
      {/* {restos.length >= 1 && (
        <View >
          {restos.map(resto => (
            <Card key={resto.id} resto={resto} />
          ))}
        </View>
      )} */}
      <FlatList
        data={restos}
        renderItem={({ item }) => {
          return <Card resto={item} />
        }}
        keyExtractor={item => item.id}
        onRefresh={() => setIsRefreshing(true)}
        refreshing={isRefreshing}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
      <View style={{ width: '90%' }}>
        <CustomButton text="Add Resto" onPress={onAddRestoPress} />
      </View>
    </View>
  )
}

export default AdminScreen

const Card = ({ resto }) => {
  return (
    <View style={[styles.card]}>
      <Text style={styles.text}>{resto?._data?.resto_name}</Text>
    </View>
  )
}
