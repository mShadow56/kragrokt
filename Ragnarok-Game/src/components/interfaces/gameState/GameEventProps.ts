import React from "react";
import { GameEvent } from "../GameEvent";

export interface GameEventProps {
  events: {
    events: GameEvent[]
  },
  setEvents: React.Dispatch<React.SetStateAction<{
    events: GameEvent[]
  }>>
}