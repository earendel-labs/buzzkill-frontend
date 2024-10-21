import React from "react";
import { Box } from "@mui/material";
import Layout from "@/components/Layouts/Layout/Layout";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import TabNavigation from "./TabNavigation";

const ProfilePage = ({ loading }: { loading: boolean }) => {
  return (
    <Layout>
      {loading ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
        >
          <HexagonSpinner />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            flexGrow: 1,
          }}
        >
          <TabNavigation />
        </Box>
      )}
    </Layout>
  );
};

export default ProfilePage;
