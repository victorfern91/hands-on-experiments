import { useSafeContext } from "@/hooks /use-safe-context";
import { createContext, useRef } from "react";
import { create, type StoreApi, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

interface State {
  background: string | null;
}

const initialState: State = {
  background: null,
};

interface Actions {}

type Store = State & Actions;

export const createBudgetsStore = () => {
  return create<Store>()(
    immer((set) => ({
      ...initialState,
    })),
  );
};

const EditorStoreContext = createContext<StoreApi<Store> | null>(null);

interface IStoreProviderProps {
  children: React.ReactNode;
}

export const EditorStoreProvider = ({ children }: IStoreProviderProps) => {
  const storeRef = useRef<StoreApi<Store>>(null);

  if (!storeRef.current) {
    storeRef.current = createBudgetsStore();
  }

  return (
    <EditorStoreContext.Provider value={storeRef.current}>
      {children}
    </EditorStoreContext.Provider>
  );
};

export const useEditorStore = <T,>(selector: (state: Store) => T) => {
  const store = useSafeContext(EditorStoreContext, "EditorStoreContext");
  return useStore(store, selector);
};
