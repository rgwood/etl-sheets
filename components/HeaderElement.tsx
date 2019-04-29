import Link from 'next/link'
import { withRouter, SingletonRouter } from 'next/router'
import classNames from 'classnames'

interface ActiveLinkProps {
    router: SingletonRouter;
    href: string;
    text: string;
    extraClasses?: string;
    notificationCount?: number;
}

const HeaderElement: React.SFC<ActiveLinkProps> = (props) => {

    let isActive = props.href === props.router.pathname;

    return <Link href={props.href}>
        <a className={classNames("relative p-2 shadow rounded text-lg text-purple-dark no-underline",
            props.extraClasses ? props.extraClasses : '',
            isActive ? "bg-yellow-light" : "bg-white",
            isActive ? "hover:bg-yellow" : "hover:bg-yellow-lighter",
        )}>
        {props.text}
        {/* HACK: Only show notifications for non-active tag. This is a cheap way of pretending that notifications are marked as read when a page is opened*/
            !isActive && props.notificationCount && props.notificationCount > 0 &&
            <span className="absolute pin-t pin-r flex w-4 h-4 -mt-2 -mr-2 justify-center items-center text-xs font-medium text-red-lightest bg-red rounded-full">
            {props.notificationCount}
            </span>
        }
        </a>
    </Link>
}

export default withRouter(HeaderElement);
