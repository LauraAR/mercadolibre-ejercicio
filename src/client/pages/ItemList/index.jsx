import React, { memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from 'client/components/Loading';
import CategoryList from 'client/components/CategoryList';
import useIsomorphicLayoutEffect from 'client/hooks/useIsomorphicLayoutEffect';
import { getItemListIfNeed } from 'client/store/slices/item-list-slice';
import { STATUS } from 'configs/constants';

export const loadData = () => [getItemListIfNeed()];

const ItemListAsync = memo(() => {
  const { loading, error, items } = useSelector((state) => state.itemList);
  const categoryid = items.length > 0 && items[0].category_id;
  if (loading === STATUS.LOADING) return <Loading />;

  if (loading === STATUS.FAILED)
    return (
      <div>
        <h2>Oops! Failed to load data.</h2>

        <p>Message: {error?.message}</p>

        <p>Stack: {error?.stack}</p>
      </div>
    );
  return (
    <div>
      <div>
        <CategoryList categoryid={categoryid} />
      </div>
      <div className='subcontainer'>
        {items.slice(0, 4).map((item) => (
          <Row>
            <Col xs={5} sm={5} md={3} lg={2}>
              <Link to={`/items/${item.id}`}>
                <img src={item.thumbnail} alt='' />
              </Link>
            </Col>
            <Col xs={4} sm={4} md={5} lg={5}>
              <p className='price'>
                <span>$</span>
                {item.price}
              </p>
              <p>{item.title}</p>
            </Col>
            <Col xs={3} sm={3} md={4} lg={5}>
              <p className='city'>{item.address.state_name}</p>
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );
});

const ItemList = () => {
  const params = useParams();

  const dispatch = useDispatch();

  useIsomorphicLayoutEffect(() => {
    dispatch(getItemListIfNeed(params.search));
  }, []);
  return (
    <div className='container'>
      <ItemListAsync />
    </div>
  );
};

export default memo(ItemList);
