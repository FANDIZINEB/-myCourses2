import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function PaymentScreen() {
  const payments = useSelector(state => state.payments.payments);

  if (payments.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>📜 Aucun achat</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📜 Historique des achats</Text>
      <FlatList
        data={payments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text style={styles.price}>{item.price} €</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#f0f0f0', padding: 15, marginBottom: 10, borderRadius: 10 },
  courseTitle: { fontSize: 18, fontWeight: 'bold' },
  price: { color: 'green', fontWeight: 'bold', marginTop: 5 },
});