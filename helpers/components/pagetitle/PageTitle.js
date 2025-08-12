import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PageTitle = (props) => {
    const { 
        pageTitle, 
        pagesub, 
        bgImage, 
        bgImageAlt = "Background", 
        overlayColor = "rgba(0,0,0,0.6)" 
    } = props;

    return (
        <div className="wpo-breadcumb-area min-h-[150px] md:min-h-[500px] relative">
            {/* Background Image Section - Added with Tailwind */}
                  {bgImage && (
                <div className="absolute inset-0 -z-10 w-full">
                    <Image
                        src={bgImage}
                        alt={bgImageAlt}
                        fill
                        className="object-cover w-full"
                        priority
                        quality={100}
                        sizes="100vw"
                    />
                    <div 
                        className="absolute inset-0 w-full"
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
                                <li><Link href="/">الرئيسية</Link></li>
                                <li>{pagesub}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageTitle;