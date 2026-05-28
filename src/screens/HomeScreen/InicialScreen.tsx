import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './InicialScreen.styles';

// Componentes Acessíveis
import { AHeader, AButton, AImage } from '../../components/accessible';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Tenha todos os seus\nlivros em um lugar',
    image: require('../../../assets/illustration-home.png'),
  },
];

interface Props {
  navigation: any;
}

export function InicialScreen({ navigation }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <AImage
              source={item.image}
              style={styles.illustration}
              resizeMode="contain"
              alt=""
              decorative
            />
          </View>
        )}
      />

      <View style={styles.bottomContainer}>
        <AHeader level={1} style={styles.title}>{slides[activeIndex].title}</AHeader>

        {/* Indicadores de página */}
        <View 
          style={styles.dotsContainer}
          accessible
          accessibilityLabel={`Página ${activeIndex + 1} de ${slides.length}`}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === activeIndex && styles.dotActive]}
            />
          ))}
        </View>

        <AButton
          label="Cadastre-se"
          hint="Criar uma nova conta no BookShelf"
          variant="primary"
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('Register')}
        />

        <AButton
          label="Entrar"
          hint="Fazer login com uma conta existente"
          variant="secondary"
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
}