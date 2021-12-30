import Link, { LinkProps } from 'next/link';
import {useRouter} from 'next/router';
import React, { useMemo, ReactElement } from 'react';

interface ActivedLinkProps extends LinkProps{
    activedClassName: string;
    children: ReactElement
}

const ActivedLink = ({activedClassName, children, ...rest}: ActivedLinkProps) => {
    const {asPath} = useRouter();

    const className = useMemo(() => {
        const verifyActivedLink = asPath === rest.href ? activedClassName : '';
        return verifyActivedLink;
    }, [asPath, activedClassName, rest.href]);

    return(
        <Link {...rest}>    
            {React.cloneElement(children, {className})}
        </Link>
    );
}

export { ActivedLink }
