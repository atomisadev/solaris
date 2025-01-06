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
      <Head>
        <style>{`
          @media (prefers-color-scheme: dark) {
            .light-mode-img { display: none !important; }
            .dark-mode-img { display: block !important; }
          }
          @media (prefers-color-scheme: light) {
            .light-mode-img { display: block !important; }
            .dark-mode-img { display: none !important; }
          }
        `}</style>
      </Head>
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
        <Container
          style={{
            padding: "40px",
            maxWidth: "600px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
          }}
        >
          <Section
            style={{
              backgroundColor: "#ffffff",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <Img
              src="https://hacksolaris.com/email/logo-light.png"
              alt="Solaris Logo"
              width={200}
              height="auto"
              className="light-mode-img"
              style={{
                display: "block",
                margin: "0 auto",
              }}
            />
            <Img
              src="https://hacksolaris.com/email/logo-dark.png"
              alt="Solaris Logo"
              width={200}
              height="auto"
              className="dark-mode-img"
              style={{
                display: "none",
                margin: "0 auto",
              }}
            />
          </Section>

          <Section
            style={{
              backgroundColor: "#ffffff", // Added white background
              padding: "20px",
            }}
          >
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
                src="https://hacksolaris.com/email/signature-light.png"
                alt="Signature"
                width={200}
                height="auto"
                className="light-mode-img"
                style={{
                  display: "block",
                }}
              />
              <Img
                src="https://hacksolaris.com/email/signature-dark.png"
                alt="Signature"
                width={200}
                height="auto"
                className="dark-mode-img"
                style={{
                  display: "none",
                }}
              />
              <Text style={{ margin: 0, color: "#666" }}>Mission Director</Text>
              <Text style={{ margin: 0, color: "#666" }}>
                mohit@hacksolaris.com
              </Text>
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
