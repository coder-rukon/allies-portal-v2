'use client'
import Link from 'next/link';
import { useRouter,usePathname } from 'next/navigation';
let Sidebar = () => {
    let pathName = usePathname();
    return(
        <div className="main_sidebar">
            <Link className='main_logo' href="/">
                <img src="/allies-dark-logo.png" alt="Allies logo"/>
            </Link>
            <ul className="sidebar_menu">
                <li><Link href="#" className={pathName === '/' ? 'active' : ''}>Dashboard</Link></li>
                <li><Link href="#" className={pathName === '/deals' ? 'active' : ''}>Deal Pipeline</Link></li>
                <li><Link href="/company" className={pathName === '/company' ? 'active' : ''}>Companies</Link></li>
                <li><Link href="/property" className={pathName === '/property' ? 'active' : ''}>Property</Link></li>
                <li><Link href="#" className={pathName === '/' ? 'active' : ''}>Active Deals</Link></li>
                <li><Link href="#" className={pathName === '/' ? 'active' : ''}>Calander</Link></li>
            </ul>
            <div className='divider'></div>
            <ul className="sidebar_menu sidebar_menu_2">
                <li><Link href="/company/new-company" className={pathName === '/company/new-company' ? 'active' : ''}>Add Company</Link></li>
                <li><Link href="/property/create" className={pathName === '/property/create' ? 'active' : ''}>Add property</Link></li>
                <li><Link href="#" className={pathName === '/' ? 'active' : ''}>Add Deal</Link></li>
            </ul>
        </div>
    )
}
export default Sidebar