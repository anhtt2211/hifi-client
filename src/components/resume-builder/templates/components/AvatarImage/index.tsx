/* eslint-disable @next/next/no-img-element */

import styled from 'styled-components';

const ImageContainer = styled.img`
  background-color: ${(props: any) => props.theme.primary};
  text-align: center;
  border-radius: 50%;
  object-fit: cover;
`;

const AvatarImage = ({ url, size }: { url: string; size: number }) => {
  return (
    <div className='text-center mt-1 mb-4'>
      <ImageContainer src={url} alt='avatar' width={size} height={size} />
    </div>
  );
};

export default AvatarImage;
