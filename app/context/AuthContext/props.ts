import { ReactNode } from 'react';
import { AuthUser, LoginAction, SignupAction } from '@app/@types';

export type AuthProviderProps = {
  children?: ReactNode;
};

export type AuthContextType = {
  isAuthenticated: boolean | null;
  user?: AuthUser | null;
  login: (props: LoginAction) => void;
  signup: (props: SignupAction) => void;
  logout: () => void;
  deleteAccount: () => void;
};
