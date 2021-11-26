import { createAsyncThunk } from '@reduxjs/toolkit'
import { Alert } from 'react-native'
import { firestore } from '../../config/firebase'

// helpers/sub functions for createAsyncThunk
async function getIngredients(item) {
  const ingredientsData = await firestore()
    .collection('ingredients')
    .doc(item.id)
    .get()
  const { description, icon, quantity } = ingredientsData?._data
  return { id: ingredientsData?.id, description, icon, quantity }
}

async function getAllAuthors(item) {
  const authorData = await firestore().collection('users').doc(item.id).get()
  const { displayName, photoURL } = authorData?._data
  return { id: authorData?.id, displayName, photoURL }
}

// returns All the recipes with populated authors and ingredients
export const getRecipes = createAsyncThunk('recipe/getRecipes', async () => {
  const dataToReturn = []
  try {
    const recipeReference = await firestore().collection('recipes')
    const recipesCollection = await recipeReference.get()

    // eslint-disable-next-line no-inner-declarations
    async function getAllRecipesPromise(eachRecipe) {
      const { category, duration, isBookmark, image, servings, name, steps } =
        eachRecipe._data
      const recipeObject = {
        id: eachRecipe.id,
        category,
        duration,
        isBookmark,
        image,
        name,
        servings,
        author: null,
        ingredients: [],
        steps,
      }

      const allIngredients = await Promise.all(
        eachRecipe?._data?.ingredients?.map(getIngredients),
      )

      const allAuth = await Promise.all(
        eachRecipe?._data?.author?.map(getAllAuthors),
      )

      dataToReturn.push({
        ...recipeObject,
        ingredients: [...allIngredients],
        author: [...allAuth],
      })

      return dataToReturn
    }

    await Promise.all(recipesCollection?._docs.map(getAllRecipesPromise))

    console.log('dataToReturn :>> ', dataToReturn)
    return dataToReturn
  } catch (error) {
    console.log(`error`, error)
    Alert.alert(error.message)
    return error
  }
})
