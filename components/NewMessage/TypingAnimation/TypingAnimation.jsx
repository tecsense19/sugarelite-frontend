import "./typing.css"
const TypingAnimation = () => {
    return (
        <div className="chat-bubble flex items-center h-[40px] ps-2 mt-[2px]">
            <div className="typing flex">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    );
};

export default TypingAnimation;