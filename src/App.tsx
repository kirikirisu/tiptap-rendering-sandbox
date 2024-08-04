import CharacterCount from "@tiptap/extension-character-count";
import ImageExtension from "@tiptap/extension-image";
import { Editor } from "@tiptap/core";
import { memo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./App.css";

const extensions = [StarterKit, CharacterCount, ImageExtension];

const content = "<p>Hello World!</p>";

const CharacterCounter = memo(({ charCount }: { charCount: number }) => {
  return <p>文字数：{charCount}</p>;
});

const ImageCounter = ({ imageCount }: { imageCount: number }) => {
  return <p>画像枚数：{imageCount}</p>;
};

function collectImageCount(editor: Editor) {
  let imageCount = 0;

  editor.state.doc.descendants((node) => {
    if (node.type.name === ImageExtension.name) {
      imageCount++;
    }
  });

  return imageCount;
}

function App() {
  const [charCount, setCharCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);

  const editor = useEditor({
    extensions,
    content,
    onUpdate({ editor }) {
      setCharCount(editor.storage.characterCount.characters());
      setImageCount(collectImageCount(editor));
    },
  });

  if (editor === null) return false;

  return (
    <>
      <EditorContent editor={editor} />
      <CharacterCounter charCount={charCount} />
      <ImageCounter imageCount={imageCount} />
      <button
        type="button"
        onClick={() => {
          editor?.commands.setContent("<p>Update content!</p>");
        }}
      >
        コンテンツを更新
      </button>
      <button
        type="button"
        onClick={() => {
          editor
            .chain()
            .focus()
            .setTextSelection(0)
            .setImage({ src: "https://placehold.jp/150x150.png" })
            .run();
        }}
      >
        画像を追加する
      </button>
    </>
  );
}

export default App;
