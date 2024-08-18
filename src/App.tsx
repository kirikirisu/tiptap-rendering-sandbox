import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";

const GET_SINGLE_TODO = "get-single-todo";

function useGetSingleTodo() {
  return useQuery<{
    id: number;
    userId: number;
    title: string;
    body: string;
  }>({
    queryKey: [GET_SINGLE_TODO],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      const data = await response.json();

      return data;
    },
  });
}

const extensions = [StarterKit];

function App() {
  const queryClient = useQueryClient();

  const { data } = useGetSingleTodo();
  const content = data === undefined ? "" : `<p>${data.body}</p>`;

  const editor = useEditor(
    {
      extensions,
      content,
    },
    [content]
  );

  if (editor === null) return false;

  return (
    <>
      <EditorContent editor={editor} />
      <button
        type="button"
        onClick={() => {
          if (data === undefined) return;

          queryClient.setQueryData([GET_SINGLE_TODO], {
            ...data,
            body: "<p>updated content</p>",
          });
        }}
      >
        コンテンツを更新
      </button>
    </>
  );
}

export default App;
