export interface ICharacterComics {
  [key: string]: string;
}

export interface ICharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  homepage: string;
  wiki: string;
  comics: ICharacterComics[] | [];
}

export type TSetCharacterId = (arg: null | number) => void;

export interface IComics {
  description: string;
  id: number;
  language: string;
  pageCount: string;
  price: string;
  thumbnail: string;
  title: string;
}
