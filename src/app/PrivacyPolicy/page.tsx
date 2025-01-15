"use client";

import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import Layout from "@/components/Layouts/Layout/Layout";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Box
        sx={{ maxWidth: "1000px", mx: "auto", px: 2, py: 4, color: "white" }}
      >
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body2" gutterBottom>
          Last updated: January 13, 2025
        </Typography>

        <Typography variant="body1" paragraph>
          This Privacy Policy (“Policy”) describes the policies and procedures
          of <strong>Buzzkill Studio Inc.</strong> (“the Company,” “We,” “Us,”
          or “Our”) regarding the collection, use, and disclosure of your
          information when you use Our Services, including any blockchain-based
          features, and informs you of your privacy rights and how the law
          protects you.
        </Typography>
        <Typography variant="body1" paragraph>
          We endeavor to comply with globally recognized privacy principles and
          standards, including those embodied by the European Union’s General
          Data Protection Regulation (GDPR) and the California Consumer Privacy
          Act (CCPA). By using the Service, you agree to the collection and use
          of information in accordance with this Policy.{" "}
          <strong>
            If you do not agree with this Policy, you must not use Our Services.
          </strong>
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          1. Interpretation and Definitions
        </Typography>

        <Typography variant="h6" gutterBottom>
          1.1 Interpretation
        </Typography>
        <Typography variant="body1" paragraph>
          Words whose initial letters are capitalized have defined meanings. The
          same definitions apply whether the words appear in singular or plural.
        </Typography>

        <Typography variant="h6" gutterBottom>
          1.2 Definitions
        </Typography>
        <Typography variant="body1" paragraph>
          For the purposes of this Privacy Policy:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              <strong>Account</strong> means a unique account created for You to
              access Our Service or parts of Our Service.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Affiliate</strong> means an entity that controls, is
              controlled by, or is under common control with a party, where
              “control” means ownership of 50% or more of the shares, equity
              interest, or other securities entitled to vote for election of
              directors or other managing authority.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Company</strong> (referred to as “the Company,” “We,”
              “Us,” or “Our”) refers to Buzzkill Studio Inc., Intershore
              Chambers, Road Town, Tortola, British Virgin Islands.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Cookies</strong> are small files placed on Your computer,
              mobile device, or any other device by a website, containing
              details of Your browsing history on that website among its many
              uses.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Country</strong> refers to the British Virgin Islands.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Device</strong> means any device that can access the
              Service, such as a computer, cellphone, or digital tablet.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Personal Data</strong> is any information that relates to
              an identified or identifiable individual, and may include
              information defined as “personal data,” “personal information,” or
              “personally identifiable information” under applicable data
              protection laws.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Service</strong> refers to the Website, any associated
              blockchain-based game features, and any mobile or software
              applications provided by the Company.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Service Provider</strong> means any natural or legal
              person who processes data on behalf of the Company. It refers to
              third-party companies or individuals employed by the Company to
              facilitate the Service, provide the Service on behalf of the
              Company, perform services related to the Service, or assist the
              Company in analyzing how the Service is used.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Usage Data</strong> refers to data collected
              automatically, either generated by the use of the Service or from
              the Service infrastructure itself (for example, the duration of a
              page visit).
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Website</strong> refers to Buzzkill, accessible from{" "}
              <a href="https://buzzkill.world" target="_blank" rel="noreferrer">
                https://buzzkill.world
              </a>
              , as well as any subdomains or related sites operated by the
              Company.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>You</strong> means the individual accessing or using the
              Service, or the company or other legal entity on behalf of which
              such individual is accessing or using the Service, as applicable.
            </Typography>
          </li>
        </ul>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          2. Collecting and Using Your Personal Data
        </Typography>

        <Typography variant="h6" gutterBottom>
          2.1 Types of Data Collected
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Personal Data</strong>
          <br />
          While using Our Service, We may ask You to provide certain personally
          identifiable information that can be used to contact or identify You.
          Personally identifiable information may include, but is not limited
          to:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">Name</Typography>
          </li>
          <li>
            <Typography variant="body1">Email address</Typography>
          </li>
          <li>
            <Typography variant="body1">
              Cryptocurrency wallet address(es) (if linked to Your Account or
              gameplay)
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Any additional information You voluntarily submit
            </Typography>
          </li>
        </ul>

        <Typography variant="body1" paragraph>
          <strong>Usage Data</strong>
          <br />
          Usage Data is collected automatically when using the Service. It may
          include information such as Your Device’s (e.g., IP address), browser
          type and version, the pages You visit, the time and date of Your visit
          and other diagnostic data.
        </Typography>
        <Typography variant="body1" paragraph>
          When You access the Service via a mobile device, We may also collect
          certain information automatically, including the type of mobile device
          You use, the IP address of Your mobile device, Your mobile operating
          system, and other diagnostic data.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>2.2 Blockchain Data</strong>
          <br />
          Because we provide a blockchain-based game, certain data regarding
          Your interactions (including wallet addresses and public transactions)
          may be recorded on a public blockchain. This data is, by its nature,
          public and cannot be erased or changed. You acknowledge that all
          blockchain transactions are publicly accessible and may not be
          controlled by the Company. We are not liable for how third parties use
          this on-chain data.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          3. Tracking Technologies and Cookies
        </Typography>
        <Typography variant="body1" paragraph>
          We use Cookies and similar tracking technologies (e.g., beacons, tags,
          scripts) to track activity on Our Service and to store certain
          information. The technologies We use may include:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              <strong>Cookies or Browser Cookies:</strong> A cookie is a small
              file placed on your device. You can instruct Your browser to
              refuse all Cookies or to indicate when a Cookie is being sent.
              However, if You do not accept Cookies, You may not be able to use
              some parts of Our Service.
            </Typography>
          </li>
        </ul>

        <Typography variant="body1" paragraph>
          Cookies can be "Persistent" or "Session" Cookies:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              <strong>Persistent Cookies</strong> remain on Your personal
              computer or mobile device when You go offline.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Session Cookies</strong> are deleted as soon as You close
              Your web browser.
            </Typography>
          </li>
        </ul>

        <Typography variant="body1" paragraph>
          We use both Session and Persistent Cookies for the purposes set out
          below:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              <strong>Necessary / Essential Cookies</strong>
            </Typography>
            <Typography variant="body2">Type: Session Cookies</Typography>
            <Typography variant="body2">Administered by: Us</Typography>
            <Typography variant="body1" paragraph>
              Purpose: These Cookies are essential to provide You with services
              available through the Website and to enable You to use some
              features. They help authenticate users and prevent fraudulent use
              of user accounts. Without these Cookies, the services that You
              have asked for cannot be provided, and We only use these Cookies
              to provide You with those services.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Cookies Policy / Notice Acceptance Cookies</strong>
            </Typography>
            <Typography variant="body2">Type: Persistent Cookies</Typography>
            <Typography variant="body2">Administered by: Us</Typography>
            <Typography variant="body1" paragraph>
              Purpose: These Cookies identify if users have accepted the use of
              cookies on the Website.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Functionality Cookies</strong>
            </Typography>
            <Typography variant="body2">Type: Persistent Cookies</Typography>
            <Typography variant="body2">Administered by: Us</Typography>
            <Typography variant="body1" paragraph>
              Purpose: These Cookies allow Us to remember choices You make when
              You use the Website, such as remembering Your login details or
              language preference. The purpose of these Cookies is to provide
              You with a more personal experience and to avoid You having to
              re-enter Your preferences every time You use the Website.
            </Typography>
          </li>
        </ul>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          4. Use of Your Personal Data
        </Typography>
        <Typography variant="body1" paragraph>
          The Company may use Personal Data for the following purposes:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              <strong>To provide and maintain Our Service</strong>, including to
              monitor the usage of Our Service.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>To manage Your Account:</strong> to manage Your
              registration as a user of the Service. The Personal Data You
              provide can give You access to different functionalities of the
              Service available to You as a registered user.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>For the performance of a contract:</strong> including the
              development, compliance, and undertaking of the purchase contract
              for products, items, or services You have purchased or any other
              contract with Us through the Service.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>To contact You:</strong> including via email, or other
              equivalent forms of electronic communication, regarding updates or
              informative communications related to functionalities, products,
              or services contracted, including security updates when necessary
              or reasonable.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>To provide You</strong> with news, special offers, and
              general information about other goods, services, and events that
              We offer that are similar to those You have already purchased or
              inquired about, unless You have opted not to receive such
              information.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>To manage Your requests:</strong> to attend and manage
              Your requests to Us.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>For business transfers:</strong> We may use Your
              information to evaluate or conduct a merger, divestiture,
              restructuring, reorganization, dissolution, or other sale or
              transfer of some or all of Our assets.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>For other purposes:</strong> such as data analysis,
              identifying usage trends, determining the effectiveness of Our
              promotional campaigns, and evaluating and improving Our Service,
              products, services, marketing, and Your experience.
            </Typography>
          </li>
        </ul>

        <Typography variant="body1" paragraph>
          We may share Your personal information in the following situations:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              <strong>With Service Providers:</strong> to monitor and analyze
              the use of Our Service, to contact You, or to assist in delivering
              Our Services.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>For business transfers:</strong> in connection with or
              during negotiations of any merger, sale of Company assets,
              financing, or acquisition of all or a portion of Our business by
              another company.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>With business partners:</strong> to offer You certain
              products, services, or promotions.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>With other users:</strong> when You share personal
              information or otherwise interact in public areas with other
              users, such information may be viewed by all users and may be
              publicly distributed outside.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>With Your consent:</strong> We may disclose Your personal
              information for any other purpose with Your consent.
            </Typography>
          </li>
        </ul>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          5. Retention of Your Personal Data
        </Typography>
        <Typography variant="body1" paragraph>
          We will retain Your Personal Data only for as long as is necessary for
          the purposes set out in this Privacy Policy, and to the extent
          necessary to comply with our legal obligations (e.g., if We are
          required to retain data by applicable laws), resolve disputes, and
          enforce our legal agreements and policies.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Note on Blockchain Data:</strong> Data that is written to a
          public blockchain (e.g., transaction history, wallet addresses) may
          not be modified or deleted due to the immutable nature of blockchain
          technology. Please consider carefully before sharing personal
          information on the blockchain.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          6. Transfer of Your Personal Data
        </Typography>
        <Typography variant="body1" paragraph>
          Your information, including Personal Data, may be processed at the
          Company’s operating offices and other locations where the parties
          involved in the processing are located. This means that this
          information may be transferred to—and maintained on—computers located
          outside of Your state, province, country, or other governmental
          jurisdiction, where data protection laws may differ.
        </Typography>
        <Typography variant="body1" paragraph>
          We will take all steps reasonably necessary to ensure that Your data
          is treated securely and in accordance with this Privacy Policy. No
          transfer of Your Personal Data will take place to an organization or
          country unless there are adequate controls in place, including the
          security of Your data and other personal information.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          7. Delete Your Personal Data
        </Typography>
        <Typography variant="body1" paragraph>
          You have the right to request the deletion of Personal Data that We
          have collected from You. Our Service may give You the ability to
          delete certain information from within the Service (e.g., through Your
          account settings). You can also contact Us directly to request that We
          delete any Personal Data we store. We will respond to verified
          requests within a reasonable timeframe as required by applicable law.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>However,</strong> information recorded on the blockchain
          cannot be removed, modified, or deleted by the Company or anyone else.
          When exercising Your rights to delete or correct Personal Data, please
          be aware of the immutable nature of blockchain.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          8. Disclosure of Your Personal Data
        </Typography>

        <Typography variant="h6" gutterBottom>
          8.1 Business Transactions
        </Typography>
        <Typography variant="body1" paragraph>
          If the Company is involved in a merger, acquisition, or asset sale,
          Your Personal Data may be transferred. We will provide notice before
          Your Personal Data is transferred and becomes subject to a different
          Privacy Policy.
        </Typography>

        <Typography variant="h6" gutterBottom>
          8.2 Law Enforcement
        </Typography>
        <Typography variant="body1" paragraph>
          Under certain circumstances, We may be required to disclose Your
          Personal Data if mandated by law or in response to valid requests by
          public authorities (e.g., a court or a government agency).
        </Typography>

        <Typography variant="h6" gutterBottom>
          8.3 Other Legal Requirements
        </Typography>
        <Typography variant="body1" paragraph>
          We may disclose Your Personal Data in good faith if We believe such
          action is necessary to:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              Comply with a legal obligation
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Protect and defend the rights or property of the Company
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Prevent or investigate possible wrongdoing in connection with the
              Service
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Protect the personal safety of users of the Service or the public
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Protect against legal liability
            </Typography>
          </li>
        </ul>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          9. Security of Your Personal Data
        </Typography>
        <Typography variant="body1" paragraph>
          We care about the security of Your Personal Data but note that no
          method of transmission over the Internet or method of electronic
          storage is 100% secure. While We strive to use commercially acceptable
          means to protect Your Personal Data, We cannot guarantee its absolute
          security. Transactions on the blockchain are public and carry inherent
          risk.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          10. Children’s Privacy
        </Typography>
        <Typography variant="body1" paragraph>
          Our Service is not intended for anyone under the age of 13
          (“Children”). We do not knowingly collect personally identifiable
          information from individuals under 13. If You are a parent or guardian
          and become aware that Your child has provided Us with Personal Data,
          please contact Us so that We can take steps to remove that information
          from Our servers.
        </Typography>
        <Typography variant="body1" paragraph>
          If We need to rely on consent as a legal basis for processing Your
          information and Your country requires parental consent, We may require
          Your parent’s consent before We collect or use that information.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          11. Your Privacy Rights (GDPR, CCPA, etc.)
        </Typography>
        <Typography variant="body1" paragraph>
          Depending on where You reside, You may have certain privacy rights,
          such as:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              <strong>Right to Access</strong>: request copies of Your personal
              information.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Right to Rectify</strong>: request corrections of
              inaccurate information.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Right to Erase</strong>: request the deletion of Your
              personal data (subject to certain exceptions and blockchain
              limitations).
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Right to Restrict or Object to Processing</strong>:
              request We restrict or cease processing Your personal data under
              certain circumstances.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Right to Data Portability</strong>: request the transfer
              of Your personal data to another organization or directly to You.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>
                Right to Opt-Out of the Sale of Personal Information
              </strong>
              (if applicable under CCPA or similar laws): We do not sell Your
              personal information.
            </Typography>
          </li>
        </ul>
        <Typography variant="body1" paragraph>
          To exercise these rights, please contact Us. We will respond to valid
          requests in accordance with applicable laws.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          12. Links to Other Websites
        </Typography>
        <Typography variant="body1" paragraph>
          Our Service may contain links to other websites that are not operated
          by Us. If You click on a third-party link, You will be directed to
          that third party’s site. We strongly advise You to review the Privacy
          Policy of every site You visit. We have no control over and assume no
          responsibility for the content, privacy policies, or practices of any
          third-party sites or services.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          13. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update Our Privacy Policy from time to time. We will notify You
          of any changes by posting the new Privacy Policy on this page and
          updating the “Last updated” date at the top.
        </Typography>
        <Typography variant="body1" paragraph>
          If the changes are material, We will let You know via email or a
          prominent notice on Our Service before the change becomes effective.
          You are advised to review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when posted on
          this page.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          14. Disclaimer of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          By using Our blockchain-based game and related Services, You
          acknowledge and agree that:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              The Company is not responsible for any information permanently
              recorded on public blockchain(s).
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              The Company is not responsible for user errors, forgotten
              passwords, or unauthorized access to blockchain assets.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              The Company disclaims liability for any losses arising from the
              use of third-party wallet services or blockchain network outages,
              disruptions, or vulnerabilities.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              The Company’s obligations are limited to those expressly stated in
              this Privacy Policy and any other relevant terms and conditions
              provided by the Company.
            </Typography>
          </li>
        </ul>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          15. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, you can contact
          us:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              through our X account{" "}
            </Typography>
            <Link href="https://x.com/BuzzkillNFT" className="linkStyle1">
              https://x.com/BuzzkillNFT
            </Link>
          </li>
        </ul>
      </Box>
    </Layout>
  );
};

export default PrivacyPolicy;
