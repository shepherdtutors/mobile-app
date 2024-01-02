import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';

// components
import Layout from '../../../components/Layout';
import ShepherdTextInput from '../../../components/TextInput';
import ShepherdButton from '../../../components/Button';

import {ScreenProps} from '../../../../App';

// business logic
import useLogic from './index.logic';

// assets
import Logo from '../../../assets/images/svgs/shepherd-logo.svg';
import Google from '../../../assets/images/svgs/shepherd-google-logo.svg';
import {applyStyles} from '../../../assets/styles';
import StyleGuide from '../../../assets/style-guide';

import {scaleHeight} from '../../../utils';

const Login: React.FC<ScreenProps<'Login'>> = ({}) => {
  const {ref, handleRouteToRegister, handleRouteToForgotPassword} = useLogic();
  return (
    <Layout>
      <ScrollView
        style={applyStyles('flex-1 h-full w-full')}
        contentContainerStyle={applyStyles({flexGrow: 1})}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View ref={ref} style={applyStyles('h-full')}>
          {/* Logo */}
          <View
            style={applyStyles('mt-32 mb-40 w-full', {
              height: scaleHeight(55),
            })}>
            <View
              style={applyStyles('justify-center items-center flex h-full')}>
              <View>
                <SvgXml
                  width={100}
                  height={50}
                  xml={Logo as unknown as string}
                />
              </View>
            </View>
          </View>

          {/* Header */}
          <View style={applyStyles('w-full mb-8')}>
            <View style={applyStyles('w-full')}>
              <View
                style={applyStyles('w-full flex justify-center items-center')}>
                <Text
                  style={applyStyles(
                    'text-2xl text-shades-gray-1000 text-600',
                  )}>
                  Welcome back!
                </Text>
              </View>
            </View>
          </View>

          {/* SubHeader */}
          <View style={applyStyles('w-full mb-24')}>
            <View style={applyStyles('w-full')}>
              <View
                style={applyStyles('w-full flex justify-center items-center')}>
                <Text
                  style={applyStyles(
                    'text-sm text-shades-gray-1050 text-400 text-center',
                  )}>
                  Provide your details to sign in to your Shepherd account
                </Text>
              </View>
            </View>
          </View>

          {/* Inputs */}
          <View style={applyStyles('mt-24 pt-4')}>
            <View style={applyStyles('w-full')}>
              <View style={applyStyles('w-full')}>
                {/* Email */}
                <View style={applyStyles('w-full')}>
                  <ShepherdTextInput
                    label={'Email'}
                    placeholderTextColor={StyleGuide.Colors.shades.gray[100]}
                    showLabel
                    placeholder={'Enter your email'}
                  />
                </View>
                <View style={applyStyles('my-12')} />

                {/* Password */}
                <View style={applyStyles('w-full')}>
                  <ShepherdTextInput
                    label={'Password'}
                    showLabel
                    placeholderTextColor={StyleGuide.Colors.shades.gray[100]}
                    placeholder={'Enter your email'}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Forgot Password */}
          <View style={applyStyles('mb-16')}>
            <View style={applyStyles('mb-4')}>
              <TouchableOpacity onPress={handleRouteToForgotPassword}>
                <Text
                  style={applyStyles('text-shades-red-1000 text-xs text-400')}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Button */}
          <View style={applyStyles('flex-1 mb-16')}>
            <View style={applyStyles('w-full')}>
              <View style={applyStyles('w-full')}>
                <View style={applyStyles('w-full mb-16')}>
                  <ShepherdButton onPress={() => {}}>Continue</ShepherdButton>
                </View>
                <View style={applyStyles('w-full')}>
                  <ShepherdButton mode="secondary" onPress={() => {}}>
                    <View
                      style={applyStyles(
                        'flex justify-center items-center w-full flex-row',
                      )}>
                      <View style={applyStyles('mr-8')}>
                        <SvgXml
                          width={14}
                          height={14}
                          xml={Google as unknown as string}
                        />
                      </View>
                      <Text
                        style={applyStyles('text-400 text-shades-gray-1100')}>
                        Continue with Google
                      </Text>
                    </View>
                  </ShepherdButton>
                </View>
              </View>
            </View>
          </View>

          {/* Register */}
          <View style={applyStyles('flex-1 w-full h-full')}>
            <View style={applyStyles('w-full h-full')}>
              <View
                style={applyStyles(
                  'w-full h-full flex justify-center items-end flex-row py-16',
                )}>
                <View style={applyStyles('')}>
                  <View style={applyStyles('')}>
                    <Text style={applyStyles('text-shades-gray-1050')}>
                      Don't have an account?
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={handleRouteToRegister}
                  style={applyStyles('mx-4')}>
                  <View style={applyStyles('')}>
                    <Text style={applyStyles('text-primary')}>Register</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Login;
