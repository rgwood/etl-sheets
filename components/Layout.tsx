import Header from './Header'
import { ReactNode } from 'react';
import Clock from './Clock';
import Head from 'next/head';
import classNames from 'classnames'

export interface Props {
    title: string;
    error?: boolean;
    children: ReactNode[] | ReactNode;
}

const Layout = (props: Props) => (
    <div className="mx-auto max-w-2xl p-4 md:p-12">
        <Head>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossOrigin="anonymous"></link>
        </Head>
        <Header />
        <div className="p-4 shadow rounded bg-white relative">
            <div className="absolute pin-r pin-t mt-6 mr-4 text-grey-darker font-mono">
                <Clock />
            </div>
            <div id="contentTitle" className="flex">
                <span className={classNames("flex-2 font-sans font-bold text-3xl", 
                props.error ? "text-red-dark" : "text-alloy-teal-dark")}>
                    {props.title}
                </span>
            </div>
            <div />
            <span className="text-grey-darker">
                {props.children}
            </span>
        </div>
    </div>
)

export default Layout