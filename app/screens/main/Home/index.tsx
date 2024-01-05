/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import Layout from '../../../components/Layout';

import useLogic from './index.logic';

function Home(): JSX.Element {
  const {ref} = useLogic();
  return (
    <Layout>
      <View ref={ref}>
        <Text>Home screen</Text>
        <View>
          <TextInput />
        </View>
        <View>
          <Button onPress={() => {}}> try it</Button>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({});

export default Home;
