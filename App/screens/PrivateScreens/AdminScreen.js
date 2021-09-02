import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { firestore } from '../../config/firebase'
import colors from '../../constants/colors'
import CustomButton from '../../components/CustomButton'
import { wait } from '../../utils/wait'
import { selectLoading, setLoading } from '../../redux/slices/appReducer'
import Loader from '../../components/Loader'
import CustomTextInput from '../../components/CustomTextInput'

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
  const [addRestoInput, setAddRestoInput] = useState('')
  const [restos, setRestos] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()

  async function getRestos() {
    try {
      dispatch(setLoading(true))
      const restosCollection = await firestore().collection('restos').get()
      setRestos(restosCollection._docs)
    } catch (error) {
      console.log(`error`, error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const onRefresh = useCallback(() => {
    setIsRefreshing(true)
    wait(1000).then(() => setIsRefreshing(false))
    getRestos()
  }, [])

  const onAddRestoPress = async () => {
    await firestore()
      .collection('restos')
      .add({
        resto_name: addRestoInput,
      })
      .then(() => onRefresh())
  }

  useEffect(() => {
    getRestos()
  }, [])

  if (isLoading) return <Loader />

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
        <CustomTextInput
          inputValue={addRestoInput}
          setInputValue={setAddRestoInput}
          placeholderText="Add a new Resto"
        />
        <CustomButton
          text="Add Resto"
          onPress={onAddRestoPress}
          isDisabled={addRestoInput.length <= 0}
        />
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
