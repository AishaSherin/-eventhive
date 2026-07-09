function TicketQR({ ticket }) {
  return <div>{ticket?.qrCode || 'QR Placeholder'}</div>;
}

export default TicketQR;
