import {
  useContext,
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type PropsWithChildren,
} from "react";
import { Editor } from "@tiptap/react";

type TiptapEditor = Editor | undefined;

const tiptapEditorContext = createContext<TiptapEditor>(undefined);
const setTiptapEditorContext = createContext<
  Dispatch<SetStateAction<TiptapEditor>> | undefined
>(undefined);

export function TiptapEditorProvider({ children }: PropsWithChildren) {
  const [tiptapEditor, setTiptapEditor] = useState<TiptapEditor>(undefined);

  return (
    <tiptapEditorContext.Provider value={tiptapEditor}>
      <setTiptapEditorContext.Provider value={setTiptapEditor}>
        {children}
      </setTiptapEditorContext.Provider>
    </tiptapEditorContext.Provider>
  );
}

export function useGetTiptapEditor() {
  const value = useContext(tiptapEditorContext);

  return value;
}

export function useSetTiptapEditor() {
  const value = useContext(setTiptapEditorContext);

  if (value === undefined) {
    throw new Error(
      "useSetTiptapEditor を使用するコンポーネントは setTiptapEditorContext でラップする必要があります。 "
    );
  }

  return value;
}
