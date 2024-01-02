import React from 'react';
import {AuthProvider} from './Auth';
import {UserProvider} from './User';
export {default as useAuth, useProvideAuth} from './Auth';

// import {MenuProvider} from 'react-native-popup-menu';
// import {MixPanelEventProvider} from './MixPanelEvent';

export type {User as UserType} from './Auth';

export default function ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <>
      {/* <MenuProvider> */}
      <AuthProvider>
        <UserProvider>
          {/* <MixPanelEventProvider> */}
          {children}
          {/* </MixPanelEventProvider> */}
        </UserProvider>
      </AuthProvider>
      {/* </MenuProvider> */}
    </>
  );
}
