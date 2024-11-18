import React, { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import Layout from "@/components/Layouts/Layout/Layout";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import NavigationDrawer from "./NavigationDrawer";

const ProfileLayout = ({
  loading,
  children,
}: {
  loading: boolean;
  children: ReactNode;
}) => {
  return (
    <Layout>
      <NavigationDrawer />
      {loading ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
          sx={{ height: "65vh" }} // Ensure the loading spinner covers the full height
        >
          <HexagonSpinner />
          <Typography marginTop="32px">
            Fetching Data from the Hive Mind...
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "1300px",
            width: "100%",
            flexGrow: 1,
            margin: "0 auto", // Center the content horizontally
          }}
        >
          {children}
        </Box>
      )}
    </Layout>
  );
};

export default ProfileLayout;
