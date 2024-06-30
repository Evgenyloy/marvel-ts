import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ICharacter } from '../../types/types';
import useMarvelService from '../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charInfo.scss';

interface ICharInfoProps {
  characterId: number | null;
}

const CharInfo: FC<ICharInfoProps> = ({ characterId }) => {
  const { getSingleCharacter, error, loading } = useMarvelService();
  const [character, setCharacter] = useState<ICharacter | null>(null);

  useEffect(() => {
    request(characterId);
  }, [characterId]);

  const request = (characterId: number | null) => {
    if (typeof characterId === 'number') {
      getSingleCharacter(characterId).then(setCharacter);
    } else {
      return;
    }
  };
  const content =
    loading || !character || error ? null : renderView(character as ICharacter);
  const skeleton = loading || !character ? <Skeleton /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {content}
    </div>
  );
};

const renderView = (character: ICharacter) => {
  const comics = character?.comics.map((item) => {
    const string = item?.resourceURI;
    const id = string.split('/').reverse()[0];

    return (
      <li className="char__comics-item" key={item?.name}>
        <Link to={`comics/${id}`} className="char__comics-link">
          {' '}
          {item.name}
        </Link>
      </li>
    );
  });

  return (
    <>
      <div className="char__basics">
        <img src={character?.thumbnail} alt="abyss" />
        <div>
          <div className="char__info-name">{character?.name}</div>
          <div className="char__btns">
            <a href={character?.homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={character?.wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{character?.description}</div>
      <div className="char__comics">
        {comics?.length > 0 ? 'Comics:' : null}
      </div>
      <ul className="char__comics-list">
        {comics?.length > 0 ? comics : 'there is no comics with this character'}
        {comics}
      </ul>
    </>
  );
};

export default CharInfo;
