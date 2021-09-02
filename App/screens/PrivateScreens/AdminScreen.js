import React, { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Overlay } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { firestore } from '../../config/firebase'
import colors from '../../constants/colors'
import CustomButton from '../../components/CustomButton'
import { wait } from '../../utils/wait'
import { selectLoading, setLoading } from '../../redux/slices/appReducer'
import Loader from '../../components/Loader'
import CustomTextInput from '../../components/CustomTextInput'
import EditRestoOverlay from '../../components/EditRestoOverlay'

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
    // justifyContent: 'flex-start',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,

    shadowColor: '#333',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,

    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Nunito-Regular',
    color: colors.zomatoLogoRed,
    fontSize: 20,
  },
  card_image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
})

const AdminScreen = () => {
  const [addRestoInput, setAddRestoInput] = useState('')
  const [restos, setRestos] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const isLoading = useSelector(selectLoading)

  const [editRestoOverlay, setEditRestoOverlay] = useState(false)
  const [restoToEdit, setRestoToEdit] = useState(null)
  const dispatch = useDispatch()

  const getRestos = useCallback(async () => {
    try {
      dispatch(setLoading(true))
      const restosCollection = await firestore().collection('restos').get()
      setRestos(restosCollection._docs)
    } catch (error) {
      console.log(`error`, error)
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  const onRefresh = useCallback(() => {
    setIsRefreshing(true)
    wait(1000).then(() => setIsRefreshing(false))
    getRestos()
  }, [getRestos])

  const onAddRestoPress = async () => {
    await firestore()
      .collection('restos')
      .add({
        resto_name: addRestoInput,
      })
      .then(() => onRefresh())
  }

  const onEditRestoPress = toEdit => {
    setRestoToEdit(toEdit)
    setEditRestoOverlay(true)
  }

  useEffect(() => {
    getRestos()
  }, [getRestos])

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
          return <Card resto={item} onEditRestoPress={onEditRestoPress} />
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

      <Overlay isVisible={editRestoOverlay}>
        <EditRestoOverlay
          setEditRestoOverlay={setEditRestoOverlay}
          restoToEdit={restoToEdit}
        />
      </Overlay>
    </View>
  )
}

export default AdminScreen

const Card = ({ resto, onEditRestoPress }) => {
  return (
    <View style={[styles.card]}>
      <Image
        style={styles.card_image}
        source={{ uri: resto?._data.resto_image_url }}
      />
      <Text style={styles.text}>{resto?._data?.resto_name}</Text>
      <TouchableOpacity onPress={() => onEditRestoPress(resto)}>
        <Icon type="material" name="edit" color="gray" />
      </TouchableOpacity>
    </View>
  )
}
