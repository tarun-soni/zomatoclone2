import { images } from './images'
import icons from './icons'

export const trendingRecipes = [
  {
    id: 1,
    name: 'Spaghetti With Shrimp Sauce',
    image: images.spagetti,
    duration: '30 mins',
    servings: 1,
    isBookmark: false,
    category: 'Pasta',
    author: {
      profilePic: images.UserProfile5,
      name: 'Maria',
    },
    ingredients: [
      {
        id: 1,
        icon: icons.pasta,
        description: 'Spaghetti pasta',
        quantity: '100g',
      },
      {
        id: 2,
        icon: icons.oil,
        description: 'Olive Oil',
        quantity: '2 tbsp',
      },
      {
        id: 3,
        icon: icons.shrimp,
        description: 'Fresh Shrimp',
        quantity: '100g',
      },
      {
        id: 4,
        icon: icons.tomato,
        description: 'Campari tomatoes',
        quantity: '100g',
      },
      {
        id: 5,
        icon: icons.salt,
        description: 'Salt',
        quantity: '¾ tbsp',
      },
      {
        id: 6,
        icon: icons.pepper,
        description: 'Black Pepper',
        quantity: '¼ tbsp',
      },
    ],
    viewers: [
      {
        id: 1,
        profilePic: images.UserProfile1,
      },
      {
        id: 2,
        profilePic: images.UserProfile2,
      },
      {
        id: 3,
        profilePic: images.UserProfile3,
      },
      {
        id: 4,
        profilePic: images.UserProfile3,
      },
    ],
  },
  {
    id: 2,
    name: 'Malaysian Chicken Satay',
    image: images.satay,
    duration: '50 mins',
    servings: 10,
    isBookmark: true,
    category: 'Local',
    author: {
      profilePic: images.UserProfile8,
      name: 'Mandy',
    },
    ingredients: [
      {
        id: 1,
        icon: icons.chicken,
        description: 'Boneless Chicken Thighs',
        quantity: '1kg',
      },
      {
        id: 2,
        icon: icons.lemongrass,
        description: 'Lemongrass stalk',
        quantity: '1 stalk',
      },
      {
        id: 3,
        icon: icons.onion,
        description: 'Large Onion',
        quantity: '1',
      },
      {
        id: 4,
        icon: icons.garlic,
        description: 'Garlic cloves',
        quantity: '5',
      },
      {
        id: 5,
        icon: icons.coriander,
        description: 'Coriander',
        quantity: '1 tsp',
      },
    ],
    viewers: [
      {
        id: 1,
        profilePic: images.UserProfile5,
      },
      {
        id: 2,
        profilePic: images.UserProfile4,
      },
      {
        id: 3,
        profilePic: images.UserProfile1,
      },
      {
        id: 4,
        profilePic: images.UserProfile2,
      },
      {
        id: 5,
        profilePic: images.UserProfile3,
      },
    ],
  },
  {
    id: 3,
    name: 'Sarawak Laksa',
    image: images.laksa,
    duration: '30 mins',
    servings: 1,
    isBookmark: true,
    category: 'Local',
    author: {
      profilePic: images.UserProfile9,
      name: 'Jessie',
    },
    ingredients: [
      {
        id: 1,
        icon: icons.garlic,
        description: 'Garlic cloves',
        quantity: '3',
      },
      {
        id: 2,
        icon: icons.lemongrass,
        description: 'Lemongrass',
        quantity: '2 stalks',
      },
      {
        id: 3,
        icon: icons.egg,
        description: 'Egg',
        quantity: '2',
      },
      {
        id: 4,
        icon: icons.shrimp,
        description: 'Fresh Shrimp',
        quantity: '100g',
      },
      {
        id: 5,
        icon: icons.shallot,
        description: 'Shallot',
        quantity: '4',
      },
      {
        id: 6,
        icon: icons.pasta,
        description: 'vermicelli',
        quantity: '100g',
      },
    ],
    viewers: [
      {
        id: 1,
        name: 'User 1',
        profilePic: images.UserProfile1,
      },
      {
        id: 2,
        name: 'User 2',
        profilePic: images.UserProfile2,
      },
      {
        id: 3,
        name: 'User 3',
        profilePic: images.UserProfile3,
      },
    ],
  },
  {
    id: 4,
    name: 'Nasi Lemak',
    image: images.nasiLemak,
    duration: '1 hour',
    servings: 10,
    isBookmark: true,
    category: 'Local',
    author: {
      profilePic: images.UserProfile7,
      name: 'Ali Baba',
    },
    ingredients: [
      {
        id: 1,
        icon: icons.chilli,
        description: 'Dried Chilli',
        quantity: '30g',
      },
      {
        id: 2,
        icon: icons.garlic,
        description: 'Garlic cloves',
        quantity: '3',
      },
      {
        id: 3,
        icon: icons.egg,
        description: 'Egg',
        quantity: '10',
      },
      {
        id: 4,
        icon: icons.rice,
        description: 'rice',
        quantity: '1kg',
      },
      {
        id: 5,
        icon: icons.anchovy,
        description: 'Dried anchovies',
        quantity: '3 cups',
      },
    ],
    viewers: [],
  },
]

export const restoDummyData = [
  {
    id: 1,
    coordinate: {
      latitude: 22.6293867,
      longitude: 88.4354486,
    },
    title: 'Amazing Food Place',
    description: 'This is the best food place',
    image: images.restoBanner1,
    rating: 4,
    reviews: 99,
  },
  {
    id: 2,
    coordinate: {
      latitude: 22.6345648,
      longitude: 88.4377279,
    },
    title: 'Second Amazing Food Place',
    description: 'This is the second best food place',
    image: images.restoBanner2,
    rating: 5,
    reviews: 102,
  },
  {
    id: 3,
    coordinate: {
      latitude: 22.6281662,
      longitude: 88.4410113,
    },
    title: 'Third Amazing Food Place',
    description: 'This is the third best food place',
    image: images.restoBanner3,
    rating: 3,
    reviews: 220,
  },
  {
    id: 4,
    coordinate: {
      latitude: 22.6341137,
      longitude: 88.4497463,
    },
    title: 'Fourth Amazing Food Place',
    description: 'This is the fourth best food place',
    image: images.restoBanner4,
    rating: 4,
    reviews: 48,
  },
  {
    id: 5,
    coordinate: {
      latitude: 22.6292757,
      longitude: 88.444781,
    },
    title: 'Fifth Amazing Food Place',
    description: 'This is the fifth best food place',
    image: images.restoBanner5,
    rating: 4,
    reviews: 178,
  },
]
