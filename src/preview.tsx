import React from 'react';

interface PreviewProps {
    mt: string,
    url: string,
    alt?: string,
}


export function Preview(props: PreviewProps) {
    if (props.mt == 'audio') {
        return <audio src={props.url} controls preload="none" className="preview audio"></audio>
    }
    if (props.mt == 'image') {
        return <img src={props.url} alt={props.alt || "Image"} className="preview image"></img>
    }
    if (props.mt == 'pdf') {
        return <span><a href={props.url}>PDF</a></span>

    }
    if (props.mt == 'download') {
        return <span><a href={props.url}>Download</a></span>
    }
}

export function PreviewGroup(previews: PreviewProps[]) {
    return <>
        {previews.map((props: PreviewProps) => Preview(props))}
    </>
}