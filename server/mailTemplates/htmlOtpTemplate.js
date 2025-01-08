const htmlOtpTemplate = (otp) => {
    return (
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Email </title>
        <style>
          /* Inline CSS styles for compatibility */
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
            line-height: 1.6;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333333;
            text-align: center;
            margin-bottom: 20px;
          }
          p {
            color: #666666;
            margin-bottom: 15px;
          }
          .otp {
            font-size: 28px;
            font-weight: bold;
            color: #009688;
            margin-bottom: 20px;
            text-align: center;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            color: #999999;
            font-size: 14px;
          }
          .footer p {
            margin-bottom: 8px;
          }
          .footer p:last-child {
            margin-bottom: 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Mail verification OTP </h1>
          <p>Your One Time Password (OTP) is:</p>
          <p class="otp">${otp}</p>
          <p>Please use this OTP to verify your email address.</p>
        </div>
        <div class="footer">
          <p>All rights reserved &copy; 2024 Edulink</p>
          <p>This email was sent automatically. Please do not reply.</p>
        </div>
      </body>
      </html>
      `
    );
  };
  
  module.exports = htmlOtpTemplate;
  