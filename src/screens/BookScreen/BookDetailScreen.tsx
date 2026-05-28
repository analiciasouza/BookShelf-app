import React, { useState } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Book } from '../../@types/type';
import { useCart } from '../../context/CartContext';
import { styles } from './BookScreen.styles';

// Componentes Acessíveis
import { AHeader, AButton, AIconButton, AImage } from '../../components/accessible';

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
    if (quantity > 1) setQuantity(q => q - 1);
  }

  function handleBuy() {
    handleAddToCart(book, quantity);
    navigation.navigate('Cart');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Botão voltar */}
      <AIconButton 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
        label="Voltar"
        hint="Volta para a tela anterior"
      >
        <Ionicons name="arrow-back" size={24} color="#1A1035" />
      </AIconButton>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Capa do livro */}
        <View style={styles.coverWrapper}>
          <AImage
            source={{ uri: book.coverImage }}
            style={styles.cover}
            resizeMode="cover"
            alt={`Capa do livro ${book.title}`}
          />
        </View>

        {/* Conteúdo */}
        <View style={styles.content}>
          <AHeader level={1} style={styles.title}>{book.title}</AHeader>
          <Text style={styles.author}>{book.author}</Text>
          
          <AHeader level={3} style={styles.descriptionLabel}>Resumo do Livro:</AHeader>
          <Text style={styles.description}>{book.description}</Text>
        </View>
      </ScrollView>

      {/* Rodapé fixo */}
      <View style={styles.footer}>
        <View style={styles.purchaseRow}>
          {/* Contador */}
          <View style={styles.quantityWrapper}>
            <AIconButton 
              style={styles.quantityBtn} 
              onPress={decrement}
              label="Diminuir quantidade"
              hint={`Quantidade atual: ${quantity}`}
              disabled={quantity <= 1}
            >
              <Text style={styles.quantityBtnText}>−</Text>
            </AIconButton>
            
            <Text 
              style={styles.quantityValue}
              accessible
              accessibilityLabel={`${quantity} unidades selecionadas`}
            >
              {quantity}
            </Text>
            
            <AIconButton 
              style={styles.quantityBtn} 
              onPress={increment}
              label="Aumentar quantidade"
              hint={`Quantidade atual: ${quantity}`}
            >
              <Text style={styles.quantityBtnText}>+</Text>
            </AIconButton>
          </View>

          <Text 
            style={styles.price}
            accessible
            accessibilityLabel={`Preço total: R$ ${(book.price * quantity).toFixed(2)}`}
          >
            R${(book.price * quantity).toFixed(2)}
          </Text>
        </View>

        {/* Comprar → adiciona ao carrinho e navega */}
        <AButton 
          label="Comprar"
          hint="Adiciona o livro ao carrinho e prossegue para a confirmação"
          variant="primary"
          style={styles.buyButton}
          onPress={handleBuy}
        />

        {/* Ver carrinho sem adicionar */}
        <AButton 
          label="Ver Carrinho"
          hint="Ir direto para a visualização do carrinho de compras"
          variant="ghost"
          style={styles.viewCartWrapper}
          onPress={() => navigation.navigate('Cart')}
        />
      </View>
    </SafeAreaView>
  );
}