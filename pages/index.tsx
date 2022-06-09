import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="bg-slate-300 p-10  flex flex-col space-y-5 max-w-md min-h-screen">
      <div className="bg-white p-10 rounded-lg">
        <span className="font-semibold text-2xl">Select Item</span>
        <div className="flex justify-between my-2">
          <span className="text-gray-400 ">Grey Chair</span>
          <span>$19</span>
        </div>
        <div className="flex justify-between my-2">
          <span className="text-gray-400 ">Grey Chair2</span>
          <span>$13</span>
        </div>
        <div className=" flex justify-between border-t-2 border-dashed">
          <span>Total</span>
          <span>$130</span>
        </div>
        <div className="mt-5 bg-blue-500 text-white text-center rounded-xl w-1/2 mx-auto p-3">
          Checkout
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 p-6">
          <span className="text-white text-2xl">Profile</span>
        </div>
        <div className="rounded-2xl bg-white relative p-6">
          <div className="flex justify-between items-end relative -mt-16">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-semibold">340</span>
            </div>
            <div className="h-24 w-24 bg-red-300 rounded-full"></div>
            <div className="flex flex-col items-center">
              <span>Spent</span>
              <span>$2,310</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">Tony Molloy</span>
            <span>미국국</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-lg">
        <div className="flex justify-between items-center mb-5">
          <span>👍</span>
          <div className="space-x-3">
            <span>💛4.9</span>
            <span className="shadow-xl p-2 rounded-md">🧡</span>
          </div>
        </div>

        <div className="bg-zinc-400 h-40 mb-5"></div>

        <div className="flex flex-col">
          <span className="font-medium mb-1.5 text-lg">Swoon Lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button className="w-5 h-5 rounded-full bg-yellow-500"></button>
              <button className="w-5 h-5 rounded-full bg-indigo-500"></button>
              <button className="w-5 h-5 rounded-full bg-teal-500"></button>
            </div>
            <div className="flex items-center space-x-3">
              <button className=" bg-blue-400 font-bold text-white w-10 aspect-square rounded-md text-xl hover:bg-blue-700 active:bg-teal-500 ease-in-out duration-300">
                -
              </button>
              <span>1</span>
              <button className=" bg-blue-400 font-bold text-white w-10 aspect-square rounded-md text-xl">
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-2xl">$450</span>
            <button className="bg-blue-500 rounded-lg p-3 text-white">
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-lg"></div>
    </div>
  );
};

export default Home;
