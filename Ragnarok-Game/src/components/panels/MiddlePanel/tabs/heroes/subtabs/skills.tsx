import React from 'react';
import { Hero } from '../../../../../../classes/hero/hero';
import './skills.css';
import { capitalizeFirstLetter } from '../../../../../../utils/string';

function SkillsTab({ currentHero }: { currentHero: Hero | undefined }) {
  // Function to render a single skill
  const renderSkill = (skillName: string, skillLevel: number) => {
    return (
      <React.Fragment key={skillName}>
        <div className="skill-label">{capitalizeFirstLetter(skillName)}:</div>
        <div id={`${skillName}-skill`} className="skill-value">{skillLevel}</div>
      </React.Fragment>
    );
  };

  // Function to render all skills divided into two boxes
  const renderDividedSkills = () => {
    if (!currentHero ||!currentHero.skills) {
      return (
        <>
          <div id="left-skills-box" className="skills-box">
            <div className="skill-label">Fishing:</div>
            <div id="fishing-skill" className="skill-value">0</div>
            <div className="skill-label">Hunting:</div>
            <div id="hunting-skill" className="skill-value">0</div>
            <div className="skill-label">Cooking:</div>
            <div id="cooking-skill" className="skill-value">0</div>
            <div className="skill-label">Farming:</div>
            <div id="farming-skill" className="skill-value">0</div>
            <div className="skill-label">Brewing:</div>
            <div id="brewing-skill" className="skill-value">0</div>
          </div>
          <div id="right-skills-box" className="skills-box">
            <div className="skill-label">Gathering:</div>
            <div id="gathering-skill" className="skill-value">0</div>
            <div className="skill-label">Woodcutting:</div>
            <div id="woodcutting-skill" className="skill-value">0</div>
            <div className="skill-label">Fletching:</div>
            <div id="fletching-skill" className="skill-value">0</div>
            <div className="skill-label">Mining:</div>
            <div id="mining-skill" className="skill-value">0</div>
            <div className="skill-label">Smithing:</div>
            <div id="smithing-skill" className="skill-value">0</div>
          </div>
        </>
      );
    }

    const allSkills = Object.entries(currentHero.skills);
    const firstFiveSkills = allSkills.slice(0, 5); // Get the first five skills
    const remainingSkills = allSkills.slice(5); // Get the remaining skills

    return (
      <>
        <div id="left-skills-box" className="skills-box">
          {firstFiveSkills.map(([skillName, skill]) =>
            renderSkill(skillName, skill.lvl)
          )}
        </div>
        <div id="right-skills-box" className="skills-box">
          {remainingSkills.map(([skillName, skill]) =>
            renderSkill(skillName, skill.lvl)
          )}
        </div>
      </>
    );
  };

  return (
    <div id="skills-tab">
      {renderDividedSkills()}
    </div>
  );
}

export default SkillsTab;
