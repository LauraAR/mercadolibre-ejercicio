import React, { memo, useEffect, useState } from 'react';
const fetch = require('node-fetch');

const CategoryList = (categoryid) => {
  const [categories, setCategories] = useState(null);
  // eslint-disable-next-line react/destructuring-assignment
  const categoryId = categoryid ? categoryid.categoryid : '';
  useEffect(() => {
    let isMounted = true;
    fetch(`https://api.mercadolibre.com/categories/${categoryId}`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setCategories(result.path_from_root);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className='category'>
      <ul>
        {categories &&
          categories.map((category, i) => (
            <span>
              {category.name} {i < categories.length - 1 ? ' > ' : ''}
            </span>
          ))}
      </ul>
    </div>
  );
};

export default memo(CategoryList);
