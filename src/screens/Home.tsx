import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect} from 'react';
import {useGetNewsQuery} from '../features/api/apiSlice';
import dayjs from 'dayjs';
import FastImage from 'react-native-fast-image';
import {News} from '../features/api/types';
import {HomeScreenProps} from '../navgation/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import NewsItemPlaceholder from '../components/NewsItemPlaceholder';
import ErrorCompoent from '../components/ErrorCompoent';
import Header from '../components/Header';
import crashlytics from '@react-native-firebase/crashlytics';
const Home: FC<HomeScreenProps> = ({navigation}) => {
  // @ts-ignore
  const {data, isLoading, isError, error: fetchError} = useGetNewsQuery();

  const goToDetails = (news: News) => {
    navigation.navigate('Details', news);
  };

  useEffect(() => {
    if (isError) {
      crashlytics().recordError(fetchError as any);
    }
  }, [isError]);
  const renderItem: ListRenderItem<News> = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.newsCard}
        key={index.toString()}
        activeOpacity={0.8}
        onPress={() => goToDetails(item)}>
        <FastImage
          source={{
            uri: item.files[0].urlCdn,
          }}
          style={styles.img}
        />
        <View style={styles.details}>
          <Text numberOfLines={1} style={styles.title}>
            {item.articlesName}
          </Text>
          <Text style={styles.summary} numberOfLines={2}>
            {item.articlesShortDescription}
          </Text>

          <Text style={styles.date} numberOfLines={1}>
            {dayjs(item.publishedAt.date).format('DD/MM/YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {isLoading ? (
        <NewsItemPlaceholder />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          ListHeaderComponent={Header}
        />
      )}
      {isError && <ErrorCompoent />}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newsCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  img: {
    width: 100,
    height: 80,
  },
  details: {
    flex: 1,
    padding: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  summary: {
    fontSize: 12,
  },
  date: {
    fontSize: 12,
    textAlign: 'right',
  },
});
