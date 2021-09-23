import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Alert } from 'react-native'
import { firestore } from '../../config/firebase'

const initialState = {
  allRecipes: [],
  status: null,
}

export const getRecipes = createAsyncThunk('recipe/getRecipes', async () => {
  const dataToReturn = []
  try {
    const recipeReference = await firestore().collection('recipes')
    const recipesCollection = await recipeReference.get()

    // eslint-disable-next-line no-inner-declarations
    async function getAllRecipesPromise(eachRecipe) {
      console.log(`eachRecipe`, eachRecipe)

      const { category, duration, isBookmark, image, servings, name } =
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
      }

      async function getIngredients(item) {
        const ingredientsCollection = await firestore()
          .collection('ingredients')
          .doc(item.id)
          .get()

        return {
          id: ingredientsCollection?.id,
          description: ingredientsCollection?._data?.description,
          icon: ingredientsCollection?._data?.icon,
          quantity: ingredientsCollection?._data?.quantity,
        }
      }
      async function getAllAuthors(item) {
        const authorData = await firestore()
          .collection('users')
          .doc(item.id)
          .get()

        return {
          id: authorData?.id,
          displayName: authorData?._data?.displayName,
          photoURL: authorData?._data?.photoURL,
        }
      }

      const allIngredients = await Promise.all(
        eachRecipe?._data?.ingredients?.map(getIngredients),
      )

      const allAuth = await Promise.all(
        eachRecipe?._data?.author?.map(getAllAuthors),
      )
      console.log(`allAuth`, allAuth)
      dataToReturn.push({
        ...recipeObject,
        ingredients: [...allIngredients],
        author: [...allAuth],
      })

      return dataToReturn
    }

    await Promise.all(recipesCollection?._docs.map(getAllRecipesPromise))

    return dataToReturn
  } catch (error) {
    console.log(`error`, error)
    Alert.alert(error.message)
    return error
  }
})

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {},
  extraReducers: {
    [getRecipes.fulfilled]: (state, action) => {
      state.status = 'success'
      state.allRecipes = action.payload
    },
    [getRecipes.rejected]: state => {
      state.status = 'failed'
    },
    [getRecipes.pending]: state => {
      state.status = 'loading'
    },
  },
})

// actions
// export const {} = recipeSlice.actions

// selectors
export const selectAllRecipes = state => state.recipe.allRecipes
export const selectGetAllRecipesStatus = state => state.recipe.status

export default recipeSlice.reducer
