import dynamic from 'next/dynamic';

const form = dynamic(() => import('components/ProductList'), { ssr: false });

const Dynamic = () => {
  console.log('dynamic load');
  return <h1>dynamic</h1>;
};

export default Dynamic;
