function EventCard({ event }) {
  return <div>{event?.title || 'Event'}</div>;
}

export default EventCard;
