import type { Metadata } from "next";
import './../../public/css/bootstrap/css/bootstrap.min.css';
import "./globals.css";
import Sidebar from '../components/sidebar/sidebar';
import MainHeader from '../components/header/header';
import { useRouter } from 'next/navigation';
import Api from '@/inc/Api';
import AuthWraper from '@/components/auth/AuthWraper';
export const metadata: Metadata = {
  title: "Allies Portal",
  description: "Allies Portal CRM",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.3/themes/smoothness/jquery-ui.css"/>
      </head>
      
      <body>
        <AuthWraper>
          <div className="main_site_wrapper">
            <div className="main_side_inner">
              <Sidebar/>
              <div className="header_and_main_contents">
                <MainHeader/>
                <div className="main_contents">
                {children}
                </div>
              </div>
            </div>
          </div>
        </AuthWraper>
      </body>
    </html>
  );
}
