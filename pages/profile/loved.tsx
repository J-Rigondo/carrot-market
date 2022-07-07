import { NextPage } from 'next';
import Layout from 'components/layout';
import Item from 'components/base/Item';
import ProductList from 'components/ProductList';

const Loved: NextPage = () => {
  return (
    <Layout title="관심목록" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="favs" />
      </div>
    </Layout>
  );
};

export default Loved;
