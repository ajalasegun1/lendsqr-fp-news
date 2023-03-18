import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const NewsItemPlaceholder = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <View style={styles.container}>
      {data.map(item => (
        <SkeletonPlaceholder borderRadius={4} key={item}>
          <SkeletonPlaceholder.Item flexDirection="row" marginBottom={10}>
            <SkeletonPlaceholder.Item width={100} height={90} />
            <SkeletonPlaceholder.Item marginLeft={5}>
              <SkeletonPlaceholder.Item width={250} height={20} />
              <SkeletonPlaceholder.Item marginTop={6} width={250} height={10} />
              <SkeletonPlaceholder.Item marginTop={6} width={250} height={10} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ))}
    </View>
  );
};

export default NewsItemPlaceholder;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
