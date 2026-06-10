import { events } from "../data/seed";
import "./Events.css";

export default function Events() {
  return (
    <div className="events-page">
      <div className="events-inner">
        <h1 className="events-heading">Upcoming Events</h1>
        <p className="events-subtitle">
          Low-pressure local swap meets, maker meetups, and community testing sessions.
        </p>

        <div className="timeline">
          {events.map((event, idx) => (
            <div key={event.id} className="timeline-item">
              <div className="timeline-marker">
                <div className="timeline-dot" />
                {idx < events.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-card">
                <div className="timeline-date">
                  <span className="event-date">{event.date}</span>
                  <span className="event-time">{event.time}</span>
                </div>
                <h2 className="timeline-title">{event.title}</h2>
                <p className="timeline-location">{event.location}</p>
                <p className="timeline-desc">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}