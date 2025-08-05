import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PageTitle = (props) => {
    const { 
        pageTitle, 
        pagesub, 
        bgImage, 
        bgImageAlt = "Background", 
        overlayColor = "rgba(0,0,0,0.5)" 
    } = props;

    return (
        <div className="wpo-breadcumb-area min-h-[50vh] relative">
            {/* Background Image Section - Added with Tailwind */}
            {bgImage && (
                <div className="absolute inset-0 -z-10">
                    <Image
                        src={bgImage}
                        alt={bgImageAlt}
                        fill
                        className="object-cover h-[80vh]"
                        priority
                    />
                    <div 
                        className="absolute inset-0"
                        style={{ backgroundColor: overlayColor }}
                    />
                </div>
            )}
            
            {/* Original Content Structure */}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="wpo-breadcumb-wrap">
                            <h2>{pageTitle}</h2>
                            <ul>
                                <li>{pagesub}</li>
                                <li><Link href="/">الرئيسية</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageTitle;