import { useEffect } from 'react';
import './PartySetting.css';
import selectLowerBoxBackgroundImage from '../../../../../../../assets/images/frames/lower-box-background.png';
import selectLowerBoxFrameImage from '../../../../../../../assets/images/frames/lower-box-frame.png';
import { Task, addHeroToParty, removeHeroFromParty } from '../../../../../../../classes/task/task';
import { Hero } from '../../../../../../../classes/hero/hero';
import { getHero, isHeroInParty, isTaskEditable } from '../../../../../../GameState';


function PartySetting({
  currentTask,
  currentHero,
  setCurrentHero,
  partyMembers,
  setPartyMembers }: {
    currentTask: Task | undefined,
    currentHero: Hero | undefined,
    setCurrentHero: (newHero: Hero) => void,
    partyMembers: Hero[],
    setPartyMembers: (newParty: Hero[]) => void
  }) {

  useEffect(() => {
    if (currentTask && currentTask.party.length > 0) {
      for (let i = 0; i < currentTask.party.length; i++) {
        const hero = getHero(currentTask.party[i]);
        if (hero) {
          hero.inParty = true;
        }
      }
      const loadedHeroes = currentTask.party.map(id => getHero(id));
      const filteredHeroes = loadedHeroes.filter(hero => hero !== undefined) as Hero[];
      setPartyMembers(filteredHeroes);
    }
  }, []);

  useEffect(() => {
    if (currentTask) {
      for (let i = 0; i < currentTask.party.length; i++) {
        const hero = getHero(currentTask.party[i]);
        if (hero) {
          hero.inParty = true;
        }
      }
      const loadedHeroes = currentTask.party.map(id => getHero(id));
      const filteredHeroes = loadedHeroes.filter(hero => hero !== undefined) as Hero[];
      setPartyMembers(filteredHeroes);
    }
  }, [currentTask]);

  const handleAddButtonClick = () => {
    if (currentTask && currentHero) {
      if (!isTaskEditable(currentTask)) {
        return;
      }
      if (!isHeroInParty(currentHero)) {
        addHeroToParty(currentTask, currentHero);
        const newPartyMembers = [...partyMembers, currentHero];
        setPartyMembers(newPartyMembers);
      }
    }
  };

  const handleRemoveButtonClick = () => {
    if (currentTask && currentHero) {
      if (!isTaskEditable(currentTask)) {
        return;
      }
      if (currentTask.party.length > 0 && isHeroInParty(currentHero)) {
        removeHeroFromParty(currentTask, currentHero);
        const newPartyMembers = partyMembers.filter(member => member.id !== currentHero.id);
        setPartyMembers(newPartyMembers);
      }
    }
  };
  
  function handlePartyMemberClick(member: Hero): void {
    const hero: Hero | undefined = getHero(member.id);
    if (hero) {
      setCurrentHero(hero);
    }
  }

  function getPartyMembers() {

    return (
      <>
        {partyMembers.map((member, index) => (
          <div key={index} id={`party-${member.id}`} className='party-member-name' onClick={() => handlePartyMemberClick(member)}>
            {member.firstName} {member.lastName}
          </div>
        ))}
      </>
    );
  }

  return (
    <div id="task-party" className="list-setting">
      <div id="party-name" className="list-label">Party:</div>
      <div id="party" className="list-box">
        <img className="list-box-background"
          src={selectLowerBoxBackgroundImage}
          alt="Party Background img"
          draggable="false">
        </img>
        <img className="list-box-frame"
          src={selectLowerBoxFrameImage}
          alt="Party Frame img"
          draggable="false">
        </img>
        <div id="party-list" className="list-box-names">
          {getPartyMembers()}
        </div>
      </div>
      <div className="party-buttons">
        <button id="add-to-party" className="tab-button" onClick={handleAddButtonClick}>Add</button>
        <button id="remove-from-party" className="tab-button" onClick={handleRemoveButtonClick}>Remove</button>
      </div>
    </div>
  );
}

export default PartySetting;