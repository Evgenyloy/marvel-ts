import { FC } from 'react';
import img from './error.gif';

interface ErrorMessageProps {
  grid1?: number;
  grid2?: number;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ grid1, grid2 }) => {
  return (
    <img
      style={{
        display: 'block',
        width: '250px',
        height: '250px',
        objectFit: 'contain',
        margin: '0 auto',
        gridColumnStart: grid1,
        gridColumnEnd: grid2,
      }}
      src={img}
      alt="Error"
    />
  );
};

export default ErrorMessage;
