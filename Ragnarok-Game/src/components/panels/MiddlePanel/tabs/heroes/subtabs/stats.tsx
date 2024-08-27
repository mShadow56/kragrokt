import React from 'react';
import { Hero, updateStatPointsAvailable, updateSubstats } from '../../../../../../classes/hero/hero';
import './stats.css';

function StatsTab({
  currentHero,
  setCurrentHero
}: {
  currentHero: Hero | undefined,
  setCurrentHero: (newHero: Hero | undefined) => void
}) {


  const renderPrimaryStat = (statName: string, statLevel: number) => {

    /**
     * Level stats buttons
     */
    function onLvlStatButtonClick(statName: string) {
      if (currentHero === undefined) {
        return;
      }
      if (currentHero.statPointsAvailable <= 0) {
        return;
      }
      const clone: Hero = structuredClone(currentHero);
      clone.stats[statName]++;
      clone.statPointsSpent++;
      updateStatPointsAvailable(clone);
      updateSubstats(clone);
      //populateHeroProfile(clone);
      setCurrentHero(clone);
    }

    return (
      <React.Fragment key={statName}>
        <div className="stat-label">{statName.toUpperCase()}:</div>
        <div id="con-stat" className="stat-value">{statLevel}</div>
        <button id="unlvl-con" className="lvl-button">-</button>
        <button id="lvl-con" className="lvl-button" onClick={() => onLvlStatButtonClick(statName)}>+</button>
      </React.Fragment>
    );
  };

  const renderSecondaryStat = (statName: string, statLevel: number) => {
    return (
      <React.Fragment key={statName}>
        <div className="stat-label">{statName.toUpperCase()}:</div>
        <div id="hp-stat" className="stat-value">{statLevel}</div>
        <div id="mt-stat" className="stat-value"></div>
        <div id="mt-stat" className="stat-value"></div>
      </React.Fragment>
    );
  };

  const renderStats = () => {
    if (!currentHero ||!currentHero.stats ||!currentHero.substats) {
      return (
        <div id="primary-stats" className="stats-box">
          <div className="stat-label">CON:</div>
          <div id="con-stat" className="stat-value"></div>
          <button id="unlvl-con" className="lvl-button">-</button>
          <button id="lvl-con" className="lvl-button">+</button>
          <div className="stat-label">INT:</div>
          <div id="int-stat" className="stat-value"></div>
          <button id="unlvl-int" className="lvl-button">-</button>
          <button id="lvl-int" className="lvl-button">+</button>
          <div className="stat-label">STR:</div>
          <div id="str-stat" className="stat-value"></div>
          <button id="unlvl-str" className="lvl-button">-</button>
          <button id="lvl-str" className="lvl-button">+</button>
          <div className="stat-label">DEX:</div>
          <div id="dex-stat" className="stat-value"></div>
          <button id="unlvl-dex" className="lvl-button">-</button>
          <button id="lvl-dex" className="lvl-button">+</button>
          <div className="stat-label">WIS:</div>
          <div id="wis-stat" className="stat-value"></div>
          <button id="unlvl-wis" className="lvl-button">-</button>
          <button id="lvl-wis" className="lvl-button">+</button>
        </div>
      );
    }

    return (
      <div id="primary-stats" className="stats-box">
        {Object.entries(currentHero.stats).map(([statName, statValue]) => 
          renderPrimaryStat(statName, statValue)
        )}
      </div>
    );
  };

  const renderSubstats = () => {
    if (!currentHero ||!currentHero.stats ||!currentHero.substats) {
      return (
        <div id="secondary-stats" className="stats-box">
          <div className="stat-label">HP:</div>
          <div id="hp-stat" className="stat-value"></div>
          <div id="mt-stat" className="stat-value"></div>
          <div id="mt-stat" className="stat-value"></div>
          <div className="stat-label">MP:</div>
          <div id="mp-stat" className="stat-value"></div>
          <div id="mt-stat" className="stat-value"></div>
          <div id="mt-stat" className="stat-value"></div>
          <div className="stat-label">ATK:</div>
          <div id="atk-stat" className="stat-value"></div>
          <div id="mt-stat" className="stat-value"></div>
          <div id="mt-stat" className="stat-value"></div>
          <div className="stat-label">DEF:</div>
          <div id="def-stat" className="stat-value"></div>
          <div id="mt-stat" className="stat-value"></div>
          <div id="mt-stat" className="stat-value"></div>
          <div className="stat-label">WLP:</div>
          <div id="wlp-stat" className="stat-value"></div>
          <div id="mt-stat" className="stat-value"></div>
          <div id="mt-stat" className="stat-value"></div>
        </div>
      );
    }

    return (
      <div id="secondary-stats" className="stats-box">
        {Object.entries(currentHero.substats).map(([statName, statValue]) => 
          renderSecondaryStat(statName, statValue)
        )}
      </div>
    );
  };

  return (
    <div id="stats-tab">
      <div className="stats-bar">
        <div id="primary-stats-title" className="stats-subtitle">Primary</div>
        <div id="stat-pts" className="stats-subtitle">{currentHero?.statPointsAvailable}</div>
        <div id="secondary-stats-title" className="stats-subtitle">Secondary</div>
      </div>
      {renderStats()}
      {renderSubstats()}
    </div>
  );
}

export default StatsTab;