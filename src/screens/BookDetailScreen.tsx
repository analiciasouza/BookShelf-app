import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';

import { Book } from '../@types/type';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

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
          <Text style={styles.viewCartText}>View cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const PURPLE = '#5C3D99';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // ─── Capa ─────────────────────────────────────────────────────
  coverWrapper: {
    width: width,
    height: width * 0.85,
    backgroundColor: '#F5F5F5',
  },
  cover: {
    width: '100%',
    height: '100%',
  },

  // ─── Conteúdo ─────────────────────────────────────────────────
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1035',
    marginBottom: 4,
  },
  author: {
    fontSize: 15,
    color: '#9E9E9E',
    marginBottom: 16,
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1035',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 20,
  },

  backButton: { 
  paddingHorizontal: 20, 
  paddingVertical: 12 
},

  // ─── Rodapé ───────────────────────────────────────────────────
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  purchaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 4,
  },
  quantityBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityBtnText: {
    fontSize: 18,
    color: '#1A1035',
    fontWeight: '500',
  },
  quantityValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1035',
    marginHorizontal: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1035',
  },
  buyButton: {
    backgroundColor: PURPLE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  viewCartWrapper: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  viewCartText: {
    color: PURPLE,
    fontSize: 14,
    fontWeight: '600',
  },
});