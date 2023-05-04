import { Footer, Navbar } from "@/components/UI/common";
import { Web3Provider } from "@/components/providers";

export default function BaseLayout({children}){
    return(
    <Web3Provider>
        <div className="relative max-w-7xl mx-auto px-4">

            <Navbar/> 
            <div className="fit">
                {children}
            </div>
        </div>
        <Footer/>
    </Web3Provider>
    )
}