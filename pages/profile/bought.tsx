import { NextPage } from 'next';
import Layout from 'components/layout';
import Item from 'components/base/Item';
import ProductList from 'components/ProductList';

const Bought: NextPage = () => {
  return (
    <Layout title="구매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="purchases" />
      </div>
    </Layout>
  );
};

export default Bought;
