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
// import Google from '../../../assets/images/svgs/shepherd-google-logo.svg';
import {applyStyles} from '../../../assets/styles';
import StyleGuide from '../../../assets/style-guide';

import {scaleHeight} from '../../../utils';

const ForgotPassword: React.FC<ScreenProps<'ForgotPassword'>> = ({}) => {
  const {ref, handleRouteToLogin} = useLogic();
  return (
    <Layout>
      <ScrollView
        style={applyStyles('flex-1 h-full w-full')}
        contentContainerStyle={applyStyles({flexGrow: 1})}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View ref={ref} style={applyStyles('flex-1')}>
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
                  Forgot password
                </Text>
              </View>
            </View>
          </View>

          {/* SubHeader */}
          <View style={applyStyles('w-full mb-32')}>
            <View style={applyStyles('w-full')}>
              <View
                style={applyStyles('w-full flex justify-center items-center')}>
                <Text
                  style={applyStyles(
                    'text-sm text-shades-gray-1050 text-400 text-center',
                  )}>
                  Enter the email you registered with, we will send you a link
                  to create a new password
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
                    secureTextEntry
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Button */}
          <View style={applyStyles('flex-1 mb-16')}>
            <View style={applyStyles('h-full w-full')}>
              <View style={applyStyles('h-full w-full')}>
                <View
                  style={applyStyles(
                    'h-full w-full flex flex-col justify-center items-center',
                  )}>
                  <ShepherdButton
                    customStyle={applyStyles('w-full')}
                    onPress={() => {}}>
                    Confirm
                  </ShepherdButton>
                </View>
              </View>
            </View>
          </View>

          {/* Button */}
          <View style={applyStyles('flex-1')}>
            <View style={applyStyles('w-full h-full')}>
              <View
                style={applyStyles(
                  'w-full h-full flex justify-center items-end flex-row py-16',
                )}>
                <View style={applyStyles('')}>
                  <View style={applyStyles('')}>
                    <Text style={applyStyles('text-shades-gray-1050')}>
                      Remember your password?
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={handleRouteToLogin}
                  style={applyStyles('mx-4')}>
                  <View style={applyStyles('')}>
                    <Text style={applyStyles('text-primary')}>Log in</Text>
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

export default ForgotPassword;
