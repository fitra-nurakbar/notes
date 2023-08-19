import { useDeleteNote, useFetchAllNotes } from "@/features/mutations/useNotes";
import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import ListNotesSkeleton from "./ListNotesSkeleton";
import SimpleSnackbar from "./SimpleSnackbar";

const ListNotes = () => {
  const {
    data,
    isLoading: fetchNotesLoading,
    error: fetchNotesError,
  } = useFetchAllNotes();
  const {
    mutate: deleteNote,
    isLoading: deleteNoteLoading,
    error: deleteNoteError,
  } = useDeleteNote();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleDelete = (id: number) => {
    deleteNote(id);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const checked = event.target.checked;
    if (checked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, id]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== id)
      );
    }
  };

  return (
    <>
      {fetchNotesError && (
        <SimpleSnackbar
          severity="error"
          message="Error: Failed to fetch data"
        />
      )}
      {deleteNoteError && (
        <SimpleSnackbar
          severity="error"
          message="Error: Failed to delete data"
        />
      )}

      {fetchNotesLoading ? (
        <ListNotesSkeleton />
      ) : data && data.length > 0 ? (
        <List dense>
          {data
            .map((note, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => handleDelete(note.id as number)}
                      edge="end"
                      aria-label="delete"
                      disabled={deleteNoteLoading}
                    >
                      {deleteNoteLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        <DeleteIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                }
              >
                <Checkbox
                  edge="start"
                  checked={checkedItems.includes(note.id as number)}
                  onChange={(event) =>
                    handleCheckboxChange(event, note.id as number)
                  }
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemButton LinkComponent={Link} href={`/note/${note.id}`}>
                  <ListItemText
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    primary={note.title}
                    secondary={note.content}
                  />
                </ListItemButton>
              </ListItem>
            ))
            .reverse()}
        </List>
      ) : (
        <Box component="h1" sx={{ textAlign: "center" }}>
          No notes found.
        </Box>
      )}
    </>
  );
};

export default ListNotes;
