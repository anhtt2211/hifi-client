import { Card, Col, Image, Row, Tag } from 'antd';
import postApi from 'api/postApi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { Post } from 'types';
import { timeAgo } from 'utils/date_time';
import { HeroIcon } from 'utils/HeroIcon';

type Props = {
  data: Post;
};

const JobCardItem = (props: Props) => {
  const [isLiked, setIsLiked] = useState(props.data.isFavorited);
  const idUser = useAppSelector((state) => state.auth.user?._id);
  const router = useRouter();
  const handleLike = async () => {
    try {
      if (idUser) {
        if (isLiked) {
          const result = await postApi.deleteFavoritePost(idUser, props.data._id);
        } else {
          const result = await postApi.addFavoritePost(idUser, props.data._id);
        }
        setIsLiked(!isLiked);
      } else {
        router.push('/auth/login');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Row className=' mb-[10px] last:mb-0 hover:opacity-90 hover:shadow-lg'>
      <Card className='w-full p-[20px]'>
        <Row>
          <Col span={3}>
            <a href={`/job-posts/${props.data._id}`} target='_blank' rel='noopener noreferrer'>
              <Image width={100} height={100} className='bg-red-500' preview={false} />
            </a>
          </Col>
          <Col span={21} className='text-lg pl-[10px]'>
            <Row>
              <Col span={18} className=' text-[#8B7A9F] font-semibold'>
                {props.data.company?.name}
              </Col>
              <Col span={6} className='!flex justify-end'>
                <span>
                  Còn <strong>7</strong> ngày để ứng tuyển
                </span>
              </Col>
            </Row>
            <Col span={18}>
              <a
                href={`/job-posts/${props.data._id}`}
                target='_blank'
                rel='noopener noreferrer'
                className=' hover:underline !decoration-black'
              >
                <h2 className='text-[22px] font-semibold mb-0'>{props.data.title}</h2>
              </a>
            </Col>
            <Col span={24} className='text-[14px] my-2'>
              {props.data.locations && props.data?.locations[0].address}
            </Col>
            <Row>
              <Col span={20}>
                <Tag className='!rounded-[4px]'>{props.data.jobCategory?.name}</Tag>
                <Tag className='!rounded-[4px]'>
                  {props.data?.salary?.negotiable
                    ? 'Negotiable'
                    : `${props.data?.salary?.min} - ${props.data?.salary?.max} ${props.data?.salary?.unit}`}
                </Tag>
                {props.data.skillTags?.map((e: any, index) => (
                  <Tag className='!rounded-[4px]' key={index}>
                    {e.text}
                  </Tag>
                ))}
                <Tag className='!rounded-[4px]'>
                  {timeAgo(new Date(props.data.updatedAt ?? ''))}
                </Tag>
              </Col>
              <Col span={4} className='!flex justify-end'>
                <div onClick={() => handleLike()}>
                  <HeroIcon
                    icon='HeartIcon'
                    outline={!isLiked}
                    size='h-[22px]'
                    color={isLiked ? '!text-[#D82727]' : ''}
                    className=' hover:!text-[#D82727]'
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Row>
  );
};

export default JobCardItem;