import { axiosInstance } from "@/lib/axiosInstance";
import { TypeNotes } from "@/utils/types/Notes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useCreateNote = () => {
  const queryClient = useQueryClient();

  const { data, status, mutate, isLoading, error } = useMutation<
    void,
    Error,
    TypeNotes
  >(
    async (data) => {
      try {
        await axiosInstance.post("/api/note", data);
      } catch (e) {
        throw e;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["list-notes"] });
      },
    }
  );

  return { data, status, mutate, isLoading, error };
};

const useFetchAllNotes = () => {
  const { data, isLoading, isFetching, error } = useQuery<TypeNotes[], Error>({
    queryKey: ["list-notes"],
    queryFn: async () => {
      try {
        const notesResponse = await axiosInstance.get("/api/note");
        const notes = await notesResponse.data.data;

        return notes;
      } catch (e) {
        throw e;
      }
    },
  });

  return { data, isLoading, isFetching, error };
};

const useFetchNote = (id: number | undefined) => {
  const { data, isLoading, isFetching, error } = useQuery<TypeNotes, Error>({
    queryKey: ["note", id],
    queryFn: async () => {
      try {
        const noteResponse = await axiosInstance.get(`/api/note/${id}`);
        const note = await noteResponse.data.data;

        return note;
      } catch (e) {
        throw e;
      }
    },
  });

  return { data, isLoading, isFetching, error };
};

const useUpdateNote = (id: number | undefined) => {
  const queryClient = useQueryClient();

  const { status, mutate, isLoading, error } = useMutation<
    void,
    Error,
    TypeNotes
  >(
    async (data) => {
      try {
        await axiosInstance.put(`/api/note/${id}`, data);
      } catch (e) {
        throw e;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["list-notes"] });
        queryClient.invalidateQueries({ queryKey: ["note", id] });
      },
    }
  );

  return { status, mutate, isLoading, error };
};

const useDeleteNote = () => {
  const queryClient = useQueryClient();
  const { status, mutate, isLoading, error } = useMutation<void, Error, number>(
    async (id) => {
      try {
        await axiosInstance.delete(`/api/note/${id}`);
      } catch (e) {
        throw e;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["list-notes"] });
      },
    }
  );

  return { status, mutate, isLoading, error };
};

export {
  useCreateNote,
  useDeleteNote,
  useFetchAllNotes,
  useFetchNote,
  useUpdateNote,
};
