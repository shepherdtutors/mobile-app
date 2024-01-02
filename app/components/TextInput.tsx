/* eslint-disable react-native/no-inline-styles */
import React, {forwardRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  NativeEventEmitter,
} from 'react-native';
import {isEmpty} from 'lodash';
import CountryPicker from 'react-native-country-picker-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import useResponsiveness from '../hooks/useResponsiveness';
import StyleGuide from '../assets/style-guide';
import {GenericStylesProp} from './StackedText';
import {scaledSize, padding} from '../assets/style-guide/typography';
import {Country} from '../types';

type ShepherdTextInputProps = {
  onPress?: () => void;
  customStyle?: any;
  wrapperCustomStyle?: any;
  customStyleTextInput?: any;
  customStyleCountryCode?: any;
  isLoading?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (txt: string) => void;
  onChange?: (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    type?: string,
  ) => void;
  ref?: React.RefObject<any>;
  value?: string;
  name?: string;
  error?: string;
  touched?: boolean;
  showError?: boolean;
  showCountryCodePicker?: boolean;
  onSelect?: (country: Country) => void;
  countryCode?: Country;
  countryCodes?: string[];
  country_code?: string;
  label?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
  showLabel?: boolean;
  labelType?: 'normal' | 'integrated' | 'split';
  onInputBlur?: () => void;
  onInputFocus?: () => void;
  editable?: boolean;
  removeFocus?: boolean;
  extraStyleSplitLabelTextWrapper?: any;
  extraStyleLabelText?: any;
  backLabel?: string;
  extraStyleSplitBackLabelText?: any;
  smallText?: string;
  extraStyleSmallText?: any;
  prepend?: any;
  append?: any;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  showIntegratedLabelPlaceHolder?: boolean;
  returnKeyType?:
    | 'done'
    | 'go'
    | 'next'
    | 'search'
    | 'send'
    | 'none'
    | 'previous'
    | 'default'
    | 'emergency-call'
    | 'google'
    | 'join'
    | 'route'
    | 'yahoo';
  onSubmitEditing?: (evt: NativeEventEmitter) => void;
};

const ShepherdTextInput: React.FC<ShepherdTextInputProps> = forwardRef(
  (
    {
      value,
      customStyle,
      wrapperCustomStyle,
      customStyleCountryCode,
      customStyleTextInput,
      error,
      touched,
      showError = true,
      showCountryCodePicker = false,
      countryCode = 'NG',
      onSelect,
      countryCodes = ['NG'],
      country_code = '234',
      label,
      placeholder,
      showLabel = false,
      labelType = 'normal',
      onInputFocus,
      onInputBlur,
      onChange,
      extraStyleSplitLabelTextWrapper,
      extraStyleLabelText,
      backLabel,
      extraStyleSplitBackLabelText,
      smallText,
      extraStyleSmallText,
      prepend,
      append,
      autoCapitalize = 'none',
      showIntegratedLabelPlaceHolder = false,
      returnKeyType = 'done',
      ...props
    },
    ref,
  ) => {
    const {scale} = useResponsiveness();
    const [showPicker, setShowPicker] = useState(false);
    const [focused, setFocused] = useState(false);

    const onClose = () => setShowPicker(false);

    return (
      <TouchableOpacity
        disabled={!props.onPress}
        onPress={props.onPress}
        style={[styles.touchableWrapper, wrapperCustomStyle]}>
        <View style={[styles.inputWrapper]}>
          {showCountryCodePicker && (
            // <View>
            <TouchableOpacity
              onPress={() => setShowPicker(true)}
              style={[
                styles.smallBox,
                styles.inputBox,
                touched && !isEmpty(value) && styles.successInput,
                showLabel &&
                  labelType === 'integrated' &&
                  focused && {
                    borderColor: StyleGuide.Colors.shades.blue[200],
                  },
                !!error && styles.errorInput,
                customStyle,
              ]}>
              <CountryPicker
                {...{
                  countryCode,
                  withFilter: true,
                  withFlag: true,
                  withAlphaFilter: false,
                  withCallingCode: true,
                  withEmoji: true,
                  onSelect,
                  countryCodes,
                  onClose,
                }}
                visible={showPicker}
              />
              <Text style={[styles.countryText, customStyleCountryCode]}>
                + {country_code !== '' ? country_code : ''}
              </Text>
              <MaterialIcons
                name="expand-more"
                size={14}
                color={StyleGuide.Colors.shades.grey[100]}
              />
            </TouchableOpacity>
            // </View>
          )}

          <View
            style={[
              styles.inputContainer,
              styles.bigBox,
              styles.inputBox,
              touched && !isEmpty(value) && styles.successInput,
              showLabel &&
                labelType === 'integrated' &&
                focused && {
                  borderColor: StyleGuide.Colors.shades.blue[200],
                },
              customStyle,
              showError && !!error && styles.errorInput,
            ]}>
            {showLabel && labelType === 'integrated' && (
              <Text
                style={[
                  styles.labelText,
                  labelType && styles.floatingLabelStyle,
                  touched && showError && !!error && styles.errorMsgLabel,
                  !focused && {
                    top:
                      // 18,
                      Platform.OS === 'ios'
                        ? scaledSize(15)
                        : Number(scale) < 2.75
                        ? scaledSize(18)
                        : scaledSize(15),
                    color: props.placeholderTextColor,
                    fontSize: scaledSize(14),
                    lineHeight: scaledSize(18),
                    zIndex: 0,
                  },
                  !focused &&
                    !isEmpty(value) && {
                      display: 'none',
                    },
                  extraStyleLabelText,
                ]}>
                {label || placeholder}
              </Text>
            )}

            {showLabel && labelType === 'normal' && (
              <Text style={[styles.labelText, extraStyleLabelText]}>
                {label || placeholder}
              </Text>
            )}

            {showLabel && labelType === 'split' && (
              <View
                style={[
                  styles.splitLabelTextWrapper,
                  extraStyleSplitLabelTextWrapper,
                ]}>
                <Text
                  style={[
                    styles.labelText,
                    styles.splitLabelText,
                    extraStyleLabelText,
                  ]}>
                  {label || placeholder}
                </Text>
                <Text
                  style={[
                    styles.labelText,
                    styles.splitLabelText,
                    styles.splitBackLabelText,
                    extraStyleSplitBackLabelText,
                  ]}>
                  {backLabel}
                </Text>
              </View>
            )}

            {prepend && <View>{prepend}</View>}

            <TextInput
              ref={ref}
              autoCapitalize={autoCapitalize}
              style={[styles.input, customStyleTextInput]}
              placeholder={
                labelType === 'integrated'
                  ? showIntegratedLabelPlaceHolder &&
                    focused &&
                    !isEmpty(placeholder)
                    ? placeholder
                    : ''
                  : !isEmpty(placeholder)
                  ? placeholder
                  : ''
              }
              onFocus={() => {
                onInputFocus && onInputFocus();
                setFocused(true);
              }}
              onBlur={() => {
                onInputBlur && onInputBlur();

                if (value && value.length) {
                  return;
                }
                setFocused(false);
              }}
              onChange={e => {
                if (onChange) {
                  onChange(e);
                }
              }}
              returnKeyType={returnKeyType}
              {...props}
              value={value}
            />

            {append && <View>{append}</View>}
          </View>
        </View>

        {showError && touched && !!error && (
          <Text style={styles.errorMsgText}>{error?.error!}</Text>
        )}
        {smallText && (
          <Text style={[styles.smallText, extraStyleSmallText]}>
            {smallText}
          </Text>
        )}
      </TouchableOpacity>
    );
  },
);

