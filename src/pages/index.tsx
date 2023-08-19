import CreateNote from "@/components/CreateNote";
import Layout from "@/components/Layout";
import ListNotes from "@/components/ListNotes";
import { Container } from "@mui/material";
import { NextPage } from "next";

const Basic: NextPage = () => {
  return (
    <Layout title="Dashboard">
      <Container maxWidth="sm">
        <CreateNote />
        <ListNotes />
      </Container>
    </Layout>
  );
};

export default Basic;
