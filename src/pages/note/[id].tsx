import EditableNote from "@/components/EditableNote";
import EditableNoteSkeleton from "@/components/EditableNoteSkeleton";
import Layout from "@/components/Layout";
import { useFetchNote } from "@/features/mutations/useNotes";
import { TypeNotes } from "@/utils/types/Notes";
import { Backdrop, Box, CircularProgress, Container } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NoteWithId() {
  const router = useRouter();
  const { id } = router.query;
  const noteId = parseInt(id as string);
  const { data, isLoading, error } = useFetchNote(noteId);

  const [input, setInput] = useState<TypeNotes>({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (data) {
      setInput({
        title: data.title,
        content: data.content,
      });
    }
  }, [data]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout title={data?.title}>
      <Container maxWidth="sm">
        {isLoading ? (
          <EditableNoteSkeleton />
        ) : data ? (
          <EditableNote id={noteId} title={data.title} content={data.content} />
        ) : (
          <Box component="h1" sx={{ textAlign: "center" }}>
            No note found.
          </Box>
        )}
      </Container>
    </Layout>
  );
}
