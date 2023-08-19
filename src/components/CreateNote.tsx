import { useCreateNote } from "@/features/mutations/useNotes";
import { TypeSnackbar } from "@/utils/types/Snackbar";
import { Add as CreateIcon } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import SimpleSnackbar from "./SimpleSnackbar";

const CreateNote = () => {
  const {
    status: statusNote,
    mutate: createNote,
    isLoading: isCreatingNote,
  } = useCreateNote();
  const [alertMessage, setAlertMessage] = useState<TypeSnackbar>({
    severity: undefined,
    message: "",
  });

  const handleCreate = async () => {
    await createNote({ title: "Untitled", content: "" });
  };

  useEffect(() => {
    switch (statusNote) {
      case "success":
        return setAlertMessage({
          ...alertMessage,
          severity: "success",
          message: "Note created successfully!",
        });
      case "error":
        return setAlertMessage({
          ...alertMessage,
          severity: "error",
          message: "Error: Failed to create note",
        });
      default:
        return;
    }
  }, [statusNote]);

  return (
    <>
      <Stack
        sx={{
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(255, 255, 255, .5)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box component="h1">Notes</Box>
        <Box>
          <Tooltip title="Create New Note">
            <IconButton
              onClick={handleCreate}
              disabled={isCreatingNote}
              size="small"
              sx={{ borderRadius: 1 }}
            >
              {statusNote === "loading" ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <CreateIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
      {statusNote === "error" ||
        (statusNote === "success" && (
          <SimpleSnackbar
            severity={alertMessage.severity}
            message={alertMessage.message}
          />
        ))}
    </>
  );
};

export default CreateNote;