export default ShepherdTextInput;

const styles: GenericStylesProp = StyleSheet.create({
  touchableWrapper: {
    flex: 1,
    marginBottom: scaledSize(20),
  },
  mainWrapper: {},
  inputWrapper: {flexDirection: 'row'},
  inputContainer: {
    color: StyleGuide.Colors.black,
    fontFamily: 'DMSans-Regular',
    flex: 1,
    position: 'relative',
  },
  input: {
    fontFamily: 'DMSans-Regular',
    flex: 1,
    fontSize: StyleGuide.Typography[12],
    color: StyleGuide.Colors.primary,
    lineHeight: scaledSize(17),
  },

  countryText: {
    fontFamily: 'DMSans-Regular',
    fontSize: StyleGuide.Typography[12],
    lineHeight: scaledSize(17),
    color: StyleGuide.Colors.shades.grey[100],
  },

  smallBox: {
    // padding: scaledSize(12),
    marginRight: scaledSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  bigBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'ios' ? scaledSize(16) : 0,
  },

  inputBox: {
    backgroundColor: StyleGuide.Colors.white,
    borderRadius: scaledSize(10),
    paddingHorizontal: scaledSize(10),
    marginVertical: scaledSize(5),
    borderColor: StyleGuide.Colors.shades.grey[1500],
    borderWidth: Platform.OS === 'ios' ? scaledSize(0.5) : scaledSize(1),
  },

  errorMsgText: {
    color: StyleGuide.Colors.shades.red[100],
    fontSize: StyleGuide.Typography[10],
    marginVertical: scaledSize(6),
    fontFamily: 'DMSans-Regular',
  },

  successInput: {
    borderColor: StyleGuide.Colors.primary,
    // borderColor: StyleGuide.Colors.shades.grey[1500],
  },

  errorInput: {
    borderColor: StyleGuide.Colors.shades.red[100],
  },
  splitLabelTextWrapper: {
    position: 'absolute',
    top: scaledSize(-24),
    left: scaledSize(0),
    right: scaledSize(0),
    flex: 1,
    // left: scaledSize(4),
    width: '105%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  splitLabelText: {
    position: 'relative',
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    top: scaledSize(0),
    left: scaledSize(0),
    fontSize: scaledSize(14),
    lineHeight: scaledSize(20),
    color: StyleGuide.Colors.shades.blue[1400],
    // ...padding(0, 0),
  },
  splitBackLabelText: {
    fontSize: scaledSize(12),
    lineHeight: scaledSize(16),
    color: StyleGuide.Colors.shades.grey[1800],
  },
  labelText: {
    position: 'absolute',
    top: scaledSize(-24),
    left: scaledSize(4),
    fontSize: scaledSize(12),
    lineHeight: scaledSize(16),
    fontFamily: 'DMSans-Regular',
    fontWeight: Platform.OS === 'ios' ? 400 : 600,
    color: StyleGuide.Colors.primary,
    backgroundColor: StyleGuide.Colors.white,
    ...padding(0, 5),
  },

  smallText: {
    fontFamily: 'DMSans-Regular',
    fontWeight: '500',
    fontSize: scaledSize(12),
    lineHeight: scaledSize(16),
    color: StyleGuide.Colors.shades.grey[1800],
  },

  floatingLabelStyle: {
    color: StyleGuide.Colors.shades.blue[200],
    top: scaledSize(-9),
    zIndex: 1,
    left: scaledSize(20),
  },

  errorMsgLabel: {
    color: StyleGuide.Colors.shades.red[100],
  },
});
