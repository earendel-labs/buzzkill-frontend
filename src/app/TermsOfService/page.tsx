"use client";

import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import Layout from "@/components/Layouts/Layout/Layout";
import Link from "next/link";

const TermsOfService = () => {
  return (
    <Layout>
      <Box
        sx={{ maxWidth: "1000px", mx: "auto", px: 2, py: 4, color: "white" }}
      >
        <Typography variant="h4" gutterBottom>
          Terms of Service
        </Typography>
        <Typography variant="body2" gutterBottom>
          Last Updated: January 13, 2025
        </Typography>

        <Typography variant="body1" paragraph>
          Please read these Terms of Service (“ToS”) carefully before using the
          services provided by <strong>Buzzkill Studio Inc.</strong> (“the
          Company,” “we,” “us,” or “our”). By accessing or using our online
          blockchain-based game, website, and related services (collectively,
          the “Service”), you agree to be bound by these Terms of Service. If
          you do not agree, <strong>do not</strong> use or access the Service.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          1. Acceptance of Terms
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>1.1 Binding Agreement</strong>
          <br />
          These ToS form a legally binding agreement between you and the
          Company. By creating an account, accessing, or using the Service, you
          signify that you have read, understood, and agree to be bound by these
          ToS, as well as our{" "}
          <Link href="/privacy-policy" passHref>
            <strong>Privacy Policy</strong>
          </Link>
          , which is incorporated by reference.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>1.2 Eligibility</strong>
          <br />
          You must be at least 18 years of age (or the age of majority in your
          jurisdiction) to access or use the Service. By using the Service, you
          represent and warrant that you meet all legal requirements to form a
          binding contract and that you are not barred from using the Service
          under any applicable laws.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>1.3 Amendments</strong>
          <br />
          We reserve the right to update or modify these ToS at any time. We
          will notify you of any material changes by posting the new terms on
          our website and updating the “Last Updated” date. Your continued use
          of the Service after any changes or revisions indicates your agreement
          to the updated ToS.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          2. Accounts and Registration
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>2.1 Account Creation</strong>
          <br />
          To access certain features of the Service, you may be required to
          create an account. When creating an account, you must provide accurate
          and complete information. You are responsible for maintaining the
          confidentiality of your login credentials and are fully responsible
          for all activities that occur under your account.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>2.2 Wallet Addresses</strong>
          <br />
          Our blockchain-based game may require you to use or connect a
          compatible blockchain wallet (e.g., MetaMask) to engage with certain
          features (such as minting, purchasing, or trading digital assets). You
          acknowledge that these wallets are third-party services not operated
          by the Company. You are solely responsible for the security and
          management of your wallet, including safeguarding your private keys.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>2.3 Account Security</strong>
          <br />
          You agree to notify us immediately if you suspect or become aware of
          any unauthorized use of your account. We are not liable for any losses
          arising from stolen or hacked credentials. We may suspend or terminate
          your account if we reasonably suspect fraudulent or illegal activity.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          3. Digital Assets, NFTs, and In-Game Items
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>3.1 Ownership</strong>
          <br />
          Any non-fungible tokens (NFTs), tokens, or in-game items you obtain
          through our Service may be subject to the rules and limitations
          specified within the game. Your ownership is limited to the licensed
          rights described in these ToS and any applicable documentation, and
          you do <strong>not</strong> gain any right, title, or interest in any
          underlying intellectual property of the Company.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>3.2 Transactions on the Blockchain</strong>
          <br />
          All transactions involving NFTs, tokens, or other digital assets occur
          on a decentralized blockchain (e.g., Viction and/or other
          blockchains). We do not own or control the blockchain or your wallet.
          Therefore, any transaction you engage in is irrevocable, publicly
          visible, and outside our control. We are not liable for any claims or
          damages related to blockchain transactions, including but not limited
          to transaction failures, fees, or network outages.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>3.3 Fees</strong>
          <br />
          Transactions on the blockchain may require payment of gas fees or
          other associated costs. You are solely responsible for all transaction
          fees incurred in connection with your use of the Service.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          4. Game Rules and Community Guidelines
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>4.1 Conduct</strong>
          <br />
          You agree to abide by any posted gameplay rules, community guidelines,
          or other policies published within our Service. You must not harass,
          threaten, bully, spam, or otherwise engage in conduct that is
          unlawful, harmful, hateful, obscene, or otherwise objectionable. We
          reserve the right to take disciplinary action, including account
          suspension or termination, for violation of our game rules or
          guidelines.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>4.2 Cheating and Exploits</strong>
          <br />
          You agree not to engage in any form of cheating, hacking, botting, or
          exploiting software bugs to gain a competitive advantage or cause
          detriment to other players or the Service itself. We may suspend or
          terminate your account if we detect or reasonably suspect cheating or
          malicious activity.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          5. Payments, Refunds, and Cancellations
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>5.1 Payment Authorization</strong>
          <br />
          If you purchase any products, services, or digital items from us, you
          authorize the Company to charge you for such purchases. We may use
          third-party payment processors, and you agree to abide by their terms.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>5.2 Refund Policy</strong>
          <br />
          Except as required by applicable law,{" "}
          <strong>all sales are final</strong>. Once a blockchain transaction is
          confirmed, it cannot be undone or refunded. Please review your
          transactions carefully before finalizing any purchase.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>5.3 Subscription and Cancellation</strong>
          <br />
          If the Service includes subscription-based features, you may cancel
          your subscription by following the instructions provided in your
          account settings. Cancellation may not result in a refund of any
          prepaid subscription fees.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          6. Intellectual Property
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>6.1 Ownership</strong>
          <br />
          The Service, including but not limited to text, graphics, images,
          logos, trademarks, software, code, and other content, is owned by the
          Company or licensed to us by third parties. Subject to your compliance
          with these ToS, we grant you a limited, non-exclusive,
          non-transferable, revocable license to access and use the Service for
          personal, non-commercial purposes.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>6.2 Restrictions</strong>
          <br />
          You shall not copy, modify, distribute, transmit, display, perform,
          reproduce, publish, license, create derivative works from, transfer,
          or sell any content, information, software, or services obtained from
          or through the Service without our express prior written consent.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>6.3 Feedback</strong>
          <br />
          If you provide any feedback, comments, or suggestions regarding the
          Service, you grant us an irrevocable, non-exclusive, royalty-free,
          worldwide license to use, modify, and incorporate such feedback into
          our products, services, or future designs.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          7. User Conduct and Prohibited Activities
        </Typography>

        <Typography variant="body1" paragraph>
          You agree that you will <strong>not</strong>:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              Use the Service for any illegal or unauthorized purpose.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Circumvent or attempt to circumvent any security features of the
              Service.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Interfere with or disrupt the Service, servers, or networks
              connected to the Service.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Engage in any behavior that is fraudulent, abusive, libelous,
              defamatory, or otherwise objectionable.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Use the Service to develop or provide similar or competing
              services, or to mine data from the Service for any commercial
              purpose without explicit permission.
            </Typography>
          </li>
        </ul>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          8. Disclaimers and Limitation of Liability
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>8.1 Disclaimer of Warranties</strong>
          <br />
          <strong>
            THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT WARRANTY
            OF ANY KIND, EITHER EXPRESS OR IMPLIED.
          </strong>{" "}
          TO THE FULLEST EXTENT PERMITTED BY LAW, THE COMPANY AND ITS AFFILIATES
          EXPRESSLY DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO,
          WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
          NON-INFRINGEMENT, OR TITLE, AND ANY WARRANTIES THAT MAY ARISE FROM
          COURSE OF DEALING, USAGE, OR TRADE PRACTICE.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>8.2 Limitation of Liability</strong>
          <br />
          TO THE FULLEST EXTENT PERMITTED BY LAW, THE COMPANY, ITS AFFILIATES,
          DIRECTORS, EMPLOYEES, OR AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING
          BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, DATA, OR OTHER
          INTANGIBLE LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OR INABILITY
          TO USE THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
          DAMAGES.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>8.3 Blockchain and Third-Party Services</strong>
          <br />
          YOU ACKNOWLEDGE THAT TRANSACTIONS AND INTERACTIONS WITH THE BLOCKCHAIN
          AND THIRD-PARTY WALLETS ARE INHERENTLY RISKY AND BEYOND THE COMPANY’S
          CONTROL. WE ARE NOT RESPONSIBLE FOR ANY LOSSES, HACKS, OR BREACHES
          INVOLVING THIRD-PARTY SERVICES OR THE BLOCKCHAIN NETWORK.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          9. Indemnification
        </Typography>

        <Typography variant="body1" paragraph>
          You agree to indemnify and hold the Company, its affiliates, and their
          respective officers, directors, employees, and agents harmless from
          any claim, demand, damages, or other losses (including attorneys’
          fees) asserted by any third party arising out of or relating to your
          use of the Service, your breach of these ToS, or your violation of any
          law or rights of any third party.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          10. Termination
        </Typography>

        <Typography variant="body1" paragraph>
          We reserve the right, at our sole discretion, to suspend or terminate
          your access to the Service at any time, without notice, if you breach
          these ToS or engage in behavior that we deem harmful to the Service or
          other users. You may also terminate your account at any time by
          ceasing all use of the Service and (if applicable) deleting your
          account credentials.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          11. Governing Law and Dispute Resolution
        </Typography>

        <Typography variant="body1" paragraph>
          These ToS and any disputes arising hereunder will be governed by and
          construed in accordance with the laws of the jurisdiction in which the
          Company is organized, without regard to its conflict of law
          provisions. Any dispute, claim, or controversy arising out of or
          relating to these ToS or your use of the Service shall be resolved by
          binding arbitration or in a court of competent jurisdiction, as
          determined by the Company’s location, unless otherwise required by
          law.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          12. General Provisions
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>12.1 Entire Agreement</strong>
          <br />
          These ToS, together with the Privacy Policy and any other legal
          notices or agreements published by the Company, constitute the entire
          agreement between you and the Company regarding the Service.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>12.2 Severability</strong>
          <br />
          If any provision of these ToS is found invalid or unenforceable, the
          remaining provisions will remain in full force and effect.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>12.3 No Waiver</strong>
          <br />
          The failure of the Company to enforce any right or provision of these
          ToS shall not constitute a waiver of such right or provision.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>12.4 Assignment</strong>
          <br />
          You may not assign or transfer these ToS without our prior written
          consent. We may freely assign or transfer these ToS in connection with
          a merger, acquisition, reorganization, or sale of assets.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          13. Contact Us
        </Typography>

        <Typography variant="body1" paragraph>
          If you have any questions about these Terms of Service, please contact
          us at:
        </Typography>
        <ul>
          <li>
            <Link href="https://x.com/BuzzkillNFT" className="linkStyle1">
              https://x.com/BuzzkillNFT
            </Link>
          </li>
        </ul>

        <Typography variant="body1" paragraph>
          By using our Service, you agree to these Terms of Service. If you do
          not agree, do not use our Service.
        </Typography>
      </Box>
    </Layout>
  );
};

export default TermsOfService;
