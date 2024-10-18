import React from "react"

const PageContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full flex justify-center pt-40">
            <div className="flex flex-col justify-center">
                {children}
            </div>
        </div>
    )
}

export default PageContainer