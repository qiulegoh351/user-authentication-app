export type AppData = {
  language: string;
};

export type AppActions = {
  initAppState: () => void;

  setLanguage: (language: string) => void;
};

export type AppState = {
  data: AppData;
  actions: AppActions;
};

export type SigninPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginAction = {
  data: SigninPayload;
  onSuccess: () => void;
  onError: (props: { message: string }) => void;
};

export type SignupAction = {
  data: SignupPayload;
  onSuccess: () => void;
  onError: (props: { message: string }) => void;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: number;
};

export type AuthUser = User & {
  token: string;
};

export type HomeItem = {
  label: string;
  value?: string;
};
