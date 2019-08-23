import React, { useState } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";

function EventsGallery({ events }) {

  const [firstEvent] = events;

  const [hoveredId, setHoveredId] = useState(
      firstEvent.id
  );

  const hovered = id => {
    console.log(id);
    //setHoveredId(id);
  }

  return (
    <div>
      <div className="md:hidden">
        <div className="flex relative events-slide">
          <img
            className="block object-cover w-full"
            src={firstEvent.photos[0].thumb_url}
          />
          <div className="shadow-down-gradient absolute w-full h-full z-10 top-0 left-0">
            <div className="badge rounded-full uppercase font-medium text-xs pt-1 pb-2 px-4 leading-none absolute top-0 left-0 bg-yellow mt-5 ml-5">
              { firstEvent.type.name }
            </div>
            <div className="absolute bottom-0 left-0 p-5 text-white tracking-tighter sm:px-6">
              <div className="font-extrabold text-2xl leading-tight mb-1 sm:text-4xl sm:mb-3">
                { firstEvent.short_title }
              </div>
              <div className="flex font-medium text-lg leading-none">
                <div className="block">18.07</div>
                <div className="block ml-4">{ firstEvent.club.address }</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <div className="w-2 h-2 mr-5 last:mr-0 rounded-full bg-red" />
          <div className="w-2 h-2 mr-5 last:mr-0 rounded-full bg-divider" />
          <div className="w-2 h-2 mr-5 last:mr-0 rounded-full bg-divider" />
          <div className="w-2 h-2 mr-5 last:mr-0 rounded-full bg-divider" />
          <div className="w-2 h-2 mr-5 last:mr-0 rounded-full bg-divider" />
        </div>
      </div>
      <div className="hidden md:block">
        <div className="gallery-accordion">
          {events.map(event => (
              <div
                  onMouseEnter={hovered(event.id)}
                  className={classNames("gallery-accordion__item flex relative", {
                    open: hoveredId === event.id
                  })}
                  key={event.id}
              >
                <img
                    className="block object-cover w-full"
                    src={event.photos[0].thumb_url}
                />
                <div className="shadow-down-gradient absolute w-full h-full z-10 top-0 left-0">
                  <div className="badge rounded-full uppercase font-medium text-xs pt-1 pb-2 px-4 leading-none gallery-accordion__item__badge mt-5 ml-5 absolute top-0 left-0 bg-yellow">
                    {event.type.name}
                  </div>
                  <div className="gallery-accordion__item__name">
                    { event.short_title }
                  </div>
                  <div className="absolute bottom-0 left-0 p-5 text-white tracking-tighter sm:px-6 md:hidden lg:block xl:hidden hd:block">
                    <div className="flex font-medium text-lg leading-none">
                      <div className="block">18.07</div>
                      <div className="block ml-4 gallery-accordion__item__address">
                        { event.club.address }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

EventsGallery.propTypes = {
  events: PropTypes.array
};

export default EventsGallery;
