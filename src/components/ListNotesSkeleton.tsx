import { List, ListItem, Skeleton, Stack } from "@mui/material";

const CountList = 8;

const ListNotesSkeleton = () => {
  const listSkeleton = Array.from({ length: CountList }, (_, index) => (
    <ListItem key={index}>
      <Stack direction="row" columnGap={1} width="100%" alignItems="center">
        <Skeleton variant="rounded" height={40} width={40} />
        <Skeleton variant="rounded" height={40} width="70%" />
        <Skeleton variant="circular" height={40} width={40} />
      </Stack>
    </ListItem>
  ));

  return <List>{listSkeleton}</List>;
};

export default ListNotesSkeleton;
