import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="bg-slate-300 p-10 grid gap-10 space-y-5 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-white p-10 rounded-lg group">
        <span className="font-semibold text-2xl">Select Item</span>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex justify-between my-2 first:bg-blue-300 group-hover:bg-blue-300"
          >
            <span className="text-gray-400 ">Grey Chair</span>
            <span>$19</span>
          </div>
        ))}

        {['a', 'b', 'c', ''].map((i) => (
          <div
            key={i}
            className="bg-amber-600 py-2 empty:bg-blue-500 first:bg-blue-500 odd:bg-black"
          >
            {i}
          </div>
        ))}

        <div className=" flex justify-between border-t-2 border-dashed">
          <span>Total</span>
          <span>$130</span>
        </div>
        <div className="mt-5 bg-blue-500 text-white text-center rounded-xl w-1/2 mx-auto p-3">
          Checkout
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden group">
        <div className="bg-blue-600 p-6">
          <span className="text-white text-2xl">Profile</span>
        </div>
        <div className="rounded-2xl bg-white relative p-6">
          <div className="flex justify-between items-end relative -mt-16">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-semibold">340</span>
            </div>
            <div className="h-24 w-24 bg-green-300 rounded-full group-hover:bg-red-300"></div>
            <div className="flex flex-col items-center">
              <span>Spent</span>
              <span>$2,310</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">Tony Molloy</span>
            <span>미국</span>
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
              <button className="w-5 h-5 rounded-full bg-yellow-500 focus:ring ring-yellow-500 ring-offset-2"></button>
              <button className="w-5 h-5 rounded-full bg-indigo-500 focus:ring ring-indigo-500 ring-offset-2"></button>
              <button className="w-5 h-5 rounded-full bg-teal-500 focus:ring ring-teal-500 ring-offset-2"></button>
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

      <div className="bg-blue-300 p-10 rounded-lg focus-within:bg-blue-100">
        <form action="" className="flex flex-col space-y-2">
          <input
            type="text"
            placeholder="your ID"
            className="placeholder-shown:bg-teal-300"
          />
          <input type="password" placeholder="your password" />
          <input type="submit" value="submit" className="bg-white" />
        </form>

        <form
          action=""
          className="flex flex-col space-y-2 mt-5 p-5 border-2 border-amber-200"
        >
          <input
            type="text"
            required
            placeholder="your ID"
            className="placeholder-shown:bg-teal-300 peer"
          />
          <span className="hidden peer-invalid:block peer-invalid:text-red-500">
            this input is invalid{' '}
          </span>
          <input type="submit" value="submit" className="bg-white" />
        </form>
      </div>

      <div className="bg-white rounded-lg">
        <details>
          <summary className="cursor-pointer">what is my fav food</summary>
          <span className="selection:bg-indigo-300">beef</span>
        </details>
        <input
          type="file"
          className="file:transition-colors file:cursor-pointer file:hover:text-purple-500
           file:hover:bg-white file:rounded-lg file:text-white file:bg-teal-500"
        />
      </div>
    </div>
  );
};

export default Home;
