import React from "react";

interface ChannelHeroProps {
  name: string;
  creationTime: number;
}

export const ChannelHero = ({ name, creationTime }: ChannelHeroProps) => {
  return <div className="mt-[88px] mx-5 mb-4"></div>;
};
