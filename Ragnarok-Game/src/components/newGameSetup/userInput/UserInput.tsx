import React, { useState } from 'react';
import './UserInput.css';
import userInputBackground from '../../../assets/images/userInputBackground.png';
import { setNGG, setLog } from '../../GameState';


interface FormState {
  name: string;
  gender: 'Male' | 'Female';
  preferredGod: 'Óðinn' | 'Freyja';
}

function UserInput({ setScene }: { setScene: (scene: number) => void }) {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    gender: 'Male',
    preferredGod: 'Óðinn',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value === 'gender' ? (value as 'Male' | 'Female') : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
    // Here you can handle the form submission logic, such as sending data to an API or updating state
    setNGG(formState.name, formState.gender, formState.preferredGod);
    setLog(true);
    setScene(3);
  };


  return (
    <>
      <img className="user-input-background" src={userInputBackground} alt="background" />
      <h3 className='user-input-title'>CHARACTER CREATION</h3>
      <div className="user-input-container"> <form onSubmit={handleSubmit} autoComplete='off'>
        <div><label htmlFor="name">NAME:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
          />
          <br />

          <label htmlFor="gender">GENDER:</label>
          <select id="gender" name="gender" value={formState.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <br />

          <label htmlFor="preferred-god">PREFERRED GOD:</label>
          <select id="preferred-god" name="preferredGod" value={formState.preferredGod} onChange={handleChange}>
            <option value="Óðinn">Óðinn</option>
            <option value="Freyja">Freyja</option>
          </select>
          <br /></div>
        <button type="submit">CREATE CHARACTER</button>
      </form></div>
    </>
  );
};

export default UserInput;