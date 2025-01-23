'use client'
import Link from 'next/link';
import User from '@/inc/User';
import { useRouter,usePathname } from 'next/navigation';
import { connect } from 'react-redux';
let Sidebar = (props) => {
    let pathName = usePathname();
    let user = new User(props.auth.user);
    
    return(
        <div className="main_sidebar">
            <div className='main_sidebar_inner'>
                <Link className='main_logo' href="/dashboard">
                    <img src="/allies-dark-logo.png" alt="Allies logo"/>
                </Link>
                <ul className="sidebar_menu">
                    

                    <li><Link href="/dashboard" className={pathName === '/dashboard' ? 'active' : ''}><img src='/images/icons/deshboard.png' />Dashboard</Link></li>
                    <li><Link href="/deal-pipeline" className={pathName === '/deal-pipeline' ? 'active' : ''}><img src='/images/icons/deal-pipeline.png' />Deal Pipeline</Link></li>
                        
                    <li><Link href="/prospects/all" className={pathName === '/prospects/all' ? 'active' : ''}><img src='/images/icons/company.png' />Prospects</Link></li>
                    <li><Link href="/company" className={pathName === '/company' ? 'active' : ''}><img src='/images/icons/company.png' />Companies</Link></li>
                    <li><Link href="/property" className={pathName === '/property' ? 'active' : ''}><img src='/images/icons/property.png' />Properties</Link></li>
                    <li><Link href="/active-deals" className={pathName === '/active-deals' ? 'active' : ''}><img src='/images/icons/active-deals.png' />Active Deals</Link></li>
                    <li><Link href="/broker" className={pathName === '/broker' ? 'active' : ''}><img src='/images/icons/broker.png' />Brokers</Link></li>
                    <li><Link href="#" className={pathName === '/calander' ? 'active' : ''}><img src='/images/icons/calendar.png' />Calendar</Link></li>
                    {user.isAdministrator() ? <li><Link href="/users" className={pathName === '/users' ? 'active' : ''}><img src='/images/icons/company.png' />Users</Link></li> : ''}
                </ul>
                <div className='divider'></div>
                <ul className="sidebar_menu sidebar_menu_2">
                    <li><Link href="/company/new-company" className={pathName === '/company/new-company' ? 'active' : ''}><img src='/images/icons/add-company.png' />Add Company</Link></li>
                    <li><Link href="/property/create" className={pathName === '/property/create' ? 'active' : ''}><img src='/images/icons/add-property.png' />Add property</Link></li>
                    <li><Link href="/broker/new" className={pathName === '/broker/new' ? 'active' : ''}><img src='/images/icons/create-broker.png' />Add Broker</Link></li>
                </ul>
                {user.isAdministrator() ? <Link href="/settings" className={pathName === '/settings' ? 'settings_link active' : 'settings_link'}><img src='/images/icons/settings.png' />Settings</Link> : '' }
            </div>
            
        </div>
    )
}
const mapStateToProps = (state) => {
    return{
        auth:state.auth
    }
}
export default connect(mapStateToProps) (Sidebar)