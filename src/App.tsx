import CharacterCount from "@tiptap/extension-character-count";
import { memo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./App.css";

const extensions = [StarterKit, CharacterCount];

const content = "<p>Hello World!</p>";

const CharacterCounter = memo(({ charCount }: { charCount: number }) => {
  return <p>{charCount}</p>;
});

function App() {
  const [charCount, setCharCount] = useState(0);
  const editor = useEditor({
    extensions,
    content,
    onUpdate({ editor }) {
      setCharCount(editor.storage.characterCount.characters());
    },
  });

  if (editor === null) return false;

  return (
    <>
      <EditorContent editor={editor} />
      <CharacterCounter charCount={charCount} />
      <button
        type="button"
        onClick={() => {
          editor?.commands.setContent("<p>Update content!</p>");
        }}
      >
        コンテンツを更新
      </button>
    </>
  );
}

export default App;
