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
