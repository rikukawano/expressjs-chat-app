import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface IState {
  id: string | null;
  username: string | null;
}

type Action = { type: "SET_USER"; payload: { id: string | null; username: string | null } };

const reducer = (state: IState, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      console.log(action.payload);
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
      };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: IState;
  dispatch: React.Dispatch<Action>;
}>({
  state: { id:null, username: null },
  dispatch: () => null,
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { id: null, username: null });

  useEffect(() => {}, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
