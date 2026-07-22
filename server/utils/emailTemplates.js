const ticketConfirmationHTML = (
  name,
  eventTitle,
  eventDate,
  eventLocation,
  ticketId,
  qrCodeBase64
) => {
  const formattedDate = new Date(eventDate).toLocaleString();

  return `
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="background-color:#f4f4f4;padding:20px;font-family:Arial,sans-serif;"
  >
    <tr>
      <td align="center">
        <table
          width="600"
          cellpadding="20"
          cellspacing="0"
          style="background:#ffffff;border-radius:8px;border:1px solid #dddddd;"
        >
          <tr>
            <td align="center">
              <h2 style="margin:0;color:#2563eb;">
                🎉 Event Registration Confirmed
              </h2>

              <p style="font-size:16px;color:#333333;">
                Hello <strong>${name}</strong>,
              </p>

              <p style="font-size:15px;color:#555555;">
                Thank you for registering. Your ticket has been confirmed.
              </p>

              <hr style="border:none;border-top:1px solid #dddddd;" />

              <table
                width="100%"
                cellpadding="8"
                cellspacing="0"
                style="font-size:15px;color:#333333;"
              >
                <tr>
                  <td><strong>Event:</strong></td>
                  <td>${eventTitle}</td>
                </tr>

                <tr>
                  <td><strong>Date:</strong></td>
                  <td>${formattedDate}</td>
                </tr>

                <tr>
                  <td><strong>Location:</strong></td>
                  <td>${eventLocation}</td>
                </tr>

                <tr>
                  <td><strong>Ticket ID:</strong></td>
                  <td>${ticketId}</td>
                </tr>
              </table>

              <br />

              <p style="font-size:15px;color:#333333;">
                Present this QR code at the event entrance.
              </p>

              <img
                src="data:image/png;base64,${qrCodeBase64}"
                style="width:150px;height:150px;"
                alt="Your ticket QR code"
              />

              <p
                style="margin-top:25px;font-size:13px;color:#777777;"
              >
                Please keep this email safe. We look forward to seeing you at the event!
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
};

module.exports = {
  ticketConfirmationHTML,
};