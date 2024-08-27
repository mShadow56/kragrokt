import React from "react";
import { Hero } from "../../../classes/hero/hero";

export interface HeroesProps {
  heroes: Hero[],
  setHeroes: React.Dispatch<React.SetStateAction<Hero[]>>
}