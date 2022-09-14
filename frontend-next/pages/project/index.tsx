import type {NextPage} from 'next';
import Link from 'next/link';
import Image from 'next/image';

const products = [
  {
    id: 1,
    name: 'Cold Brew Bottle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Equat faucibus sed facilisi sit id blandiacilisi sit id blandit... See more',
    href: '#',
    quantity: 1,
    price: '$32.00',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/confirmation-page-05-product-01.jpg',
    imageAlt: 'Glass bottle with black plastic pour top and mesh insert.',
  },
];
const imgSrc = require('../../asset/icons/logo.svg');

const Project: NextPage = () => {
  return (
    <main className="bg-white px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
      <div className="max-w-3xl mx-auto">
        <div className="max-w-xl">
          <div>
            <Link href="/">
              <a>
                <Image
                  src={imgSrc}
                  className="fill-warning"
                  alt="socious logo"
                  width={'100%'}
                  height={'100%'}
                />
              </a>
            </Link>
          </div>
          <h1 className="text-sm font-semibold  tracking-wide text-indigo-600">
            Organization
          </h1>
          <p className="mt-2 text-base text-gray-500">location</p>
          <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Project Title
          </p>

          <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">Tracking number</dt>
            <dd className="text-indigo-600 mt-2">51547878755545848512</dd>
          </dl>
        </div>

        <section aria-labelledby="order-heading" className="mt-10 border-t ">
          {products.map((product) => (
            <div key={product.id} className="py-10  flex space-x-6">
              <div className="flex-auto flex flex-col">
                <div>
                  <div className="mt-6 flex-1 flex items-end">
                    <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                      <div className="flex">
                        <dt className="font-medium text-gray-900">Quantity</dt>
                        <dd className="ml-2 text-gray-700">
                          {product.quantity}
                        </dd>
                      </div>
                      <div className="pl-4 flex sm:pl-6">
                        <dt className="font-medium text-gray-900">Price</dt>
                        <dd className="ml-2 text-gray-700">{product.price}</dd>
                      </div>
                    </dl>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-row ">
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Button text
            </button>
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Button 2
            </button>
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Button text
            </button>
          </div>
          <div className="sm:ml-40 sm:pl-6">
            <dl className="space-y-6 text-sm pt-10">
              <div className="flex justify-between">
                <dt className="flex font-medium text-gray-900">Discount</dt>
                <dd className="text-gray-700">connections</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Project;
