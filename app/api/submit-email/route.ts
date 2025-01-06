import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { Email } from "@/lib/models/Email";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

const emailSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = emailSchema.parse(body);

    await connectDB();

    const ipAddress = req.headers.get("x-forwarded-for") || "unknown";

    await Email.create({
      email,
      ipAddress,
    });

    await resend.emails.send({
      from: "Solaris Mission Control <onboarding@hacksolaris.com>",
      to: email,
      subject: "Welcome to Mission Control!",
      html: `
      <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mission Control Letter</title>
      </head>
      <body style="margin: 0; padding: 40px; font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="text-align: center; margin-bottom: 30px;">
          <svg width="288" height="61" viewBox="0 0 288 61" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.2584 1.44694C25.1958 2.28548 25.1445 3.62761 25.1445 4.42921C25.1445 6.19792 24.9906 6.32411 23.7588 5.56497C22.4083 4.73256 20.7411 3.07958 19.7111 1.55142C18.9742 0.458124 18.681 0.166827 18.3099 0.158138C18.0518 0.152213 17.8066 0.214028 17.7649 0.295393C17.7232 0.376759 18.1114 1.77655 18.6276 3.40583C19.1439 5.03511 19.6102 6.52377 19.6639 6.71375C19.9975 7.89118 15.2948 6.17165 11.9538 3.89441C10.5145 2.91349 10.4592 2.89355 10.0369 3.20696C9.79759 3.3845 9.62634 3.6047 9.65633 3.69653C9.68633 3.78816 10.8682 5.29698 12.283 7.04929C13.6979 8.8016 14.8553 10.3138 14.8553 10.4093C14.8553 10.8152 13.4722 11.0889 11.5419 11.0654C9.69575 11.0427 6.01814 10.4251 4.26217 9.84255C3.77544 9.68121 3.65999 9.71399 3.43537 10.0772C3.29167 10.3094 3.23238 10.5636 3.30336 10.6422C3.37451 10.7208 5.27592 11.7752 7.52908 12.9852C9.78207 14.1952 11.6571 15.2209 11.6957 15.2648C11.8853 15.4795 11.1429 16.0863 9.88514 16.745C8.17521 17.6402 5.9449 18.3472 2.74565 19.008C1.40858 19.2841 0.291067 19.5366 0.262292 19.5694C0.233518 19.602 0.162712 19.8963 0.104988 20.2233L0 20.8178L5.20407 21.0697C8.06639 21.2084 10.4338 21.3482 10.4648 21.3806C10.4959 21.4128 10.3865 21.7363 10.2217 22.0995C9.51019 23.6673 6.36466 26.5109 2.34454 29.2205C0.442785 30.5024 0.209795 30.7184 0.208226 31.2023C0.207005 31.5196 0.301355 31.7454 0.43494 31.7454C0.560852 31.7454 2.97288 30.8122 5.79527 29.6717C8.61747 28.5312 11.0344 27.5981 11.1661 27.5981C11.4948 27.5981 11.3242 28.3282 10.5714 30.1439C9.59948 32.4879 7.31388 36.286 4.55236 40.1459C3.5918 41.4884 3.56652 41.5536 3.80614 42.0714C3.94251 42.3661 4.09615 42.6072 4.14777 42.6072C4.19922 42.6072 6.42936 40.3855 9.10385 37.67C11.7782 34.9545 14.0047 32.7328 14.0514 32.7328C14.0981 32.7328 14.1911 33.1461 14.258 33.6515C14.5615 35.9428 13.3577 42.7654 11.3568 50.0951C10.8809 51.8384 10.868 51.9695 11.1519 52.1946C11.3185 52.3268 11.5262 52.4522 11.6137 52.4735C11.7013 52.4946 13.2729 48.941 15.1065 44.5764C16.94 40.2119 18.512 36.6281 18.5999 36.6123C18.8922 36.5601 19.3728 37.7614 19.8161 39.6518C20.6288 43.1169 21.2301 47.982 21.7308 55.1394C21.9375 58.0934 22.0304 58.7283 22.2871 58.941C22.4566 59.0812 22.6493 59.1962 22.7153 59.1962C22.7812 59.1962 22.8898 57.7966 22.9566 56.0858C23.2892 47.5693 23.7461 38.2004 23.8335 38.1013C24.0178 37.8928 25.6833 39.9368 26.7001 41.6198C28.5534 44.6867 31.9588 51.9829 34.6017 58.5494C35.2991 60.2816 35.4965 60.607 35.9909 60.8385C36.308 60.987 36.5907 61.0435 36.6191 60.9639C36.6573 60.8571 29.8301 39.051 29.0637 36.8319C28.9603 36.5325 28.6976 36.489 27.0627 36.5005C23.2627 36.5273 20.0983 34.9929 17.5218 31.8737C14.9561 28.768 13.641 24.2145 14.1409 20.1686C14.7662 15.1056 17.448 10.8721 21.3761 8.7465C23.1755 7.77268 24.6069 7.40259 26.6693 7.37731C27.6518 7.36546 28.4561 7.33564 28.4568 7.31135C28.4575 7.28706 28.2315 6.62054 27.9547 5.83019C27.678 5.03984 27.2074 3.46784 26.9091 2.33683C26.6107 1.20562 26.3465 0.257673 26.3219 0.229827C26.2975 0.202179 26.0737 0.121407 25.8249 0.0507062C25.3735 -0.0774635 25.3718 -0.0737127 25.2584 1.44694ZM31.761 4.81293C31.1433 6.29725 30.6161 7.57263 30.5896 7.64728C30.563 7.72173 31.1112 8.04206 31.8078 8.35902C32.5045 8.67619 33.1147 8.95761 33.164 8.98487C33.2134 9.01192 33.2538 7.50864 33.2538 5.64396C33.2538 3.4319 33.1897 2.22959 33.069 2.18417C32.9673 2.14566 32.3787 3.32861 31.761 4.81293ZM36.9655 9.34232C36.2668 10.0547 35.6953 10.7038 35.6953 10.7844C35.6953 10.8651 36.0563 11.3986 36.4975 11.9697L37.2996 13.0081L38.0008 10.7743C38.6574 8.68231 38.7471 8.0468 38.3855 8.0468C38.303 8.0468 37.6641 8.62978 36.9655 9.34232ZM38.001 29.6638C37.7345 30.1404 37.1585 30.9811 36.7209 31.5323C36.1852 32.2071 36.0019 32.5628 36.1592 32.6222C36.2878 32.6706 37.06 32.94 37.8753 33.2206C43.8493 35.2772 53.074 39.3637 62.6344 44.1883L67.4068 46.5968L67.722 46.1326C67.8953 45.8772 68.0193 45.6098 67.9975 45.5381C67.9646 45.4295 38.6459 28.7686 38.5257 28.7903C38.5036 28.7943 38.2676 29.1873 38.001 29.6638ZM32.7443 34.9759C31.0261 35.9568 31.0169 35.9659 31.4333 36.2738C33.3143 37.6647 38.0959 42.653 45.2118 50.6481L51.0658 57.2256L51.6208 57.0066C51.9258 56.8862 52.1755 56.7509 52.1755 56.7061C52.1755 56.5637 34.7126 34.0171 34.5909 34.0023C34.5269 33.9944 33.6959 34.4326 32.7443 34.9759Z" fill="black" fill-opacity="0.81"/>
<path d="M88.676 14.836L88.712 14.8H107.36C109.376 14.8 111.356 15.628 112.796 17.068C114.236 18.544 115.028 20.488 115.028 22.54H109.628C109.628 21.928 109.412 21.316 108.98 20.884C108.548 20.452 107.972 20.2 107.36 20.2H88.712C87.452 20.2 86.408 21.208 86.408 22.468C86.408 23.728 87.452 24.772 88.712 24.772H107.396C109.412 24.736 111.392 25.528 112.796 26.968C114.236 28.408 115.028 30.352 115.028 32.404C114.992 36.58 111.608 40 107.396 40H88.676C84.464 40 81.044 36.58 81.044 32.368H86.408C86.408 33.628 87.416 34.636 88.64 34.636H107.396C108.188 34.636 108.944 34.204 109.34 33.52C109.772 32.8 109.736 31.936 109.34 31.252C108.908 30.532 108.152 30.136 107.324 30.136H88.64C86.624 30.172 84.68 29.38 83.24 27.94C81.8 26.5 81.008 24.52 81.044 22.504C81.044 18.256 84.464 14.836 88.676 14.836ZM147.317 22.684V32.512C147.245 36.688 143.825 40.072 139.613 40.072H123.341C119.093 40.036 115.637 36.616 115.637 32.332V22.576C115.637 18.328 119.057 14.872 123.341 14.872H139.613C141.701 14.8 143.717 15.628 145.157 17.104C146.633 18.58 147.389 20.596 147.317 22.684ZM141.917 22.576C141.917 21.28 140.873 20.236 139.613 20.236H123.341C122.045 20.236 121.001 21.28 121.001 22.576V32.332C121.001 33.628 122.045 34.672 123.341 34.672H139.613C140.873 34.672 141.917 33.628 141.917 32.332V22.576ZM180.08 40.036L156.14 40C151.892 40 148.436 36.544 148.436 32.296V14.8H153.8V32.296C153.8 33.592 154.844 34.636 156.14 34.636H180.08V40.036ZM206.244 40V32.548H185.328V40H179.964V22.504C179.964 18.256 183.42 14.836 187.668 14.8H203.94C208.188 14.836 211.644 18.256 211.644 22.504V40H206.244ZM185.328 27.184H206.244V22.504C206.244 21.244 205.236 20.2 203.94 20.2H187.668C186.372 20.2 185.328 21.244 185.328 22.504V27.184ZM242.561 26.572C244.037 27.976 244.901 29.956 244.901 32.008V40H239.501V32.008C239.501 31.468 239.285 30.892 238.889 30.496C238.493 30.1 237.953 29.884 237.377 29.884H218.585V40H213.221V14.8C223.121 14.8 226.433 14.836 236.333 14.836C239.141 14.836 241.697 16.348 242.993 18.832C244.289 21.28 244.109 24.268 242.561 26.572ZM236.333 20.2H218.585V24.484H236.333C237.485 24.484 238.421 23.512 238.421 22.36C238.421 21.208 237.485 20.236 236.333 20.2ZM246.05 40.108V14.8H251.414V40.108H246.05ZM260.126 14.836L260.162 14.8H278.81C280.826 14.8 282.806 15.628 284.246 17.068C285.686 18.544 286.478 20.488 286.478 22.54H281.078C281.078 21.928 280.862 21.316 280.43 20.884C279.998 20.452 279.422 20.2 278.81 20.2H260.162C258.902 20.2 257.858 21.208 257.858 22.468C257.858 23.728 258.902 24.772 260.162 24.772H278.846C280.862 24.736 282.842 25.528 284.246 26.968C285.686 28.408 286.478 30.352 286.478 32.404C286.442 36.58 283.058 40 278.846 40H260.126C255.914 40 252.494 36.58 252.494 32.368H257.858C257.858 33.628 258.866 34.636 260.09 34.636H278.846C279.638 34.636 280.394 34.204 280.79 33.52C281.222 32.8 281.186 31.936 280.79 31.252C280.358 30.532 279.602 30.136 278.774 30.136H260.09C258.074 30.172 256.13 29.38 254.69 27.94C253.25 26.5 252.458 24.52 252.494 22.504C252.494 18.256 255.914 14.836 260.126 14.836Z" fill="black" fill-opacity="0.81"/>
</svg>

        </div>

        <div style="padding: 20px;">
          <p style="margin-bottom: 20px;">Dear Earth,</p>

          <p style="margin-bottom: 20px;">The year is 2035, and humanity's lunar ambitions face their greatest test. At Tranquility Base, our pioneers face intense radiation, corrosive dust, and the mental toll of isolation.</p>

          <p style="margin-bottom: 20px;">But we are not defeated. We are inspired.</p>

          <p style="margin-bottom: 20px;">To the high school students of the tri state area: we require your brilliance. As the next generation of aerospace engineers, your innovative ideas could be the key to our survival and expansion on the moon.</p>

          <p style="margin-bottom: 20px;">This is your moment to make history. Remember, each of your breakthroughs brings us closer to becoming a truly spacefaring civilization. The challenges are great, but so is our determination.</p>

          <p style="margin-bottom: 20px;">The future of space exploration is in your hands. Show us what humanity can achieve when we reach for the stars together.</p>

          <p style="margin-bottom: 30px; font-style: italic;">Ad astra per aspera - to the stars through difficulties.</p>

          <p style="margin-bottom: 20px;">With hope and anticipation,</p>

          <div style="margin-top: 40px;">
            <p style="margin: 0; font-weight: bold;">Mohit Srinivasan</p>
            <svg width="130" height="118" viewBox="0 0 162 118" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.5679 116.007C23.4528 118.516 23.2743 101.301 23.1752 98.9466C22.5566 84.2557 21.3257 69.3652 19.9719 54.7277C18.5997 39.8903 18.1171 14.3641 6.67146 2.91847C-0.615078 -4.36806 2.71069 34.0329 3.05038 35.9956C5.69852 51.296 10.2761 71.4663 23.3145 81.6072C31.0692 87.6387 40.4489 84.3405 42.2555 74.7829C44.369 63.6018 40.4617 52.9413 37.8684 42.2628C37.1406 39.2662 36.6146 30.7039 35.1526 33.4191C33.2549 36.9433 36.2405 48.4669 36.6846 51.3852C38.5258 63.4844 39.3529 81.03 47.13 91.217C51.9876 97.5797 57.309 90.1615 58.411 85.3676C59.0784 82.4646 60.829 76.1147 59.5252 73.1812C59.3307 72.7436 56.5572 78.7047 57.5754 80.9108C61.6282 89.692 80.7995 85.1639 72.8953 78.6825C70.4666 76.6909 67.48 75.897 64.3997 75.897C63.5628 75.897 66.0188 75.4357 66.7674 75.0614C69.657 73.6166 72.073 71.5455 73.8006 68.7942C79.5631 59.6169 77.167 44.3431 76.0986 34.394C75.9558 33.0643 71.1824 6.46929 69.8313 13.2246C65.6703 34.03 74.607 54.2715 83.2015 72.4152C85.6025 77.484 84.9286 71.2368 85.4995 68.446C86.7167 62.4952 89.3739 60.1015 94.1343 64.6856C95.9041 66.3899 99.2677 70.8011 102.282 70.0476C105.428 69.261 104.665 65.4469 106.321 63.6411C108.015 61.7926 110.128 61.8019 111.613 59.1148C116.943 49.4705 113.583 36.4827 110.986 26.5947C110.92 26.3433 104.356 6.69087 107.156 14.4781C113.01 30.7551 124.182 43.6303 132.782 58.3488C137.673 66.7177 138.842 73.64 129.997 79.4485C127.793 80.8956 106.761 90.2987 110.36 80.9108C115.657 67.0902 127.163 52.166 136.821 41.079C139.72 37.7514 150.473 29.0588 142.392 38.2936" stroke="black" stroke-width="3" stroke-linecap="round"/>
<path d="M159.94 58.3486L157.434 63.3624" stroke="black" stroke-width="3" stroke-linecap="round"/>
</svg>

            <p style="margin: 0; color: #666;">Mission Director</p>
            <p style="margin: 0; color: #666;">Solaris Mission Control</p>
          </div>
        </div>
      </body>
    </html>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email submission error:", error);
    return NextResponse.json({ error: "Failed to submit email", status: 400 });
  }
}