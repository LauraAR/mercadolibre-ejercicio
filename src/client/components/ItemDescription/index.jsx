import React, { memo, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const fetch = require('node-fetch');

const ItemDescription = (itemId) => {
  const [itemDescription, setItemDescription] = useState(null);
  // eslint-disable-next-line react/destructuring-assignment
  const itemid = itemId ? itemId.itemId : '';
  useEffect(() => {
    let isMounted = true;
    fetch(`https://api.mercadolibre.com/items/${itemid}/description`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setItemDescription(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div>
      <Row>
        <Col xs={8} sm={8} md={8} lg={8}>
          <p className='titleDescription'> Descripción del producto </p>
          <p className='description'> {itemDescription && itemDescription.plain_text} </p>
        </Col>
      </Row>
    </div>
  );
};

export default memo(ItemDescription);
