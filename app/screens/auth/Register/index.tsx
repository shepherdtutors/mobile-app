import {View, Text} from 'react-native';
import React from 'react';
import {ScreenProps} from '../../../../App';
import Layout from '../../../components/Layout';
import useLogic from './index.logic';

const Register: React.FC<ScreenProps<'Register'>> = ({}) => {
  const {ref} = useLogic();
  return (
    <Layout>
      <View ref={ref}>
        <Text>index</Text>
      </View>
    </Layout>
  );
};

export default Register;
