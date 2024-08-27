import React from "react";
import { Hero } from "../../classes/hero/hero";
import "./HeroStats.css";


function HeroStats({ hero }: { hero: Hero | undefined }) {


  const renderPrimaryStat = (statName: string, statLevel: number) => {

    return (
      <React.Fragment key={statName}>
        <div className="hero-stats-stat-label">{statName.toUpperCase()}:</div>
        <div id="con-stat" className="hero-stats-stat-value">{statLevel}</div>
        <div id="mt-stat" className="hero-stats-stat-value"></div>
        <div id="mt-stat" className="hero-stats-stat-value"></div>
      </React.Fragment>
    );
  };

  const renderSecondaryStat = (statName: string, statLevel: number) => {
    return (
      <React.Fragment key={statName}>
        <div className="hero-stats-stat-label">{statName.toUpperCase()}:</div>
        <div id="hp-stat" className="hero-stats-stat-value">{statLevel}</div>
        <div id="mt-stat" className="hero-stats-stat-value"></div>
        <div id="mt-stat" className="hero-stats-stat-value"></div>
      </React.Fragment>
    );
  };

  const renderStats = () => {
    if (!hero ||!hero.stats ||!hero.substats) {
      return (
        <div id="primary-stats" className="hero-stats-box">
          <div className="hero-stats-stat-label">CON:</div>
          <div id="con-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div className="hero-stats-stat-label">INT:</div>
          <div id="int-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div className="hero-stats-stat-label">STR:</div>
          <div id="str-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div className="hero-stats-stat-label">DEX:</div>
          <div id="dex-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div className="hero-stats-stat-label">WIS:</div>
          <div id="wis-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
        </div>
      );
    }

    return (
      <div id="primary-stats" className="hero-stats-box">
        {Object.entries(hero.stats).map(([statName, statValue]) => 
          renderPrimaryStat(statName, statValue)
        )}
      </div>
    );
  };

  const renderSubstats = () => {
    if (!hero ||!hero.stats ||!hero.substats) {
      return (
        <div id="secondary-stats" className="hero-stats-box">
          <div className="hero-stats-stat-label">HP:</div>
          <div id="hp-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div className="hero-stats-stat-label">MP:</div>
          <div id="mp-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div className="hero-stats-stat-label">ATK:</div>
          <div id="atk-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div className="hero-stats-stat-label">DEF:</div>
          <div id="def-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div className="hero-stats-stat-label">WLP:</div>
          <div id="wlp-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
          <div id="mt-stat" className="hero-stats-stat-value"></div>
        </div>
      );
    }

    return (
      <div id="secondary-stats" className="hero-stats-box">
        {Object.entries(hero.substats).map(([statName, statValue]) => 
          renderSecondaryStat(statName, statValue)
        )}
      </div>
    );
  };

  return (
    <div id="stats-tab">
      <div className="hero-stats-bar">
        <div id="primary-stats-title" className="hero-stats-subtitle">Primary</div>
        <div id="stat-pts" className="hero-stats-subtitle">{hero?.statPointsAvailable}</div>
        <div id="secondary-stats-title" className="hero-stats-subtitle">Secondary</div>
      </div>
      {renderStats()}
      {renderSubstats()}
    </div>
  );
}

export default HeroStats