import Ballpit from "./Ballpit";

export default function Footer() {
    return (
        <footer
            className="fixed bottom-0 left-0 w-full h-[50vh] flex items-center justify-center -z-10 bg-[#CCFF00] dark:bg-[#CCFF00] overflow-hidden"
        >
            {/* Ballpit Background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ willChange: 'auto' }}>
                <Ballpit
                    count={25}
                    gravity={0.8}
                    friction={0.9975}
                    wallBounce={0.95}
                    followCursor={false}
                    colors={[0xCCFF00]}
                />
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 flex flex-col items-center justify-center text-center text-black dark:text-black fixed bottom-[10vh] left-0 right-0 z-50 pointer-events-auto">
                <h2 className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-black leading-none tracking-[-0.04em] uppercase cursor-default pointer-events-none" style={{ transitionProperty: "transform", transitionDuration: "300ms" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                    LET'S CONNECT
                </h2>
                <p className="mt-6 sm:mt-8 md:mt-10 text-[10px] sm:text-xs md:text-sm opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default">
                    © 2026 Nishant. All rights reserved.
                </p>
            </div>
        </footer>
    );
}