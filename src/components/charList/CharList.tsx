import { FC, useEffect, useState } from 'react';
import { ICharacter, TSetCharacterId } from '../../types/types';
import useMarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

interface ICharListProps {
  setCharacterId: TSetCharacterId;
}

const CharList: FC<ICharListProps> = ({ setCharacterId }) => {
  const { getAllCharacter, error, loading } = useMarvelService();

  const [charList, setCharList] = useState<ICharacter[] | []>([]);
  const [offset, setOffset] = useState(186);

  useEffect(() => {
    request(offset);
  }, []);

  const request = (offset: number) => {
    getAllCharacter(offset).then(loadMoreCharacters);
  };

  const loadMoreCharacters = (newCharacter: ICharacter[]) => {
    setCharList((oldCharacter) => [...oldCharacter, ...newCharacter]);
    setOffset((offset) => offset + 9);
  };

  const content = error
    ? null
    : renderView(charList as ICharacter[], setCharacterId);
  const spinner =
    loading && charList.length === 0 ? (
      <Spinner height={954} grid1={1} grid2={4} />
    ) : null;
  const errorMessage = error ? <ErrorMessage grid1={1} grid2={4} /> : null;

  return (
    <div className="char__list">
      <ul className="char__grid">
        {spinner}
        {errorMessage}
        {content}
      </ul>
      <button
        className="button button__main button__long"
        onClick={() => request(offset)}
        disabled={loading ? true : false}
      >
        <div className="inner">{loading ? 'loading...' : 'load more'}</div>
      </button>
    </div>
  );
};

const renderView = (
  charList: ICharacter[],
  setCharacterId: TSetCharacterId
) => {
  const items = charList.map((item) => {
    return (
      <li
        className="char__item"
        key={item.id}
        onClick={() => setCharacterId(item.id)}
      >
        <img src={item.thumbnail} alt="abyss" />
        <div className="char__name">{item.name}</div>
      </li>
    );
  });
  return items;
};

export default CharList;
