import Link from 'next/link';
let Sidebar = () => {
    return(
        <div className="main_sidebar">
            <Link className='main_logo' href="/">
                <img src="/allies-dark-logo.png" alt="Allies logo"/>
            </Link>
            <ul className="sidebar_menu">
                <li><Link href="#">Dashboard</Link></li>
                <li><Link href="#">Deal Pipeline</Link></li>
                <li><Link href="/company" className='active'>Companies</Link></li>
                <li><Link href="/property">Property</Link></li>
                <li><Link href="#">Active Deals</Link></li>
                <li><Link href="#">Calander</Link></li>
            </ul>
            <div className='divider'></div>
            <ul className="sidebar_menu sidebar_menu_2">
                <li><Link href="/company/new-company" className='active'>Add Company</Link></li>
                <li><Link href="/property/create">Add property</Link></li>
                <li><Link href="#">Add Deal</Link></li>

            </ul>
        </div>
    )
}
export default Sidebar