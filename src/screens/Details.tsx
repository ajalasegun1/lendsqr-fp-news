import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {DetailScreenProps} from '../navgation/types';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import {SafeAreaView} from 'react-native-safe-area-context';
import crashlytic from '@react-native-firebase/crashlytics';

const Details: FC<DetailScreenProps> = ({route}) => {
  const {
    articlesName,
    articlesDescription,
    files,
    authors,
    publishedAt,
    minutesToRead,
  } = route.params;

  useEffect(() => {
    crashlytic().log('News details screen mounted');
  }, []);
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.container}>
        <View style={styles.imgContainer}>
          <FastImage source={{uri: files[0].urlCdn}} style={styles.img} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{articlesName}</Text>
          <View style={styles.author}>
            <Text>Author: {authors[0].authorName}</Text>
            <Text>{minutesToRead} mins read</Text>
          </View>
          <Text>Published: {dayjs(publishedAt.date).format('DD/MM/YYYY')}</Text>
        </View>
        <View style={styles.full}>
          <Text>
            {JSON.parse(articlesDescription).map(
              (item: {type: string; content: string}) =>
                `${item.content}${'\n\n'}`,
            )}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imgContainer: {
    height: 200,
    backgroundColor: 'white',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  details: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  full: {
    padding: 10,
  },
});
