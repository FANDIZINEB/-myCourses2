import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function CourseInfos({ route, navigation }) {
  const { course } = route.params;
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);

  const addToCart = () => {
    const alreadyInCart = cart.find(item => item.id === course.id);
    if (alreadyInCart) {
      alert('Ce cours est déjà dans le panier !');
      return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: course });
    alert('✅ Cours ajouté au panier !');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: course.image }} style={styles.image} />
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.description}>{course.description}</Text>
      <Text style={styles.price}>{course.price} €</Text>
      <Text style={styles.instructor}>👤 {course.instructor}</Text>
      <TouchableOpacity style={styles.btn} onPress={addToCart}>
        <Text style={styles.btnText}>🛒 Ajouter au panier</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>⬅️ Retour</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, color: '#555', marginBottom: 10 },
  price: { fontSize: 20, color: 'green', fontWeight: 'bold', marginBottom: 10 },
  instructor: { fontSize: 16, color: 'gray', marginBottom: 20 },
  btn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, marginBottom: 10 },
  btnBack: { backgroundColor: '#888', padding: 15, borderRadius: 10 },
  btnText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});