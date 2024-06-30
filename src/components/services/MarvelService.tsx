import useHttp from '../../hooks/http.hook';

const useMarvelService = () => {
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = '';
  const _baseOffset = 210;
  const { clearError, request, error, loading } = useHttp();

  const getAllCharacter = async (offset: number = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(_transformCharacter);
  };

  const getSingleCharacter = async (id: number) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset: number = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getSingleComic = async (id: string | undefined) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);

    return _transformComics(res.data.results[0]);
  };

  return {
    getAllComics,
    getSingleComic,
    getAllCharacter,
    getSingleCharacter,
    clearError,
    error,
    loading,
  };
};

const _transformCharacter = (char: any) => {
  return {
    id: char.id,
    name: char.name,
    description:
      char.description.length > 20
        ? char.description.slice(0, 200) + '...'
        : char.description,
    thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
    homepage: char.urls[0].url,
    wiki: char.urls[1].url,
    comics: char.comics.items,
  };
};

const _transformComics = (comics: any) => {
  return {
    id: comics.id,
    title: comics.title,
    description: comics.description || 'There is no description',
    pageCount: comics.pageCount
      ? `${comics.pageCount} p.`
      : 'No information about the number of pages',
    thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
    language: comics.textObjects[0]?.language || 'en-us',
    price: comics.prices[0].price
      ? `${comics.prices[0].price}$`
      : 'not available',
  };
};

export default useMarvelService;
