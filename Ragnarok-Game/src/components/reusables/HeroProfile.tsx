import { Hero } from '../../classes/hero/hero';
import defaultBackgroundImage from '../../assets/images/portraits/default-Background.png';
import defaultFrameImage from '../../assets/images/portraits/default-Frame.png';
import defaultFemaleImage from '../../assets/images/portraits/default-Female.png';
import defaultMaleImage from '../../assets/images/portraits/default-Male.png';
import defaultPlaceholderImage from '../../assets/images/portraits/placeholder.png';
import "./HeroProfile.css";


function HeroProfile({ hero }: { hero: Hero | undefined }) {
  let name: string = 'Name';
  let age: number | undefined = undefined;
  let gender: string = '';
  let xp: number | undefined = undefined;
  let lvl: number | undefined = undefined;
  let occupation: string = '';
  let background: string = '';

  if (hero) {
    name = `${hero.firstName} ${hero.lastName}`;
    age = hero.age;
    gender = hero.gender;
    xp = hero.xp;
    lvl = hero.level;
    occupation = hero.occupation;
    background = hero.background;
  }

  const getHeroImage = () => {
    if (gender === 'Male') {
      return defaultMaleImage;
    } else if (gender === 'Female') {
      return defaultFemaleImage;
    } else {
      return defaultPlaceholderImage;
    }
  }

  const getFrame = () => {
    return defaultFrameImage;
  }

  const getBackground = () => {
    return defaultBackgroundImage;
  }

  return (
    <>
      <h1 id="hero-profile-name" className="hero-profile-subtitle">{`${name}`}</h1>
      <div id="hero-profile-view" className="hero-profile-view">
        <div id="hero-profile-portrait" className="hero-profile-portrait">
          <img id="hero-profile-background"
            src={getBackground()}
            alt="Background Image"
            draggable="false"></img>
          <img id="hero-profile-image"
            src={getHeroImage()}
            alt="Hero Image"
            draggable="false"></img>
          <img id="hero-profile-frame"
            src={getFrame()}
            alt="Frame Image"
            draggable="false"></img>
        </div>
        <div id="hero-profile-info" className="hero-profile-info-box">
          <div className="hero-profile-info-pair">
            <div className="hero-profile-info-label">Age: </div>
            <div id="age" className="hero-profile-info-value">{age}</div>
          </div>
          <div className="hero-profile-info-pair">
            <div className="hero-profile-info-label">Gender: </div>
            <div id="gender" className="hero-profile-info-value">{gender}</div>
          </div>
          <div className="hero-profile-info-pair">
            <div className="hero-profile-info-label">Experience: </div>
            <div id="xp" className="hero-profile-info-value">{xp}</div>
          </div>
          <div className="hero-profile-info-pair">
            <div className="hero-profile-info-label">Level: </div>
            <div id="lvl" className="hero-profile-info-value">{lvl}</div>
          </div>
          <div className="hero-profile-info-pair">
            <div className="hero-profile-info-label">Occupation: </div>
            <div id="job" className="hero-profile-info-value">{occupation}</div>
          </div>
          <div className="hero-profile-info-pair">
            <div className="hero-profile-info-label">Background: </div>
            <div id="death" className="hero-profile-info-value">{background}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroProfile;