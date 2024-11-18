import Image from "next/image"
import Link from 'next/link'
import type { Metadata, Viewport } from 'next';

import styles from '@/styles/about.module.css'
import ButtonAppBar from '@/components/appBar';

export const metadata: Metadata = {
    title: 'UA',
    description: 'Urban Analyses for the world',
    icons: '/ua.ico',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
}

export default function Home() {

    const buttonTxt = [
        "home",
        "main page",
        "map",
    ]

    return (
        <>
            <ButtonAppBar text={buttonTxt} />
            <main className={styles.main}>

                <div className={styles.centerBig}>
                    <p className="text-center">
                        Urban Analyst at Full Resolution
                    </p>
                </div>

                <div className={styles.leftMed}>
                    <p className="text-center">
                        What is this?
                    </p>
                </div>

                <div className={styles.centerNormal}>
                    <p className="text-center">
                        This is a demonstration of the full-resolution data
                        underlying the main&nbsp;
                        <Link href="https://urbananalyst.city" rel="noopener noreferrer">
                            Urban Analyst platform
                        </Link>
                        &nbsp;for interactive visualisation of the properties of
                        cities. The main site shows aggregated results for a
                        number of cities. This full-resolution demonstration
                        site shows data for only one demonstration city, and
                        contains only a&nbsp;
                        <Link href="/map" rel="noopener noreferrer">
                            Map page.
                        </Link>
                        &nbsp; The main site shows only aggregate data; this
                        demonstration site offers two other views:
                    </p>
                </div>
                <div className={styles.centerNormal}>
                    <ol>
                        <li>
                            &ldquo;Transport&rdquo; showing values of chosen
                            variables measured at all public tranport stops;
                            and
                        </li>
                        <li>
                            &ldquo;Detailed&rdquo; showing the full-resolution
                            data on every street segment throughout the city.
                        </li>
                    </ol>
                </div>

            </main>
        </>
    )
}
