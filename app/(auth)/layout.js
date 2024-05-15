import Header from "@/components/header/Header";

export default function RootLayout({ children }) {
    return <>
        <div className="relative bg-[url('/assets/large_image.png')] bg-no-repeat bg-cover">
            <Header />
            {children}
        </div>
    </>;
}