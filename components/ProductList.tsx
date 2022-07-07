import React from 'react';
import useSWR from 'swr';
import { Product } from '@prisma/client';
import Item from 'components/base/Item';

interface IProductListProsps {
  kind: 'favs' | 'sales' | 'purchases';
}

interface IProduct extends Product {
  _count: { favs: number };
}

interface Record {
  id: number;
  product: IProduct;
}

interface ISoldResponse {
  [key: string]: Record[];
}

const ProductList = ({ kind }: IProductListProsps) => {
  const { data } = useSWR<ISoldResponse>(`/api/users/me/${kind}`);
  console.log(data);

  return (
    <>
      {data?.[kind].map((record) => (
        <Item
          id={record.product.id}
          key={record.product.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.favs}
        />
      ))}
    </>
  );
};

export default ProductList;
