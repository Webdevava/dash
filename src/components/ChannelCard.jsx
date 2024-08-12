'use client'
import { useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

const ChannelCard = ({ channel }) => {
  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center space-x-2 rounded-full p-2 hover:bg-gray-200">
        <img
          src={channel.logo}
          alt={`${channel.name} logo`}
          className="w-12 h-12 rounded-full"
        />
        <span>{channel.name}</span>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute z-10 w-48 p-4 mt-2 bg-white border rounded shadow-lg">
          <img
            src={channel.logo}
            alt={`${channel.name} logo`}
            className="w-16 h-16 mb-2"
          />
          <h3 className="text-lg font-semibold">{channel.name}</h3>
          <p>Audio Confidence: {channel.audioConfidence}%</p>
          <p>Overall Confidence: {channel.overallConfidence}%</p>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ChannelCard;
