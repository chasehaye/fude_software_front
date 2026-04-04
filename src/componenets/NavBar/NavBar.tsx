import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react";
import UserDropDown from "../UserDropDown/UserDropDown.tsx";
import MobileMenu from "../MobileMenu/MobileMenu.tsx";

function NavBar(){
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsMenuOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsMenuOpen(false);
        }, 200); 
    };

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return(
       <div className="sticky top-0 z-50 bg-black relative select-none w-full">

            <nav className="flex justify-between px-4 mt-2 pb-2  border-b border-edge sm:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer" onClick={() =>{setIsMobileMenuOpen((prev) => !prev)}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>

                    <div onClick={() => navigate('/')} className="uppercase select-none antialiased text-hoverc cursor-pointer">fude software</div>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
            </nav>

            {isMobileMenuOpen && <MobileMenu />}


            <nav className="hidden sm:flex justify-between h-14 border-b border-edge">
                <div onClick={() => navigate('/')} className="w-[20%] border-r border-edge pt-3 pl-10 text-lg text-hoverc cursor-pointer">FUDE<span className="hidden lg:inline">_SOFTWARE</span></div>
                <div className="flex justify-between w-[70%] border-edge cursor-pointer">           
                    <div className="flex-1 border-l border-edge pt-4 text-center text-xs truncate hover:bg-hoverc/10 cursor-pointer">API<span className="hidden lg:inline">_Management</span></div>
                    <div className="flex-1 border-l border-edge pt-4 text-center text-xs truncate hover:bg-hoverc/10 cursor-pointer"><span className="hidden lg:inline">Manage_</span>Account</div>
                    <div onClick={() => navigate('/mailing-list/index')} className="flex-1 border-l border-edge pt-4 text-center text-xs truncate hover:bg-hoverc/10 cursor-pointer">Mailing<span className="hidden lg:inline">_List</span></div>
                    <div className="flex-1 border-l border-edge pt-4 text-center text-xs truncate hover:bg-hoverc/10 cursor-pointer"><span className="lg:hidden">Inquiries</span><span className="hidden lg:inline">Inbound_Inquires</span></div>
                    <div className="flex-1 border-l border-edge pt-4 text-center text-xs truncate hover:bg-hoverc/10 cursor-pointer"><span className="lg:hidden">Bugs</span><span className="hidden lg:inline">Bug_Reports</span></div>
                    <div className="flex-1 border-l border-edge pt-4 text-center text-xs truncate hover:bg-hoverc/10 cursor-pointer"><span className="lg:hidden">Services</span><span className="hidden lg:inline">Service_Status</span></div>
                    <div className="border-l border-edge w-[6%] flex items-center justify-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => setIsMenuOpen(!isMenuOpen)}>                
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                </div>
            </nav>

            {isMenuOpen && <UserDropDown onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />}
        </div>
    )
}

export default NavBar