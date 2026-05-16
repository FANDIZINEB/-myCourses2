import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePay = () => {
    dispatch({ type: 'ADD_PAYMENT', payload: cart });
    dispatch({ type: 'CLEAR_CART' });
    alert('✅ Paiement effectué !');
  };

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🛒 Panier vide</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Mon Panier</Text>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text style={styles.price}>{item.price} €</Text>
            <TouchableOpacity style={styles.btnRemove} onPress={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}>
              <Text style={styles.btnText}>❌ Retirer</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.total}>Total : {total.toFixed(2)} €</Text>
      <TouchableOpacity style={styles.btnPay} onPress={handlePay}>
        <Text style={styles.btnText}>💳 Payer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#f0f0f0', padding: 15, marginBottom: 10, borderRadius: 10 },
  courseTitle: { fontSize: 18, fontWeight: 'bold' },
  price: { color: 'green', fontWeight: 'bold', marginTop: 5 },
  total: { fontSize: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'right' },
  btnRemove: { backgroundColor: '#FF3B30', padding: 8, borderRadius: 8, marginTop: 8 },
  btnPay: { backgroundColor: '#34C759', padding: 15, borderRadius: 10, marginTop: 10 },
  btnText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});