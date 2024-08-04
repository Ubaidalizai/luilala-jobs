import React from 'react';

const Card = ({ image, title, subTitle, jobTitles, location }) => {
  return (
    <div className="  rounded-md overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt="Card image cap"
      />
      <div className="p-4">
        <h5 className="text-lg font-bold text-gray-800">{title}</h5>
        <h6 className="text-sm font-medium text-gray-500 mb-2">
          {subTitle}
        </h6>
        <div className="flex flex-wrap mb-2">
          {jobTitles.map((job, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-2 mb-2"
            >
              {job}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-600">Location: {location}</p>
      </div>
    </div>
  );
};

const CardContainer = ({ cardData }) => {
  return (
    <div className="container mx-auto px-8 my-8">
        <p className="text-3xl text-[#002244] mb-8">Popular industries</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cardData.map((card, index) => (
          <div key={index}>
            <Card
              image={card.image}
              title={card.title}
              subTitle={card.subTitle}
              jobTitles={card.jobTitles}
              location={card.location}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardContainer;