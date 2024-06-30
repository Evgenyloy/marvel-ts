import { FC, useEffect, useState } from 'react';
import { ICharacter, TSetCharacterId } from '../../types/types';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../services/MarvelService';
import './randomChar.scss';

interface IRandomChar {
  setCharacterId: TSetCharacterId;
}

const RandomChar: FC<IRandomChar> = ({ setCharacterId }) => {
  const [character, setCharacter] = useState<ICharacter | null>(null);

  const { clearError, getSingleCharacter, loading, error } = useMarvelService();

  useEffect(() => {
    request();
    const interval = setInterval(request, 600000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const request = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getSingleCharacter(id).then(setCharacter);
    if (error) clearError();
  };

  const content =
    error || loading
      ? null
      : renderView(character as ICharacter, setCharacterId);

  const spinner = loading ? <Spinner height={180} grid1={1} grid2={3} /> : null;
  const errorMessage = error && !loading ? <ErrorMessage /> : null;

  return (
    <div className="randomchar">
      {spinner}
      {errorMessage}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button
          className="button button__main"
          onClick={() => request()}
          disabled={loading ? true : false}
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const renderView = (character: ICharacter, setCharacterId: TSetCharacterId) => {
  return (
    <div className="randomchar__block">
      <img
        src={character?.thumbnail}
        alt="Random character"
        className="randomchar__img"
        onClick={() => setCharacterId(character?.id)}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{character?.name}</p>
        <p className="randomchar__descr">
          {character?.description ? character?.description : 'no description'}
        </p>
        <div className="randomchar__btns">
          <a href={character?.homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={character?.wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
