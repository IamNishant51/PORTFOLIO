"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

const MagneticButton = ({ children, className = "", onClick, type = "button", disabled = false }: MagneticButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;

        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        if (disabled) return;

        const button = buttonRef.current;
        if (!button) return;

        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
        });
        setIsHovering(false);
    };

    const handleMouseEnter = () => {
        if (disabled) return;
        setIsHovering(true);
    };

    return (
        <button
            ref={buttonRef}
            type={type}
            onClick={onClick}
            disabled={disabled}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            className={`${className} transition-all duration-300 ${isHovering ? 'scale-105' : 'scale-100'}`}
        >
            {children}
        </button>
    );
};

export default MagneticButton;
