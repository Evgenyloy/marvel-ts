import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import useMarvelService from '../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { IComics } from '../../types/types';
import './comicsList.scss';

const ComicsList = () => {
  const { getAllComics, error, loading } = useMarvelService();
  const [comics, setComics] = useState<IComics[] | []>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    request(offset);
  }, []);

  const request = (offset: number) => {
    getAllComics(offset).then(loadMoreComics);
  };

  const loadMoreComics = (newComics: IComics[]) => {
    setComics((oldComics) => [...oldComics, ...newComics]);
    setOffset((offset) => offset + 8);
  };

  const content = error ? null : renderView(comics);
  const spinner =
    loading && comics.length === 0 ? (
      <Spinner height={855} grid1={1} grid2={5} />
    ) : null;
  const errorMessage = error ? <ErrorMessage grid1={1} grid2={5} /> : null;

  return (
    <div className="comics__list">
      <ul className="comics__grid">
        {spinner}
        {errorMessage}
        {content}
      </ul>
      <button
        className="button button__main button__long"
        onClick={() => request(offset)}
        disabled={loading || error ? true : false}
      >
        <div className="inner">{loading ? 'loading...' : 'load more'}</div>
      </button>
    </div>
  );
};

const renderView = (comics: IComics[]) => {
  return comics.map((item) => {
    return (
      <li className="comics__item" key={uuidv4()}>
        <Link to={`${item?.id}`}>
          <img
            src={item?.thumbnail}
            alt="ultimate war"
            className="comics__item-img"
          />
          <div className="comics__item-name">{item?.title}</div>
          <div className="comics__item-price">{item?.price}</div>
        </Link>
      </li>
    );
  });
};

export default ComicsList;
