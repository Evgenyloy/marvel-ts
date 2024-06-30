import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import RandomChar from '../randomChar/RandomChar';
import { useState } from 'react';
import decoration from '../../resources/img/vision.png';

const MainPage = () => {
  const [characterId, setCharacterId] = useState<null | number>(null);
  return (
    <>
      <RandomChar setCharacterId={setCharacterId} />
      <div className="char__content">
        <CharList setCharacterId={setCharacterId} />
        <CharInfo characterId={characterId} />
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
