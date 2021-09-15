import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { COLORS } from '../../../constants/theme'
import { wait } from '../../../utils/wait'
import { selectLoading } from '../../../redux/slices/appReducer'
import Loader from '../../../components/Loader'
import { EDIT_RESTO_SCREEN } from '../../../constants/screens'
import {
  getRestos,
  selectAllRestos,
  selectGetRestoStatus,
  setStoreRestoToEdit,
} from '../../../redux/slices/restoReducer'

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
    color: COLORS.zomatoLogoRed,
    fontSize: 20,
  },
  card_image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
})

const AdminTabHomeScreen = ({ navigation }) => {
  const [restos, setRestos] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()
  const allRestos = useSelector(selectAllRestos)
  const getRestoStatus = useSelector(selectGetRestoStatus)

  const onRefresh = useCallback(() => {
    setIsRefreshing(true)
    wait(1000).then(() => setIsRefreshing(false))
    dispatch(getRestos())
  }, [dispatch])

  const onEditRestoPress = toEdit => {
    dispatch(
      setStoreRestoToEdit({
        id: toEdit.id,
        data: toEdit.data,
      }),
    )
    navigation.navigate(EDIT_RESTO_SCREEN)
  }

  useEffect(() => {
    dispatch(getRestos())
  }, [dispatch])

  useEffect(() => {
    setRestos(allRestos)
  }, [getRestoStatus, allRestos])

  if (isLoading) return <Loader />

  return (
    <View style={styles.cards_container}>
      <Button title="fetch" onPress={onRefresh} />
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
    </View>
  )
}

export default AdminTabHomeScreen

const Card = ({ resto, onEditRestoPress }) => {
  return (
    <View style={[styles.card]}>
      <Image
        style={styles.card_image}
        source={{ uri: resto?.data?.resto_image_url }}
      />
      <Text style={styles.text}>{resto?.data?.resto_name}</Text>
      <TouchableOpacity onPress={() => onEditRestoPress(resto)}>
        <Icon type="material" name="edit" color="gray" />
      </TouchableOpacity>
    </View>
  )
}
