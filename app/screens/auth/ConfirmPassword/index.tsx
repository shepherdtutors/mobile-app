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
import {applyStyles} from '../../../assets/styles';
import StyleGuide from '../../../assets/style-guide';

import {scaleHeight} from '../../../utils';
import Icon from '../../../components/Icon';

const ConfirmPassword: React.FC<ScreenProps<'ConfirmPassword'>> = ({}) => {
  const {
    ref,
    handleRouteToLogin,
    isVisible,
    toggleVisiblity,
    isVisibleConfirmPassword,
    toggleVisiblityConfirmPassword,
    reset_password,
  } = useLogic();
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
                  Create password
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
                  Create a strong and secure password for signing in to your
                  account
                </Text>
              </View>
            </View>
          </View>

          {/* Inputs */}
          <View style={applyStyles('mt-24 pt-4')}>
            <View style={applyStyles('w-full')}>
              <View style={applyStyles('w-full')}>
                {/* Password */}
                <View style={applyStyles('w-full')}>
                  <ShepherdTextInput
                    label={'Password'}
                    placeholderTextColor={StyleGuide.Colors.shades.gray[100]}
                    showLabel
                    placeholder={'Enter password'}
                    secureTextEntry={isVisible}
                    append={
                      isVisible ? (
                        <Icon
                          type={'material-community-icons'}
                          name={'eye'}
                          size={16}
                          onPress={toggleVisiblity}
                          color={StyleGuide.Colors.shades.gray[1250]}
                        />
                      ) : (
                        <Icon
                          type={'material-community-icons'}
                          name={'eye-off'}
                          size={16}
                          onPress={toggleVisiblity}
                          color={StyleGuide.Colors.shades.gray[1250]}
                        />
                      )
                    }
                  />
                </View>

                <View style={applyStyles('my-12')} />

                {/* Confirm Password */}
                <View style={applyStyles('w-full mb-32')}>
                  <ShepherdTextInput
                    label={'Confirm Password'}
                    showLabel
                    placeholderTextColor={StyleGuide.Colors.shades.gray[100]}
                    placeholder={'Re-enter password'}
                    secureTextEntry={isVisibleConfirmPassword}
                    append={
                      isVisibleConfirmPassword ? (
                        <Icon
                          type={'material-community-icons'}
                          name={'eye'}
                          size={16}
                          onPress={toggleVisiblityConfirmPassword}
                          color={StyleGuide.Colors.shades.gray[1250]}
                        />
                      ) : (
                        <Icon
                          type={'material-community-icons'}
                          name={'eye-off'}
                          size={16}
                          onPress={toggleVisiblityConfirmPassword}
                          color={StyleGuide.Colors.shades.gray[1250]}
                        />
                      )
                    }
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Button */}
          <View style={applyStyles('flex-1')}>
            <View style={applyStyles('mb-16')}>
              <View>
                <View>
                  <ShepherdButton onPress={() => {}}>
                    Confirm Password
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
                      {reset_password
                        ? 'Remember your old password?'
                        : 'Already have an account?'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={handleRouteToLogin}
                  style={applyStyles('mx-4')}>
                  <View style={applyStyles('')}>
                    <Text style={applyStyles('text-primary')}>
                      {reset_password ? 'Sign in now' : 'Log in'}
                    </Text>
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

export default ConfirmPassword;
