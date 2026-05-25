import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';

import { Book } from '../../@types/type';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { styles } from './BookScreen.styles';


interface Props {
  navigation: any;
  route: {
    params: {
      book: Book;
    };
  };
}

export function BookDetailScreen({ navigation, route }: Props) {
  const { book } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { handleAddToCart } = useCart();

  function increment() {
   setQuantity(q => q + 1);
  }

  function decrement() {
    if (quantity > 1)
      setQuantity(q => q - 1);
  }

  function handleBuy() {
    handleAddToCart(book, quantity);
    navigation.navigate('Cart');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Botão voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#1A1035" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Capa do livro */}
        <View style={styles.coverWrapper}>
          <Image
            source={{ uri: book.coverImage }}
            style={styles.cover}
            resizeMode="cover"
          />
        </View>

        {/* Conteúdo */}
        <View style={styles.content}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <Text style={styles.descriptionLabel}>Resumo do Livro:</Text>
          <Text style={styles.description}>{book.description}</Text>
        </View>
      </ScrollView>

      {/* Rodapé fixo */}
      <View style={styles.footer}>
        <View style={styles.purchaseRow}>
          {/* Contador */}
          <View style={styles.quantityWrapper}>
            <TouchableOpacity style={styles.quantityBtn} onPress={decrement}>
              <Text style={styles.quantityBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityBtn} onPress={increment}>
              <Text style={styles.quantityBtnText}>+</Text>
            </TouchableOpacity>
          </View>

          
          <Text style={styles.price}>R${(book.price * quantity).toFixed(2)}</Text>
        </View>

         {/* Comprar → adiciona ao carrinho e navega */}
        <TouchableOpacity style={styles.buyButton} onPress={handleBuy} activeOpacity={0.85}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>

        {/* Ver carrinho sem adicionar */}
        <TouchableOpacity style={styles.viewCartWrapper} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.viewCartText}>Ver Carrinho</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


