import { useSafeContext } from "@/hooks /use-safe-context";
import { createContext, useRef } from "react";
import { create, type StoreApi, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

type Mode = "viewer" | "edit";

interface State {
  background: string | null;
  width: number;
  height: number;
  scale: number;
  mode: Mode;
}

const initialState: State = {
  background: null,
  width: 0,
  height: 0,
  scale: 0.5,
  mode: "viewer",
};

interface Actions {
  // editor actions
  zoomIn(): void;
  zoomOut(): void;

  // setters
  setBackgroundImage(image: string): void;
  setDimensions(width: number, height: number): void;
  setScale(scale: number): void;
  setMode(mode: Mode): void;
}

type Store = State & Actions;

export const createBudgetsStore = () => {
  return create<Store>()(
    immer((set) => ({
      ...initialState,
      setBackgroundImage: (image: string) => {
        set((state) => {
          state.background = image;
        });
      },
      setDimensions: (width: number, height: number) => {
        set((state) => {
          state.width = width;
          state.height = height;
        });
      },
      zoomIn() {
        set((state) => {
          state.scale = Math.min(state.scale + 0.1, 5);
        });
      },
      zoomOut() {
        set((state) => {
          state.scale = Math.max(state.scale - 0.1, 0.2);
        });
      },
      setScale(scale: number) {
        set((state) => {
          state.scale = scale;
        });
      },
      setMode(mode: Mode) {
        set((state) => {
          state.mode = mode;
        });
      },
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
