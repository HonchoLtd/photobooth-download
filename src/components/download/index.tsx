"use client"
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const index = () => {
    const searchParams = useSearchParams();
    const url = searchParams.get('url');
    const [downloading, setDownloading] = useState(false);
    if (!url) {
        return <div className="bg-black text-white flex justify-center items-center w-full h-screen text-3xl">Missing URL</div>;
    }

    const downloadVideo = async () => {
        if (!url) return;

        setDownloading(true);

        try {
            // Fetch the video file
            const response = await fetch(url);
            const blob = await response.blob();

            // Create a link element and trigger the download
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', 'video.mp4'); // Filename for the downloaded video
            document.body.appendChild(link);
            link.click();

            // Cleanup
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(blobUrl); // Release memory
        } catch (error) {
            console.error('Error downloading the video:', error);
        } finally {
            setDownloading(false);
        }
    };
    return (
        <div className='bg-black flex justify-center items-center w-full h-screen'>
            <div className='flex flex-col gap-4'>
                <video className="rounded-md w-80 md:h-96 h-80 md:h-96" src={url} muted autoPlay={true} loop />
                <button onClick={downloadVideo} disabled={downloading} className="px-8 py-2 rounded-md bg-black border border-white text-white">{downloading ? 'Downloading...' : 'Download'}</button>
            </div>

        </div>
    );
};

export default index;