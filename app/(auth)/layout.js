import Header from "@/components/header/Header";

export default function RootLayout({ children }) {
    console.log("login layout")
    return <>
        <Header />
        {children}
    </>;
}