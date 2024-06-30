import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMarvelService from '../services/MarvelService';
import { IComics } from '../../types/types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './singleComic.scss';

const SingleComic = () => {
  const { getSingleComic, error, loading } = useMarvelService();
  const [comic, setComic] = useState<IComics | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleComic(id).then(setComic);
  }, []);

  const content =
    loading || error ? null : renderView(comic as IComics, navigate);
  const spinner =
    loading && !comic ? <Spinner height={450} grid1={1} grid2={4} /> : null;
  const errorMessage =
    error && !loading ? <ErrorMessage grid1={1} grid2={4} /> : null;

  return (
    <div className="single-comic">
      {spinner}
      {errorMessage}
      {content}
    </div>
  );
};

const renderView = (comic: IComics, navigate: NavigateFunction) => {
  return (
    <>
      <img src={comic?.thumbnail} alt="x-men" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{comic?.title}</h2>
        <p className="single-comic__descr">{comic?.description}</p>
        <p className="single-comic__descr">{comic?.pageCount}</p>
        <p className="single-comic__descr">{comic?.language}</p>
        <div className="single-comic__price">{comic?.price + '$'}</div>
      </div>
      <div className="single-comic__back" onClick={() => navigate(-1)}>
        Back to all
      </div>
    </>
  );
};

export default SingleComic;
