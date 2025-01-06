import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { render } from "@react-email/render";
import * as React from "react";

interface RecruitmentEmailProps {
  recipientEmail: string;
}

export function RecruitmentEmail({ recipientEmail }: RecruitmentEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Solaris Recruitment Letter</Preview>
      <Body
        style={{
          backgroundColor: "#ffffff",
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.6,
          margin: 0,
          padding: 0,
        }}
      >
        <Container style={{ padding: "40px", maxWidth: "600px" }}>
          <Img
            src="https://hacksolaris.com/email/logo.png"
            alt="Solaris Logo"
            width={200}
            height="auto"
          />

          <Section style={{ padding: "20px 0" }}>
            <Text>Dear Earth,</Text>

            <Text>
              The year is 2035, and humanity's lunar ambitions face their
              greatest test. At Tranquility Base, our pioneers face intense
              radiation, corrosive dust, and the mental toll of isolation.
            </Text>

            <Text>But we are not defeated. We are inspired.</Text>

            <Text>
              To the high school students of the tri state area: we require your
              brilliance. As the next generation of aerospace engineers, your
              innovative ideas could be the key to our survival and expansion on
              the moon.
            </Text>

            <Text>
              This is your moment to make history. Remember, each of your
              breakthroughs brings us closer to becoming a truly spacefaring
              civilization. The challenges are great, but so is our
              determination.
            </Text>

            <Text>
              The future of space exploration is in your hands. Show us what
              humanity can achieve when we reach for the stars together.
            </Text>

            <Text style={{ fontStyle: "italic", marginBottom: "30px" }}>
              Ad astra per aspera - to the stars through difficulties.
            </Text>

            <Text>With hope and anticipation,</Text>

            <Section style={{ marginTop: "40px" }}>
              <Text style={{ fontWeight: "bold", margin: 0 }}>
                Mohit Srinivasan
              </Text>
              <Img
                src="https://hacksolaris.com/email/signature.png"
                alt="Signature"
                width={200}
                height="auto"
              />
              <Text style={{ margin: 0, color: "#666" }}>Mission Director</Text>
              <Text style={{ margin: 0, color: "#666" }}>
                Solaris Mission Control
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default RecruitmentEmail;
