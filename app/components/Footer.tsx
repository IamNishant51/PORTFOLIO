export default function Footer() {
    return (
        <footer
            className="fixed bottom-0 left-0 w-full h-[50vh] flex items-center justify-center -z-10"
            style={{ backgroundColor: '#CCFF00' }}
        >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 flex flex-col items-center justify-center text-center text-black">
                <h2 className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-black leading-none tracking-[-0.04em] uppercase">
                    LET'S TALK
                </h2>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 mt-6 sm:mt-8 md:mt-10 text-xs sm:text-sm md:text-base uppercase tracking-widest font-medium">
                    <a href="https://github.com/IamNishant51" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">GitHub</a>
                    <a href="https://www.linkedin.com/in/nishant-unavane-008291275/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">LinkedIn</a>
                    <a href="mailto:nishant.unavane@outlook.com" className="hover:opacity-60 transition-opacity">Email</a>
                </div>
                <p className="mt-6 sm:mt-8 md:mt-10 text-[10px] sm:text-xs md:text-sm opacity-50">
                    © 2026 Nishant. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
