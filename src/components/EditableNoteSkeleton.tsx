import { Box, Skeleton, Stack } from "@mui/material";

const EditableNoteSkeleton = () => {
  return (
    <Stack width="100%" spacing={2} paddingTop={3}>
      <Skeleton height={80} width="100%" />
      <Box sx={{ width: "100%" }}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton width="50%" />
      </Box>
    </Stack>
  );
};

export default EditableNoteSkeleton;
