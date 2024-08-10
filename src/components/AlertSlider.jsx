"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AlarmClock } from "lucide-react";

const generateRandomValues = () => ({
  alarms: Math.floor(Math.random() * 100),
  pending: Math.floor(Math.random() * 100),
  resolved: Math.floor(Math.random() * 100),
});

export function AlertSlider() {
  const cards = Array.from({ length: 10 }).map((_, index) => ({
    id: index,
    ...generateRandomValues(),
  }));

  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {cards.map((card) => (
          <CarouselItem
            key={card.id}
            className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card className="rounded-2xl bg-card/75">
                <CardContent className="flex flex-col items-center justify-center p-4 md:p-6 space-y-2 md:space-y-4">
                  <span className="text-lg md:text-xl flex justify-center items-center gap-2 font-semibold">
                    Alarm {card.id + 1}
                    <AlarmClock size={30} className="md:size-45" />
                  </span>
                  <span className="text-base md:text-lg">{`${card.alarms} | ${card.pending} | ${card.resolved}`}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
