import {View, Text} from 'react-native';
import React from 'react';
import {ScreenProps} from '../../../../App';
import Layout from '../../../components/Layout';
import useLogic from './index.logic';

const Login: React.FC<ScreenProps<'Login'>> = ({}) => {
  const {ref} = useLogic();
  return (
    <Layout>
      <View ref={ref}>
        <Text>index</Text>
      </View>
    </Layout>
  );
};

export default Login;
