import type { NextPage } from 'next';
import FloatingButton from 'components/base/FloatingButton';
import Item from 'components/base/Item';
import Layout from 'components/layout';
import useUser from 'libs/client/useUser';
import Head from 'next/head';
import useSWR from 'swr';
import { Product } from '@prisma/client';

interface ICountProduct extends Product {
  _count: ICount;
}

interface ICount {
  favs: number;
}

interface IItemResponse {
  ok: boolean;
  items: ICountProduct[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<IItemResponse>('/api/items');
  console.log(data);

  return (
    <Layout title="홈" hasTabBar>
      <Head>
        <title>home</title>
      </Head>
      <div className="flex flex-col space-y-5 divide-y">
        {data?.items?.map((item) => (
          <Item
            id={item.id}
            key={item.id}
            title={item.name}
            price={item.price}
            hearts={item._count.favs}
          />
        ))}
        <FloatingButton href="/items/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Home;
