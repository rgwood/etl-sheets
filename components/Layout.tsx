import Header from './Header'
import { ReactNode } from 'react';
import Clock from './Clock';

export interface Props {
    title: string;
    topRightText?: string;
    children: ReactNode[] | ReactNode;
}

const Layout = (props: Props) => (
    <div className="mx-auto max-w-2xl p-4 md:p-12">
        <Header />
        <div className="p-4 shadow rounded bg-white relative">
            <div className="absolute pin-r pin-t mt-6 mr-4 text-grey-dark font-mono">
                <Clock />
            </div>
            <div id="contentTitle" className="flex">
                <span className="flex-2 text-alloy-teal-dark font-sans font-bold text-3xl">{props.title}</span>
                {props.topRightText ? <span className="flex-1 relative pin-t pin-r text-right text-grey-dark font-bold text-md">{props.topRightText}</span> : ''}
            </div>
            <div />
            <span className="text-grey-dark">
                {props.children}
            </span>
        </div>
    </div>
)

export default Layout