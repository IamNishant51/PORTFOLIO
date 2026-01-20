import Ballpit from "./Ballpit";

export default function Footer() {
    return (
        <footer
            className="fixed bottom-0 left-0 w-full h-[50vh] flex items-center justify-center -z-10 bg-[#CCFF00] dark:bg-[#CCFF00] overflow-hidden"
        >
            {/* Ballpit Background */}
            <div className="absolute inset-0 w-full h-full" style={{ willChange: 'auto' }}>
                <Ballpit
                    count={25}
                    gravity={0.8}
                    friction={0.9975}
                    wallBounce={0.95}
                    followCursor={false}
                    colors={[0xCCFF00]}
                />
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 flex flex-col items-center justify-center text-center text-black dark:text-black relative z-10">
                <h2 className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-black leading-none tracking-[-0.04em] uppercase cursor-default" style={{ transitionProperty: "transform", transitionDuration: "300ms" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                    LET'S TALK
                </h2>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 mt-6 sm:mt-8 md:mt-10 text-xs sm:text-sm md:text-base uppercase tracking-widest font-medium">
                    <a href="https://github.com/IamNishant51" target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden">
                        <span className="relative z-10 group-hover:-translate-y-1 inline-block transition-transform duration-300">GitHub</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </a>
                    <a href="https://www.linkedin.com/in/nishant-unavane-008291275/" target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden">
                        <span className="relative z-10 group-hover:-translate-y-1 inline-block transition-transform duration-300">LinkedIn</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </a>
                    <a href="mailto:nishant.unavane@outlook.com" className="relative group overflow-hidden">
                        <span className="relative z-10 group-hover:-translate-y-1 inline-block transition-transform duration-300">Email</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </a>
                </div>
                <p className="mt-6 sm:mt-8 md:mt-10 text-[10px] sm:text-xs md:text-sm opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default">
                    © 2026 Nishant. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
