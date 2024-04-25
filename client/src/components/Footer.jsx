import React from "react";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";

const Footer = () => {
    return (
        <div className="footer bg-gray-900">
            <div className="section_padding py-16 px-4 md:px-12 lg:px-24">

                <div className="flex flex-wrap justify-between mb-8">
                    <div className="sb_footer-links_div mr-4">
                        <h4 className="text-white font-bold text-lg mb-4">About Us</h4>
                        <a href="/contact" className="text-gray-300 hover:text-white">
                            <p className="text-gray-300 hover:text-white mb-2">Privacy Policy</p>
                        </a>
                        <a href="/privacy" className="text-gray-300 hover:text-white">
                            <p className="text-gray-300 hover:text-white mb-2">Security and Cookies</p>
                        </a>
                        <a href="/t&c" className="text-gray-300 hover:text-white">
                            <p className="text-gray-300 hover:text-white mb-2">Terms and Condition</p>
                        </a>
                    </div>
                    <div className="sb_footer-links_div mr-4">
                        <h4 className="text-white font-bold text-lg mb-4">Need Help?</h4>
                        <a href="/employer" className="text-gray-300 hover:text-white">
                            <p className="text-gray-300 hover:text-white mb-2">Contact Support</p>
                        </a>
                        <a href="/employer" className="text-gray-300 hover:text-white">
                            <p className="text-gray-300 hover:text-white mb-2">FAQ</p>
                        </a>
                        <a href="/employer" className="text-gray-300 hover:text-white">
                            <p className="text-gray-300 hover:text-white mb-2">Resend Booking Information</p>
                        </a>
                    </div>
                    <div className="sb_footer-links_div">
                        <h4 className="text-white mb-4">Follow us on:</h4>
                        <div className="flex space-x-2">
                            <Facebook style={{ fontSize: '30px', color: 'white' }} />
                            <Instagram style={{ fontSize: '30px', color: 'white' }} />
                            <Twitter style={{ fontSize: '30px', color: 'white' }} />
                            <LinkedIn style={{ fontSize: '30px', color: 'white' }} />
                        </div>
                    </div>
                </div>
                <hr className="footer-hr border border-white" />
                <div className="sb_footer-below flex justify-between">
                    <div className="sb_footer-copyright">
                        <p className="text-white">
                            @{new Date().getFullYear()} TicketWave. All rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
