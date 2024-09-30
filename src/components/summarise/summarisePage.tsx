"use client"

import { useEffect, useState } from "react";

import Control from '@/components/summarise/control';
import useWindowSize from '@/components/windowSize';
import styles from '@/styles/summarise.module.css';
import Content from '@/components/summarise/citySummaryData';

export default function SummarisePage() {

    const [idx, setIdx] = useState(0);

    const contentArray = Content();

    const contentNames = contentArray.map(element => element.name);
    const contentHtml = contentArray.map(element => element.content);

    return (
        <>
            <div className={styles.summarise}>
                {contentHtml[idx]}
            </div>
        </>
    )
}
