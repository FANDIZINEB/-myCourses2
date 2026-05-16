import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import testData from '../testData';

export default function CoursesScreen({ navigation }) {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courses);
  const cart = useSelector(state => state.cart.cart);

  useEffect(() => {
    dispatch({ type: 'SET_COURSES', payload: testData });
  }, []);

  const addToCart = (course) => {
    const alreadyInCart = cart.find(item => item.id === course.id);
    if (alreadyInCart) { alert('Ce cours est déjà dans le panier !'); return; }
    dispatch({ type: 'ADD_TO_CART', payload: course });
    alert('✅ Cours ajouté au panier !');
  };

  const deleteCourse = (id) => {
  const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?');
  if (confirmed) {
    dispatch({ type: 'DELETE_COURSE', payload: id });
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📚 Nos Formations</Text>
        <View style={styles.headerBtns}>
          <TouchableOpacity style={styles.btnAdd} onPress={() => navigation.navigate('CourseForm', {})}>
            <Text style={styles.btnText}>➕</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCart} onPress={() => navigation.navigate('Panier')}>
            <Text style={styles.btnText}>🛒 ({cart.length})</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={courses}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.price}>{item.price} €</Text>
            <Text style={styles.instructor}>👤 {item.instructor}</Text>
            <View style={styles.cardBtns}>
              <TouchableOpacity style={styles.btnInfo} onPress={() => navigation.navigate('CourseInfos', { course: item })}>
                <Text style={styles.btnText}>ℹ️ Détails</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnEdit} onPress={() => navigation.navigate('CourseForm', { course: item })}>
                <Text style={styles.btnText}>✏️ Éditer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnDelete} onPress={() => deleteCourse(item.id)}>
                <Text style={styles.btnText}>🗑️ Supprimer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => addToCart(item)}>
                <Text style={styles.btnText}>🛒 Panier</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  headerBtns: { flexDirection: 'row', gap: 10 },
  title: { fontSize: 22, fontWeight: 'bold' },
  card: { backgroundColor: '#f0f0f0', padding: 15, marginBottom: 10, borderRadius: 10 },
  courseTitle: { fontSize: 18, fontWeight: 'bold' },
  price: { color: 'green', fontWeight: 'bold', marginTop: 5 },
  instructor: { color: 'gray', marginTop: 5 },
  cardBtns: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  btn: { backgroundColor: '#007AFF', padding: 8, borderRadius: 8 },
  btnInfo: { backgroundColor: '#5856D6', padding: 8, borderRadius: 8 },
  btnEdit: { backgroundColor: '#FF9500', padding: 8, borderRadius: 8 },
  btnDelete: { backgroundColor: '#FF3B30', padding: 8, borderRadius: 8 },
  btnAdd: { backgroundColor: '#34C759', padding: 8, borderRadius: 8 },
  btnCart: { backgroundColor: '#007AFF', padding: 8, borderRadius: 8 },
  btnText: { color: 'white', fontWeight: 'bold' },
});