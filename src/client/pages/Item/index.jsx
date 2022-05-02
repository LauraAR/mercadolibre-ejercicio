import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Loading from 'client/components/Loading';
import CategoryList from 'client/components/CategoryList';
import useIsomorphicLayoutEffect from 'client/hooks/useIsomorphicLayoutEffect';
import { getItemIfNeed } from 'client/store/slices/item-slice';
import { STATUS } from 'configs/constants';
import ItemDescription from '../../components/ItemDescription';

const selectItem = (state, id) => state.item[id];

export const loadData = ({ params }) => [getItemIfNeed(params.id)];

const ItemAsync = memo(() => {
  const params = useParams();
  const selectItemById = createSelector(selectItem, (data) => data);
  const item = useSelector((state) => selectItemById(state, params.id));
  const categoryid = item?.data?.category_id;
  if (item?.loading === STATUS.LOADING) return <Loading />;

  if (item?.loading === STATUS.FAILED)
    return (
      <div>
        <h2>Oops! Failed to load data.</h2>

        <p>Message: {item?.error?.message}</p>

        <p>Stack: {item?.error?.stack}</p>
      </div>
    );
  return (
    <div>
      <div>
        <CategoryList categoryid={categoryid} />
      </div>
      <div className='subcontainer-item'>
        <Row>
          <Col xs={8} sm={8} md={8} lg={8}>
            <img src={item?.data?.pictures[0].url} alt='' className='img' crossOrigin='anonymous' />
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <p className='quantity'>
              {item?.data?.condition === 'new' ? 'Nuevo' : 'Usado'} - {item?.data?.sold_quantity} vendido
              {item?.data?.sold_quantity !== 1 ? 's' : ''}
            </p>
            <p className='title'>{item?.data?.title}</p>
            <p className='price'>
              <span>$</span>
              {item?.data?.price}
            </p>
            <button className='button' type='submit'>
              Comprar
            </button>
          </Col>
        </Row>
        <ItemDescription itemId={params.id} />
      </div>
    </div>
  );
});

const Item = () => {
  const params = useParams();

  const dispatch = useDispatch();

  useIsomorphicLayoutEffect(() => {
    dispatch(getItemIfNeed(params.id));
  }, []);

  return (
    <div className='container'>
      <Helmet title='Item' />
      <ItemAsync />
    </div>
  );
};

export default memo(Item);
