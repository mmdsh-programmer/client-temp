import React from "react";


interface IProps {
    className?: string;
}

export const Spinner = (props: IProps) => {
    const { className } = props;
    return (
        <svg
            className={`animate-spin ${className || "h-6 w-6"}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    );
};