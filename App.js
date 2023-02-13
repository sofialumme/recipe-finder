import { useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = (ingredient) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then(response => response.json())
      .then(data => setRecipes(data.meals))
      .catch(error => {
        Alert.alert('Error', error);
      });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={ingredient => setIngredient(ingredient)}
        value={ingredient}
      />
      <Button title='Find' onPress={() => getRecipes(ingredient)} />
      <FlatList
        data={recipes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View>
            <Text>{item.strMeal}</Text>
            <Image
              style={styles.image}
              source={{
                uri: item.strMealThumb
              }}
            />
            <Text> </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10
  },
  image: {
    width: 200,
    height: 200
  }
});
