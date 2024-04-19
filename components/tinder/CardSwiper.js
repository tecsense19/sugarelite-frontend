import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import closeIcon from "/public/assets/cross_icon.svg";
import heartIcon from "/public/assets/heart_swipe_icon.svg";

const CardSwiper = (props) => {
    const target = useRef(null);
    const x = useRef(0);
    const y = useRef(0);
    const mid = useRef(0);
    const angleMax = 30;

    const getRotateOrigin = async (mx) => {
        let result = [];

        if (target.current !== null) {
            if (y.current < mid.current) {
                if (x.current > mx) {
                    result = [0, 100, -1];
                } else {
                    result = [100, 100, 1];
                }
            } else {
                if (x.current > mx) {
                    result = [0, 0, 1];
                } else {
                    result = [100, 0, -1];
                }
            }
            return result;
        } else {
            return undefined;
        }
    };

    const selectDirection = async (mx, my) => {
        if (mx - x.current > (props.detectingSize ?? 100)) {
            return "right";
        } else if (mx - x.current < -(props.detectingSize ?? 100)) {
            return "left";
        } else if (my - y.current < -(props.detectingSize ?? 100)) {
            return "up";
        } else if (my - y.current > (props.detectingSize ?? 100)) {
            return "down";
        } else return "none";
    };

    const onStart = async (mx, my) => {
        x.current = mx;
        y.current = my;
    };

    const onMove = async (mx, my) => {
        if (target.current === null) return;
        const origin = await getRotateOrigin(mx);
        const angle =
            (Math.abs(mx - x.current) *
                angleMax *
                (1 - Math.abs(my - mid.current) / mid.current / 2)) /
            target.current?.offsetWidth;

        if (origin !== undefined) {
            gsap.to(target.current, {
                transformOrigin: `${origin[0]}% ${origin[1]}%`,
                x: (mx - x.current) * 0.2,
                y: (my - y.current) * 0.8,
                rotation: origin[2] * angle,
                duration: 0,
            });
        }
    };

    const onEnd = async (mx, my) => {
        if (target.current === null) return;
        const mid = target.current?.offsetHeight / 2;
        const angle =
            (Math.abs(mx - x.current) * angleMax * (1 - Math.abs(my - mid) / mid)) /
            target.current?.offsetWidth;
        const d = await selectDirection(mx, my);
        if (d === "right" || d === "left") {
            const tl = gsap.timeline();
            tl.to(target.current, {
                x: (mx - x.current > 0 ? 1 : -1) * (props.throwLimit ?? 3000) + "px",
                y:
                    (my - y.current > 0 ? 1 : -1) *
                    (props.throwLimit ?? 3000) *
                    Math.tan((angle * Math.PI) / 180) +
                    "px",
                duration: 0.3,
                ease: "power1.in",
            });
            tl.to(target.current, {
                display: "none",
                duration: 0,
            });
        } else {
            gsap.to(target.current, {
                x: 0,
                y: 0,
                rotation: 0,
                duration: 0.2,
                ease: "power3.out",
            });
        }

        x.current = 0;
        y.current = 0;

        await props.onSwipe?.(d);
    };

    const handleTouchStart = (e) => {
        const mx = e.targetTouches[0].clientX;
        const my = e.targetTouches[0].clientY;

        onStart(mx, my);
    };

    const handleTouchMove = (e) => {
        const mx = e.changedTouches[0].clientX;
        const my = e.changedTouches[0].clientY;
        onMove(mx, my);
    };

    const handleTouchEnd = (e) => {
        const mx = e.changedTouches[0].clientX;
        const my = e.changedTouches[0].clientY;
        onEnd(mx, my);
    };

    const mouseClicked = useRef(false);

    const handleMouseDown = (e) => {
        mouseClicked.current = true;
        const mx = e.clientX;
        const my = e.clientY;
        onStart(mx, my);
    };

    const handleMouseMove = (e) => {
        if (mouseClicked.current) {
            const mx = e.clientX;
            const my = e.clientY;
            onMove(mx, my);
        }
    };

    const handleMouseUp = (e) => {
        if (mouseClicked.current) {
            mouseClicked.current = false;
            const mx = e.clientX;
            const my = e.clientY;
            onEnd(mx, my);
        }
    };

    const handleMouseLeave = (e) => {
        if (mouseClicked.current) {
            mouseClicked.current = false;
            const mx = e.clientX;
            const my = e.clientY;
            onEnd(mx, my);
        }
    };

    useEffect(() => {
        const info = target.current?.getBoundingClientRect();
        if (info !== undefined) {
            mid.current = (info.top + info.bottom) / 2;
        }

        if (target.current !== null) {
            target.current.addEventListener("touchstart", (ev) => {
                ev.preventDefault();
            });

            target.current.addEventListener("mousedown", (ev) => {
                ev.preventDefault();
            });

            target.current.addEventListener("touchmove", (ev) => {
                ev.preventDefault();
            });

            target.current.addEventListener("mousemove", (ev) => {
                ev.preventDefault();
            });

            target.current.addEventListener("touchend", (ev) => {
                ev.preventDefault();
            });

            target.current.addEventListener("mouseup", (ev) => {
                ev.preventDefault();
            });

            target.current.addEventListener("mouseleave", (ev) => {
                ev.preventDefault();
            });
        }
    }, []);

    const handleLike = () => {
        const rect = target.current.getBoundingClientRect();
        const mx = rect.left + rect.width / 2; // X coordinate at the center of the card
        const my = rect.top + rect.height / 2; // Y coordinate at the center of the card
        onEnd(mx + 100, my); // Simulate swipe to the right by adding 100 to the X coordinate
    };

    const handleDislike = () => {
        console.log("fh")
        onEnd(0, 0, "left");
    };

    return (
        <>
            <div
                ref={target}
                className={props.className ?? ""}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                {props.contents}
                <div className='flex flex-col gap-y-[13.2px]  absolute bottom-4 right-4'>
                    <button className='flex justify-center items-center cursor-pointer h-[52.3px] w-[52.3px] bg-white/50 rounded-full' onClick={handleDislike}>
                        <Image src={closeIcon} alt="" height={22} width={22} priority className="pointer-events-none" />
                    </button>
                    <button className='flex justify-center items-center cursor-pointer h-[52.3px] w-[52.3px] bg-secondary rounded-full z-20' onClick={handleLike}>
                        <Image src={heartIcon} alt="" height={24} width={22} priority className="pointer-events-none h-[24px] w-[22px] aspect-auto" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default CardSwiper;



