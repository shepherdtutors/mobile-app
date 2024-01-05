import React, {memo} from 'react';
import {applySpacing} from '../assets/styles';

export type IconProps = {
  type:
    | 'ionicons'
    | 'octicons'
    | 'material-icons'
    | 'feathericons'
    | 'material-community-icons'
    | 'antdesigns'
    | 'fontawesome5'
    | 'ionicons'
    | 'evilicons';
  [key: string]: any;
};

//TODO: Potential reduce bundle size by removing unused font set from app
export const Icon = ({type, ...props}: IconProps) => {
  props.size = applySpacing(props.size) || undefined;
  if (type === 'ionicons') {
    const {default: Ionicons} = require('react-native-vector-icons/Ionicons');
    return <Ionicons {...props} />;
  }
  if (type === 'antdesigns') {
    const {default: AntDesign} = require('react-native-vector-icons/AntDesign');
    return <AntDesign {...props} />;
  }
  if (type === 'feathericons') {
    const {default: Feather} = require('react-native-vector-icons/Feather');
    return <Feather {...props} />;
  }
  if (type === 'octicons') {
    const {default: Octicons} = require('react-native-vector-icons/Octicons');
    return <Octicons {...props} />;
  }
  if (type === 'material-icons') {
    const {
      default: MaterialIcons,
    } = require('react-native-vector-icons/MaterialIcons');
    return <MaterialIcons {...props} />;
  }
  if (type === 'material-community-icons') {
    const {
      default: MaterialCommunityIcons,
    } = require('react-native-vector-icons/MaterialCommunityIcons');
    return <MaterialCommunityIcons {...props} />;
  }
  if (type === 'fontawesome5') {
    const {
      default: FontAwesome5,
    } = require('react-native-vector-icons/FontAwesome5');
    return <FontAwesome5 {...props} />;
  }
  if (type === 'evilicons') {
    const {default: EvilIcons} = require('react-native-vector-icons/EvilIcons');
    return <EvilIcons {...props} />;
  }
  if (type === 'ionicons') {
    const {default: IonIcons} = require('react-native-vector-icons/Ionicons');
    return <IonIcons {...props} />;
  }
  return null;
};

export default memo(Icon);
