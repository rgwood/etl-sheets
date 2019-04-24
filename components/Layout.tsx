import Header from './Header'
import { ReactNode } from 'react';

export interface Props {
    title: string;
    topRightText?: string;
    children: ReactNode[] | ReactNode;
}

const Layout = (props: Props) => (
    <div className="mx-auto max-w-xl p-4 md:p-12">
        <Header />
        <div className="p-4 shadow rounded bg-white">
            <div id="contentTitle" className="flex">
                <span className="flex-2 text-purple text-3xl">{props.title}</span>
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