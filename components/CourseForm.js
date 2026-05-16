import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function CourseForm({ route, navigation }) {
  const dispatch = useDispatch();
  const errors = useSelector(state => state.user.errors);
  const editCourse = route.params?.course || null;

  const [title, setTitle] = useState(editCourse?.title || '');
  const [description, setDescription] = useState(editCourse?.description || '');
  const [price, setPrice] = useState(editCourse?.price?.toString() || '');
  const [instructor, setInstructor] = useState(editCourse?.instructor || '');

  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Le titre est obligatoire';
    if (!description) newErrors.description = 'La description est obligatoire';
    if (!price || isNaN(price)) newErrors.price = 'Le prix doit être un nombre';
    if (!instructor) newErrors.instructor = "L'instructeur est obligatoire";

    if (Object.keys(newErrors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: newErrors });
      return false;
    }
    dispatch({ type: 'CLEAR_ERRORS' });
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (editCourse) {
      dispatch({ type: 'UPDATE_COURSE', payload: { ...editCourse, title, description, price: parseFloat(price), instructor } });
    } else {
      dispatch({ type: 'ADD_COURSE', payload: { id: Date.now(), title, description, price: parseFloat(price), instructor, image: 'https://picsum.photos/200/300?random=' + Date.now() } });
    }
    dispatch({ type: 'CLEAR_ERRORS' });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editCourse ? '✏️ Modifier' : '➕ Créer'} un cours</Text>

      <TextInput style={[styles.input, errors.title && styles.inputError]} placeholder="Titre" value={title} onChangeText={setTitle} />
      {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

      <TextInput style={[styles.input, errors.description && styles.inputError]} placeholder="Description" value={description} onChangeText={setDescription} />
      {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

      <TextInput style={[styles.input, errors.price && styles.inputError]} placeholder="Prix (€)" value={price} onChangeText={setPrice} keyboardType="numeric" />
      {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

      <TextInput style={[styles.input, errors.instructor && styles.inputError]} placeholder="Instructeur" value={instructor} onChangeText={setInstructor} />
      {errors.instructor && <Text style={styles.errorText}>{errors.instructor}</Text>}

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>{editCourse ? '💾 Modifier' : '➕ Créer'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 5, fontSize: 16 },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', marginBottom: 10, fontSize: 13 },
  btn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, marginTop: 10 },
  btnText: { color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});