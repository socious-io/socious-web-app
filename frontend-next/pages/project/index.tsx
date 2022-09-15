import type {NextPage} from 'next';
import Link from 'next/link';
import Image from 'next/image';

const product = {
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
};

const imgSrc = require('../../asset/icons/Base.svg');
const imgUserSrc = require('../../asset/icons/user.svg');
const Project: NextPage = () => {
  return (
    <main className="bg-white shadow rounded-lg px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
      <div className="max-w-3xl mx-auto">
        <div className="max-w-xl">
          <div className="flex flex-row items-center ">
            <div className="items-center rounded-full ">
              <div className="relative  h-12 w-12  ">
                <Link href="/">
                  <a>
                    <Image
                      src={imgSrc}
                      className="fill-warning"
                      alt="socious logo"
                      layout="fill" // required
                      width={32}
                      height={32}
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="ml-4 items-center">
              <h1 className="text-sm font-semibold  tracking-wide text-indigo-600">
                Organization
              </h1>
              <p className=" text-base text-gray-500">location</p>
            </div>
          </div>

          <p className="mt-2 text-4xl text-base font-semibold tracking-tight sm:text-base">
            Project
          </p>
          <div className="mt-6 flex-1 flex items-end">
            <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
              <div className="flex">
                <dt className="font-medium text-graySubtitle">Intermediate</dt>
              </div>
              <div className="pl-4 flex sm:pl-6">
                <dt className="font-medium text-graySubtitle">Part-time</dt>
              </div>
              <div className="pl-4 flex sm:pl-6">
                <dt className="font-medium text-graySubtitle">Volunteer</dt>
              </div>
            </dl>
          </div>
          <div key={product.id} className="mt-4 flex space-x-6">
            <div className="flex-auto flex flex-col">
              <div>
                <p className="mt-2 text-sm text-gray-600">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section aria-labelledby="order-heading" className="mt-10 ">
          <div className="flex space-x-8  overflow-x-auto  ">
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Button text
            </button>
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

          <div className="flex mt-4 justify-between">
            <dt className="flex font-medium text-gray-900">Discount</dt>
            <div className="flex flex-row items-center ">
              <div className="relative  h-6 w-6 ">
                <Link href="/">
                  <a>
                    <Image
                      src={imgUserSrc}
                      className="fill-warning"
                      alt="socious logo"
                      layout="fill" // required
                    />
                  </a>
                </Link>
              </div>
              <div className="relative -ml-2  h-6 w-6 ">
                <Link href="/">
                  <a>
                    <Image
                      src={imgUserSrc}
                      className="fill-warning"
                      alt="socious logo"
                      layout="fill" // required
                      width={24}
                      height={24}
                    />
                  </a>
                </Link>
              </div>
              <div className="relative -ml-2  h-6 w-6 ">
                <Link href="/">
                  <a>
                    <Image
                      src={imgUserSrc}
                      className="fill-warning"
                      alt="socious logo"
                      layout="fill" // required
                      width={32}
                      height={32}
                    />
                  </a>
                </Link>
              </div>
              <dd className="ml-2 text-gray-700">connections</dd>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Project;
