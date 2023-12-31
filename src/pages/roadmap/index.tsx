//import styles from "../styles/Home.module.css";
import Layout from "../../Components/Layout/Layout";
import Head from "next/head";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import Container from "Components/Container/Container";

export default function Roadmap() {
  return (
    <>
      <Layout>
        <Head>
          <title>Buzzkill Roadmap</title>
          {/* <meta name="description" content="noindex,nofollow" /> */}
        </Head>
        <Container fullWidth={true}>
          <Box
            position="relative"
            width="full"
            height="full" // Fixed height for the hero image container
            display="flex" // Enable Flexbox
            justifyContent="center" // Center content horizontally
            alignItems="center" // Center content vertically
          >
            <Image
              src="/roadmap/Roadmap_design-02-01.svg"
              alt="Hero Image"
              borderRadius="0px"
              width="full"
              height="full"
              objectFit="cover"
              objectPosition="center center" // Adjust this if you need to shift the hero image
            />
          </Box>
        </Container>
      </Layout>
    </>
  );
}
