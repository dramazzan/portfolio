'use client'

import React, { useState } from 'react'
import { SocialIcon } from 'react-social-icons'
import { Flame, FlameKindling } from "lucide-react"

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 z-10 ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={() => setIsOpen(false)}
            />

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed flex items-center justify-center p-3 z-30 
                    bottom-6 left-6 sm:bottom-10 sm:left-10 md:bottom-14 md:left-14 
                    rounded-full bg-gradient-to-r from-amber-400 to-orange-500 
                    shadow-lg hover:shadow-xl hover:scale-110 
                    transition-all duration-300 ease-in-out
                    ${isOpen ? 'rotate-360 bg-gradient-to-r from-red-400 to-pink-500' : ''}
                `}
            >
                <div className="relative">
                    <Flame
                        size={32}
                        className={`absolute text-white transition-all duration-300 ${
                            isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                        }`}
                    />
                    <FlameKindling
                        size={32}
                        className={`text-white transition-all duration-300 ${
                            isOpen ? 'opacity-100 -rotate-0' : 'opacity-0 rotate-180'
                        }`}
                    />
                </div>
            </button>

            <div
                className={`fixed bottom-6 left-6 sm:bottom-10 sm:left-10 md:bottom-14 md:left-14
                    w-64 sm:w-72 md:w-80 lg:w-96 p-4 sm:p-6 rounded-2xl 
                    bg-background-light dark:bg-background-dark backdrop-blur-md border text-black dark:text-white border-white/20
                    shadow-2xl z-20
                    transition-all duration-500 ease-out
                    ${isOpen
                    ? "translate-y-0 opacity-100 translate-x-10 sm:translate-x-20 visible scale-100"
                    : "translate-y-8 opacity-0 translate-x-0 invisible scale-95"
                }
                `}
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br bg-background-light dark:bg-background-dark p-1 rounded-xl -z-10" />

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        Connect with me
                    </h2>

                    <ul className="space-y-4">
                        <li className="transform transition-all duration-300 hover:translate-x-2">
                            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                <SocialIcon
                                    url="https://github.com/dramazzan"
                                    style={{ height: 40, width: 40 }}
                                    className="hover:scale-110 transition-transform duration-200"
                                />
                                <span className="font-medium">GitHub</span>
                            </div>
                        </li>

                        <li className="transform transition-all duration-300 hover:translate-x-2 delay-75">
                            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                <SocialIcon
                                    url="https://www.linkedin.com/in/ramazan-dautbek-4517b5363/"
                                    style={{ height: 40, width: 40 }}
                                    className="hover:scale-110 transition-transform duration-200"
                                />
                                <span className="font-medium">LinkedIn</span>
                            </div>
                        </li>

                        <li className="transform transition-all duration-300 hover:translate-x-2 delay-150">
                            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                <SocialIcon
                                    url="https://t.me/dtbk_r"
                                    style={{ height: 40, width: 40 }}
                                    className="hover:scale-110 transition-transform duration-200"
                                />
                                <span className="font-medium">Telegram</span>
                            </div>
                        </li>
                        <li className="transform transition-all duration-300 hover:translate-x-2 delay-150">
                            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                <SocialIcon
                                url="mailto:ramazandautbek04@gmail.com"
                                style={{ height: 40, width: 40 }}
                                className="hover:scale-110 transition-transform duration-200"
                                />
                                <span className="font-medium">Email</span>
                            </div>
                            </li>

                    </ul>

                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-60 animate-pulse" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-40 animate-pulse delay-700" />
                </div>
            </div>
        </>
    )
}

export default BurgerMenu
